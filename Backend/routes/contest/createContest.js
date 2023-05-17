const express = require('express');
const router = express.Router();
const moment = require('moment');

const Contest = require('../../models/contest');
const Question = require('../../models/question');

const validateTime = (startMoment, endMoment) => {
      const now = moment();
      if (!startMoment.isSameOrAfter(now)) {
            throw new Error('Start time needs to be a future date');
      }
      if (!endMoment.isAfter(startMoment)) {
            throw new Error('Start time cannot be after end time');
      }
};

const createContest = async (contestData, user) => {
      const {
            contest_name,
            contest_id,
            ques_ids,
            start_time,
            end_time,
            collaborators,
            is_draft,
      } = contestData;

      const startMoment = moment(start_time, 'DD/MM/YYYY HH:mm');
      const endMoment = moment(end_time, 'DD/MM/YYYY HH:mm');

      validateTime(startMoment, endMoment);

      await new Contest({
            contest_name: contest_name,
            contest_id: contest_id,
            ques_ids: ques_ids,
            start_time: start_time,
            end_time: end_time,
            creator: user.username,
            collaborators: collaborators,
            is_draft: is_draft,
      }).save();

      await updateQuestions(ques_ids, start_time);
};

const updateQuestions = async (quesIds, startTime) => {
      if (quesIds) {
            for (let i = 0; i < quesIds.length; i++) {
                  await Question.findOneAndUpdate(
                        { ques_no: quesIds[i] },
                        { display_after: startTime, assigned: true }
                  );
            }
      }
};

router.post('/', async (req, res) => {
      const user = { username: 'ritik_kaushal' };
      console.log('At Create Contest');
      const {
            contest_name,
            contest_id,
            ques_ids,
            start_time,
            end_time,
            collaborators,
            is_draft,
      } = req.body;

      try {
            await createContest(
                  {
                        contest_name: contest_name,
                        contest_id: contest_id,
                        ques_ids: ques_ids,
                        start_time: start_time,
                        end_time: end_time,
                        collaborators: collaborators,
                        is_draft: is_draft,
                  },
                  user
            );

            res.status(200).send('Contest created successfully.');
      } catch (err) {
            if (err.name === 'ValidationError') {
                  const errors = Object.keys(err.errors).map((field) => ({
                        error_field: field,
                        error_message: err.errors[field].message,
                  }));
                  res.status(400).json(errors);
            } else if (err.code === 11000) {
                  const field = Object.keys(err.keyValue)[0];
                  const message = `Duplicate ${field}: ${err.keyValue[field]}`;
                  res.status(400).json([{ error_field: field, error_message: message }]);
            } else {
                  console.log(err);
                  res.status(500).json({ error: 'Internal server error' });
            }
      }
});

module.exports = router;
