const Queue = require("bull");
const { transporter } = require("./transporter");

// Create a Queue object
const EmailQueue = new Queue("email");

// The process elements in EmailQueue will do
// job.data will have two fields - receiver : email whom to send , message : what to send
EmailQueue.process(async (job, done) => {
  const { receiver, message } = job.data;

  if (receiver && message) {
    try {
    } catch (error) {
      console.log(error);
    }
  } else {
    throw Error;
  }
});
