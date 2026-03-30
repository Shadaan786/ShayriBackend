 // UTILITY FOR UPLOADING AUDIO/VIDEO TO CLOUDINARY----------------------------------------------------------------------------->    
    
    
    const cloudinary = require('cloudinary').v2;
    const path = require('path');
    let imageUrl;
    const User = require('../models/User');
    const {getUser} = require('../service/auth');
    const fs = require('fs');
    const Kalam = require('../models/Kalam');
  


    

    const cloudinaryAudio=(req, res, next)=>{


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

        
    
        

        
     cloudinary.uploader .upload( req.finalWaveForm,{

        
        resource_type: "video"

     })

        .then((uploadResult)=>{
            console.log("uploadResult", uploadResult)

            imageUrl = uploadResult.url;
            console.log("imageUrl", imageUrl)

            // fs.unlink(req.file.path,(error)=>{
            //     if(error)console.log("error in deleting file", error);else{
            //         console.log("File deleted successfully");
            //     }
            // });

            // return res.json(uploadResult.url);

            const {type, content} = req.body;
            const token = req.cookies.uid;

            req.user = getUser(token);

           
              Kalam.create({
        type,
        content,
        createdBy: req.user._id,
        name: req.user.name,
        kalamAudio: imageUrl
    })

     .then((DbResponse)=>{
        console.log("kalam created successfully");
        console.log(DbResponse);

        return res.json(`audioUrl from backend: ${imageUrl}`);
    })

    .catch((error)=>{
        console.log("Error uploading to MongoDB", error)
    })
         

   


            
        })

        .catch((error)=>{

            console.log("error while uploading to cloudinary", error);
        })


         

    

            // const token = req.user.uid;

        // req.user = getUser(token);
        

        // User.updateOne({_id: req.user._id}, {profilePic: imageUrl})

        // .then((result)=>{
        //     console.log(result);
        // })

        // .catch((error)=>{
        //     console.log("error", error)
        // })

        // return res.json(imageUrl)

        // return res.json("Message for bukend");

      

    }


    module.exports = {cloudinaryAudio}