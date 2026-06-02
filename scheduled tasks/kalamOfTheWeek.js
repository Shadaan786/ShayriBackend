const cron = require('node-cron');
const Kalam = require('../models/Kalam');
const Kotw = require('../models/KalamOfTheDay');

const kalamOfTheWeek = async(req, res)=>{

    const currentTimeMs = Date.now();  // Gives current time in millisecond
    const weekAgoTimeMs = currentTimeMs - 604800000; // Gives week ago time in milliseconds
      
    const currentTime = new Date(currentTimeMs); // Gives current time in UTF format
    const weekAgoTime = new Date(weekAgoTimeMs); // Gives week ago time in UTF format
    

    
 try {
      // Evaluating Kalam of The Week 
    const kotw = await Kalam.find({$and:[{createdAt:{$gt: weekAgoTime }}, {createdAt:{$lte: currentTime}}]}).sort({totalLikes: -1}).limit(1)
    console.log("kotw", kotw)
    try{
    const existing_Kotw = await Kotw.find() // Finding existing Kalam of The Week
    console.log("checking_length", existing_Kotw.length)
    if(existing_Kotw.length == 0){
        // If there is no already existing Kalam of The Week 
          Kotw.create({
            Kalam: kotw[0]._id
        }).then((evaluated_Kotw)=>{

            console.log("Kalam of The Week evaluated successfully form 1", evaluated_Kotw)

        }).catch((error)=>{
            console.log("Error while creating Kalam oh The Week bu successfully evaluated", error)
        })
        

    }else{
        // Deleteing existing Kalam of The Week 

        Kotw.deleteMany({})
        .then((cleared_prev_kotw)=>{
            console.log("Previous Kalam of The Week cleared successfully",cleared_prev_kotw);

              // Now updating newly evaluated Kalam of The Week

          Kotw.create({
            Kalam: kotw[0]._id
        }).then((evaluated_Kotw)=>{

            console.log("Kalam of The Week evaluated successfully from 2", evaluated_Kotw)

        }).catch((error)=>{
            console.log("Error while creating Kalam oh The Week bu successfully evaluated", error)
        })
        
        }).catch((error)=>{
            console.log("Error while clearing previous Kalam of The Week", error);
        })

      

    }
    }catch(error){

        console.log("Error while fetching existing Kalam of The Week", error);


    }

}catch (error){

    console.log("Error while evaluating new Kalam Of The Week", error)

}
}

module.exports = kalamOfTheWeek;