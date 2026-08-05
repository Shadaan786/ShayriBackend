const User = require("../models/User");

const dbProfileUploader=(userId, profileUrl)=>{

    User.updateOne({_id: userId},{$set:{profilePic: profileUrl}})
    .then((result)=>{
        console.log("profile pic uploaded to database successfully")
    }).catch((error)=>{
        console.log("Error while uploading profile pic to database")
    })

}

module.exports = dbProfileUploader;