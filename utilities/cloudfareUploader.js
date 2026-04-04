    
    // UTILITY FOR UPLOADING IMAGES TO CLOUDINARY----------------------------------------------------------------------------->
    
    const cloudinary = require('cloudinary').v2;
    const path = require('path')
    let imageUrl;
    const User = require('../models/User')
    const {getUser} = require('../service/auth')
    const fs = require('fs');
    const Album = require('../models/Album')



    

    const cloudfareUploader=(req, res, next)=>{


        console.log("checking file path", req.file.path)
        console.log("checking req.body", req.body)

        // Configuration
        cloudinary.config({ 
            cloud_name: 'dbcocbkit', 
            api_key: '195959542621838', 
            api_secret: '1E1Jov0ZhXHRglseBZJeCwJFhAA',
        });


        // Upload an image 

        // const originalPathName = req.file.path;

        // const pathName = originalPathName.replace(/\\/g, "/");

        
    
        

        
     cloudinary.uploader .upload( req.file.path,{

        
        resource_type: "image",
        timeout: 30000
        

     })

        .then((uploadResult)=>{
            console.log(uploadResult)

            imageUrl = uploadResult.url;
            req.imageLink = imageUrl;
            console.log("imageUrl", imageUrl)

            fs.unlink(req.file.path,(error)=>{
                if(error)console.log("error in deleting file", error);
                
                else{
                    console.log("File deleted successfully");
                }
            })

            next();
            

         
//---------------------------------------------------------------------------------------------------------->



        //     User.updateOne({_id: req.user._id}, {profilePic: imageUrl})

        // .then((result)=>{
        //     console.log(result);
        // })

        // .catch((error)=>{
        //     console.log("error", error)
        // })

//------------------------------------------------------------------------------------------------------------->
        
        
        

        



            // return res.json(uploadResult.url);
            
        })

        .catch((error)=>{

            console.log("error while uploading to cloudinary", error)
            
            console.dir(error, {depth: null});
        })

         
        // return res.json(imageUrl)

      

    }


    module.exports = {cloudfareUploader}