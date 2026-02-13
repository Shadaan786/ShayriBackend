const multer = require('multer');
const path = require('path')
const fs = require('fs')
const {getUser} = require('../service/auth');
// const { request } = require('http');




const storage = multer.diskStorage({destination: function (req, file, cb){


    console.log("hello main check")
    // console.log("First req",req);


    cb(null, './uploads/profilePics')

    

     console.log("1st file", file)
},

filename: function (req, file, cb){

    // console.log("2nd req", req);
    const token = req.cookies.uid;
    req.user = getUser(token)
    const uuid = req.user._id;
    console.log("uid", req.user._id);
    const ext = path.extname(file.originalname)

    // const uniqueSuffix = Date.now() + '_' + Math.round(Math.random()* 1E9)

    cb(null, file.fieldname + '-' + uuid + ext)

    console.log("2nd file", file)

}

})



 const upload = multer({storage: storage})

 module.exports = {upload}



















 // correct----------------------------------------------------------------------------------------->


     




















// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');
 




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
 
