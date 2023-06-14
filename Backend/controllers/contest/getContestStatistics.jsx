const moment = require("moment");
const Contest = require("../../models/contest");
const Submission = require("../../models/submission");
const Question = require("../../models/question");

async function getContestStatisticsController(req, res) {
    const { username } = req.user;
    const { contest_id } = req.params;

    console.log(username, contest_id);

    try {
        const contest = await Contest.findOne({
            contest_id: contest_id,
            $or: [
                { creator: username },
                { collaborators: { $in: [username] } }
            ]
        }, "contest_name start_time end_time ques_ids registrations").exec();

        if (contest) {
            const data = {
                contest_name: contest.contest_name,
                start_time: contest.start_time,
                end_time: contest.end_time,
                ques_ids: contest.ques_ids,

                no_of_registrations: contest.registrations ? contest.registrations.length : 0,
                no_of_submissions: 0,
                no_of_active_users: 0,
                question_wise_submissions: [],
                time_wise_submissions: []
            };

            const start_time = moment(contest.start_time, "DD/MM/YYYY HH:mm");
            const end_time = moment(contest.end_time, "DD/MM/YYYY HH:mm");
            const ques_ids = contest.ques_ids.map(ques => ques.ques_id);
            const gap = 10; // Gap in minutes


            const questions = await Question.find({ ques_id: { $in: ques_ids } }, "_id ques_id").lean();
            const ids = questions.map(ques => String(ques._id));

            const ques_id__id_map = questions.reduce((acc, obj) => {
                acc[obj._id] = obj.ques_id;
                return acc;
            }, {});

            console.log(ques_id__id_map);


            // Match the required documents
            const match_the_conditions = {
                $match: {
                    time_stamp: { $gte: start_time.toDate(), $lte: end_time.toDate() },
                    ques_id: { $in: ids }
                }
            };

            // Group the matched by question
            const group_by_ques = {
                $group: {
                    _id: "$ques_id", // Grouping by ques_id
                    total_submissions: { $sum: 1 }, // Counting total submissions per question
                    accepted: { $sum: { $cond: [{ $eq: ["$verdict", "Accepted"] }, 1, 0] } },// Counting accepted submissions per question
                    unique_users: { $addToSet: "$username" }, // Add the username to set to find unique users
                },
            }

            // To get total submission and question stats array
            const get_total_submissions = {
                $group: {
                    _id: null, // Grouping all questions together
                    total_submissions: { $sum: "$total_submissions" }, // Summing up total submissions across question groups
                    unique_users: { $addToSet: "$unique_users" }, // Collecting unique users across question groups
                    question_stats: { $push: { ques_id: "$_id", total_submissions: "$total_submissions", accepted: "$accepted" } }, // Collecting question-wise stats in an array
                }
            }

            // To get the unique user , by merging the sets formed in various ques groups
            const get_unique_users = {
                $addFields: {
                    unique_users: {
                        $reduce: {
                            input: { $concatArrays: "$unique_users" },
                            initialValue: [],
                            in: { $setUnion: ["$$value", "$$this"] }
                        }
                    }
                }
            }


            // Project the group that was created
            const project_group_by_ques = {
                $project: {
                    _id: 0,
                    total_submissions: 1,
                    unique_users: { $size: "$unique_users" },
                    question_stats: 1,
                }
            }

            // Group documents by time
            const group_by_time = {
                $group: {
                    _id: {
                        $toDate: {
                            $subtract: [
                                { $toLong: "$time_stamp" },
                                { $mod: [{ $toLong: "$time_stamp" }, gap * 60 * 1000] }
                            ]
                        }
                    },
                    total_submissions: { $sum: 1 },
                    count_accepted: {
                        $sum: {
                            $cond: [{ $eq: ["$verdict", "Accepted"] }, 1, 0]
                        }
                    }
                }
            }

            // Project the group that was created
            const project_group_by_time = {
                $project: {
                    _id: 0,
                    // time_stamp : "$_id",
                    time_stamp: {
                        $dateToString: {
                            format: '%d/%m/%Y %H:%M',
                            date: { $toDate: '$_id' },
                            timezone: 'Asia/Kolkata'
                        }
                    },
                    total_submissions: 1,
                    count_accepted: 1
                }
            }

            // Sort by time stamp
            const sort = {
                $sort: {
                    time_stamp: 1
                }
            }


            // The groups to create, one is by question, other by time
            const groups = {
                $facet: {
                    byQues: [group_by_ques, get_total_submissions, get_unique_users, project_group_by_ques],
                    byTime: [group_by_time, project_group_by_time, sort]
                }
            }

            // Pipeline combining all the actions
            const pipeline = [match_the_conditions, groups]

            await Submission.aggregate(pipeline).exec(function (error, result) {
                if (error) {
                    console.log("From Contest Statistics Controller - ", error);
                    res.status(500).send("Internal server error");
                } else {
                    console.log(result[0].byQues[0].question_stats);
                    // console.log(result[0].byTime);

                    data["no_of_submissions"] = result[0].byQues[0].total_submissions;
                    data["no_of_active_users"] = result[0].byQues[0].unique_users;

                    const question_wise_submissions = result[0].byQues[0].question_stats;
                    data["question_wise_submissions"] = question_wise_submissions.map((ques) => { return { ques_id: ques_id__id_map[ques.ques_id], total_submissions: ques.total_submissions, accepted: ques.accepted } })
                    data["time_wise_submissions"] = result[0].byTime;

                    res.status(200).json({ data: data });
                }
            });


        }
        else {
            res.status(404).send("Contest not found");
        }
    }
    catch (error) {
        console.log("From Contest Statistics Controller - ", error);
        res.status(500).send("Internal server error");
    }
}

module.exports = { getContestStatisticsController }