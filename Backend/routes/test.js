const express = require("express");
const { EmailQueue } = require("../queue/EmailQueue");
const router = express.Router();

router.get("/sendMail", (req, res) => {
  EmailQueue.add({
    receiver: "ritikkaushallvb@gmail.com",
    message: {
      subject: "Testing",
      template: "confirmation",
      context: {
        username: "Ritik Kaushal",
        confirmation_link: "http://http://4.240.84.221:5000/",
        confirmation_link: "http://4.240.84.221:5000",
      },
    },
  }).then(() => {
    console.log("Added to email queue");
    res.status(200).send("Done");

  }).catch((err) => {
    console.log(err);
    res.status(400).send({ error: err });

  });

});

module.exports = router;
