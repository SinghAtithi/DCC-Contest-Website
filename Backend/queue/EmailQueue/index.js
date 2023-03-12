const Queue = require("bull");
const { transporter } = require("./transporter");

// Create a Queue object
const EmailQueue = new Queue("email");

// The process elements in EmailQueue will do
// job.data will have two fields - receiver : email whom to send , message : what to send
// message is an object containing subject, template, context
// context contains the dynamic variables required for the template specified.
EmailQueue.process(async (job, done) => {
  const { receiver, message } = job.data;

  if (receiver && message) {
    try {
      const mailData = {
        from: `Developers and Coders Club <${process.env.EMAIL_USERNAME}>`,
        to: receiver,
        subject: message.subject,
        template: message.template,
        context: message.context,
      };

      transporter.sendMail(mailData, (err, info) => {
        if (err) console.log(err);
        else {
          console.log("Mail sent.");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      done();
    }
  } else {
    throw Error;
  }
});

module.exports = { EmailQueue };
