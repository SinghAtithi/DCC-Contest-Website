const express = require('express');
const router = express.Router();

const Contest = require('../../models/contest');

// Function to fetch all contests
const getAllContests = async (req, res) => {
      try {
            const contests = await Contest.find(
                  { is_draft: false },
                  'contest_name contest_id ques_ids start_time end_time'
            );

            if (contests.length === 0) {
                  return res.status(404).json({ error: 'No Contest' });
            }

            res.status(200).json(contests);
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};

router.get('/', getAllContests);

module.exports = router;
