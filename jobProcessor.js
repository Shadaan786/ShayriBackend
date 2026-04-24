
const workerStarter=()=>{

const jobQueue  = require("./jobQueue");
const sendMail = require("./service/mailer");

let isProcessing = false






const jobProcessor=()=>{

    console.log("ja")


    
    if(jobQueue.length === 0){
        return;
    }else if(jobQueue[0].job_type === "welcome_mail"){
        console.log("worker task queue started")
        isProcessing = true;
        const current_job = jobQueue.shift(); 
        sendMail(current_job.email, "Welcome to ShayriClub buddy!!!!")
        .then((mailResponse)=>{
            console.log("Mail_sent successfully", mailResponse);
            isProcessing = false
           
            
            
        }).catch((error)=>{
            console.log("error while sending mail", error);
        })
    }

  
}



  setInterval(()=>{
    if(isProcessing) return;
        console.log("checking for pending tasks")
 
        jobProcessor();
        
    }, 3000)

}






module.exports = workerStarter;