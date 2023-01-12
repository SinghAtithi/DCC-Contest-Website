const Queue = require('bull');

const jobQueue = new Queue("job-queue");

jobQueue.process(async(data)=>{
    console.log(data);
});

const addJob = async(jobId)=>{
    await jobQueue.add({id : jobId});

}

module.exports = {addJob};