const sendMail = require('./service/mailer');
const jobProcessor = require("./jobProcessor")



 const jobQueue = [];
// let currentJob = 0;

// if (jobQueue.length === 0){

//     return;
// }else if(jobQueue[0].job_type === "welcome_mail"){

//  const currentJob  = jobQueue.shift();

//  const email = currentJob.email;

//  sendMail(email, "Welcome to ShayriClub buddy!!!")
//  .then((mailResponse)=>{
//     console.log("mail_sent", mailResponse)
//  })
 
//     .catch((error)=>{
//         console.log("error while sending mail", error)
//     })
// }

module.exports = jobQueue