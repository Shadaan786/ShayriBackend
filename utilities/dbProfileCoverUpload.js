const User = require('../models/User');

const dbProfileCoverUpload=(userId, profileCoverUrl)=>{

    User.updateOne({_id: userId},{$set:{profileCover:profileCoverUrl}})
    .then((result)=>{
        console.log("Profile cover uploaded to database successfully");
        return
    }).catch((error)=>{
        console.log("Error while uploading profile cover to database", error)
         return
    })

}

module.exports = dbProfileCoverUpload;