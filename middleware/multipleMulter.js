const multer = require('multer');
const path = require('path');
const getUser = require('../service/auth')



const storage = multer.diskStorage({destination: function (req, file, cb){
    if(req.files?.kalamAudio){

        cb(null, './uploads/kalamAudio');

    }else if(req.files?.kalamBg){

        cb(null,'./uploads/kalamBg')
    }

    
},

filename: function (req, file, cb){

    //     const token = req.cookies.uid;
    // req.user = getUser(token)
    // const uuid = req.user._id;
    // console.log("uid", req.user._id);
    const ext = path.extname(file.originalname)

    req.uniqueSuffix = Date.now() + '_' + Math.round(Math.random()* 1E9)

    cb(null, file.fieldname + '-' + req.uniqueSuffix + ext)

    console.log("2nd file", file)

}


})

 const upload2 = multer({storage: storage})

 module.exports = {upload2}



