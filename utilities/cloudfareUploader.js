    const cloudinary = require('cloudinary').v2;
    const path = require('path')
    let imageUrl;
    const User = require('../models/User')
    const {getUser} = require('../service/auth')
    const fs = require('fs');
const { error } = require('console');


    

    const cloudfareUploader=(req, res, next)=>{


        console.log("checking file path", "./uploads/kalamAudio/output.wav")

        // Configuration
        cloudinary.config({ 
            cloud_name: 'dbcocbkit', 
            api_key: '195959542621838', 
            api_secret: '1E1Jov0ZhXHRglseBZJeCwJFhAA' // Click 'View API Keys' above to copy your API secret
        });


        // Upload an image 

        // const originalPathName = req.file.path;

        // const pathName = originalPathName.replace(/\\/g, "/");

        
    
        

        
     cloudinary.uploader .upload( req.file.path,{

        
        resource_type: "video"

     })

        .then((uploadResult)=>{
            console.log(uploadResult)

            imageUrl = uploadResult.url;
            console.log("imageUrl", imageUrl)

            fs.unlink(req.file.path,(error)=>{
                if(error)console.log("error in deleting file", error);else{
                    console.log("File deleted successfully");
                }
            });

            // return res.json(uploadResult.url);
            
        })

        .catch((error)=>{

            console.log("error while uploading to cloudinary", error);
        })

            const token = req.user.uid;

        req.user = getUser(token);
        

        User.updateOne({_id: req.user._id}, {profilePic: imageUrl})

        .then((result)=>{
            console.log(result);
        })

        .catch((error)=>{
            console.log("error", error)
        })

        // return res.json(imageUrl)

      

    }


    module.exports = {cloudfareUploader}