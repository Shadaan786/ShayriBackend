    const cloudinary = require('cloudinary').v2;
    const path = require('path')
    let imageUrl;
    const User = require('../models/User')
    const {getUser} = require('../service/auth')



    const cloudfareUploader=(req, res, next)=>{


        console.log("checking file path", req.file.path)

        // Configuration
        cloudinary.config({ 
            cloud_name: 'dbcocbkit', 
            api_key: '195959542621838', 
            api_secret: '1E1Jov0ZhXHRglseBZJeCwJFhAA' // Click 'View API Keys' above to copy your API secret
        });


        // Upload an image 

        // const originalPathName = req.file.path;

        // const pathName = originalPathName.replace(/\\/g, "/");

        
    
        

        
     cloudinary.uploader .upload( req.file.path,
       
        
        ) 

        .then((uploadResult)=>{
            console.log(uploadResult)

            imageUrl = uploadResult.url;
            console.log("imageUrl", imageUrl)
            // return res.json(uploadResult.url);
            
        })

            const token = req.user.uid;

        req.user = getUser(token);
        

        User.updateOne({_id: req.user._id}, {profilePic: imageUrl})

        .catch((error)=>{
            console.log("error", error)
        })

        // return res.json(imageUrl)

      

    }


    module.exports = {cloudfareUploader}