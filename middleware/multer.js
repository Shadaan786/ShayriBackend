// const multer = require('multer');

// const storage = multer.diskStorage({destination: function (req, file, cb){

//     cb(null, './uploads/profilePics')
// },

// filename: function (req, file, cb){

//     const uniqueSuffix = Date.now() + '_' + Math.round(Math.random()* 1E9)

//     cb(null, file.fieldname + '-' + uniqueSuffix)

// }

// })

//  const upload = multer({storage: storage})

//  module.exports = upload




















// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');
 

//  // Configuration
//     cloudinary.config({ 
//         cloud_name: 'dbcocbkit', 
//         api_key: '195959542621838', 
//         api_secret: '**********' // Click 'View API Keys' above to copy your API secret
//     });

 
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'some-folder-name',
//     format: async (req, file) => 'png', // supports promises as well
//     public_id: (req, file) => 'computed-filename-using-request',
//   },
// });
 
// const parser = multer({ storage: storage });
 
// app.post('/upload', parser.single('image'), function (req, res) {
//   res.json(req.file);
// });