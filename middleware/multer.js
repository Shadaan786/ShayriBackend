const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({destination: function (req, file, cb){


    console.log("hello main check")
    // console.log("First req",req);


    cb(null, './uploads/profilePics')

     console.log("1st file", file)
},

filename: function (req, file, cb){

    // console.log("2nd req", req);
    const ext = path.extname(file.originalname)

    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random()* 1E9)

    cb(null, file.fieldname + '-' + uniqueSuffix + ext)

    console.log("2nd file", file)

}

})

 const upload = multer({storage: storage})

 module.exports = {upload}



















 // correct----------------------------------------------------------------------------------------->

 // Upload an image 

//  cloudinary.uploader .upload( filePath,
//      { public_id: 'shoes', } 
    
//     ) 

//     .then((uploadResult)=>{
//         console.log(uploadResult)
//     })
     



















// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');
 

//  // Configuration
//     cloudinary.config({ 
//         cloud_name: 'dbcocbkit', 
//         api_key: '195959542621838', 
//         api_secret: '**********' // Click 'View API Keys' above to copy your API secret
//     });


//--------------------------------------------------------------------------------------------------------------->









 
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'some-folder-name',
//     format: async (req, file) => 'png', // supports promises as well
//     public_id: (req, file) => 'computed-filename-using-request',
//   },
// });




 
// const parser = multer({ storage: storage });
 
