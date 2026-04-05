require("dotenv").config();
console.log("Port from env:", process.env.PORT);
const http = require('http');
const express = require("express");
const status = require("express-status-monitor");
const cookieParser = require('cookie-parser')
const {spawn} = require('child_process');



// const shayri = require("./shayri.json")
const cors = require("cors");
const mongoose = require("mongoose");
// const Shayri = require('./models/Shayri');
const { stayLoggedIn } = require('./middleware/auth')

const app =express();
app.use(express.json());
const url = require('url');
const path = require("path");
const server = http.createServer(app)

const userRoute = require('./routes/signup');
const userRoute2 = require('./routes/login');
const kalamRoute = require('./routes/kalamRoute');
const Kalam = require('./models/Kalam');
const User = require('./models/User')
const {setUser, getUser} = require('./service/auth');
const streakRoute = require('./routes/StreakRoute');
const Streak = require("./models/Streak")
const { handleSearch } = require("./controller/searchController")
const { handleCommunity} = require("./controller/CommunityController")
const Community = require('./models/Community')
const {commentController} = require('./controller/commentController')  
const {upload} = require("./middleware/multer");
const {cloudfareUploader} = require("./utilities/cloudfareUploader")
const {albumController} = require("./controller/AlbumController")
const Album = require('./models/Album');
const {clearVoice} = require('./middleware/clearVoice');
const {audioWave} = require("./middleware/audiowave");
const { cloudinaryAudio } = require("./utilities/cloudinaryAudio");
const {albumCoverController} = require("./controller/AlbumController");
const {handleUserProfile} = require("./controller/userController");



app.use(cors({
     origin: ["http://localhost:5173", "https://shayriclub.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,     
      allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());  

// app.use(status());
app.use("/signup", userRoute);
console.log("✅ Signup route registered at /signup"); //
app.use("/login", userRoute2);
console.log("login route registered at /signup/login");

app.use("/streak", stayLoggedIn, streakRoute);
console.log("streak done")

app.post("/api/sher/Allama_Iqbal", async (req, res)=>{
  const body = req.body
  console.log("POST Body", body);
  if (
    !body ||
    !body.id||
    !bodytext  ){
    return res.status(400).json({msg: "All fields are req..."});
  }
  // {
  //   return res.status(201).json({msg: "created successfully..."});
  // }

 const result = await Shayri.create({
   id: body.id,
   tex: bodytext});

   console.log(result);
return res.status(201).json({msg:"User created success"});

});

app.use("/kalam", stayLoggedIn, kalamRoute);
console.log("Kalam route hit");



mongoose.connect("mongodb+srv://CloudUser:Developer7310@cluster0.p095vnk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection error:", err));

// Creating Schema
const ShayriSchema = new mongoose.Schema({
    name: String,
    id: Number,
  text:  String
     
},{timestamps: true}
)

// Creating Model

const Shayri = mongoose.model('shayri', ShayriSchema);



// const Kalam = mongoose.model('Kalam', KalamSchema);


app.get("/api/sher/Allama_Iqbal", async (req, res) =>{
  const allDbShayri = await Shayri.find({});
    return res.json(allDbShayri);
});

app.get("/api/UrKalam", async (req, res)=>{
  token = req.cookies.uid;
  console.log(req.cookies.uid);
  const user = getUser(token);
  req.user = user;
  const allDbKalam = await Kalam.find({createdBy: req.user._id});
  
  return res.json(allDbKalam);
})

// const KalamSchema = new mongoose.Schema({
//     title: String,
//     content: String

// });



app.post("api/sher/Kalam",  async (req, res) =>{
  const body = req.body
  if(
    !body||
    !body.title||
    !body.content ){
      return res.status(404).json({
        msg: "All fields are required",
        success: true                        
      })

    }
    console.log(req.body);
  
});


// app.get("/shayri", (req, res)=>{
//     const html = `
//     <ul>
//     ${shayri.map((sher)=> `<li>${sher.line1}</li>`

//     </ul>
//     `;
//     res.send(html);
// });

app.get("/api/sher/Allama_Iqbal/:id", (req, res)=>{
    const id =  Number(req.params.id);
    const sher = Shayri.find((sher)=> sher.id === id);
    return res.json(sher);
})

app.get('/api/userId',(req, res)=>{

  const token = req.cookies.uid;
  req.user = getUser(token);

  User.findOne({_id: req.user._id})
  .then((mongoRes)=>{

     return res.json(mongoRes);


  })

 
})

app.post("/api/users", async (req, res)=>{
  // const token = req.cookies.uid;
  // const  user = getUser(token);
  // req.user = user;

  const userId = req.body.userId;
  const userDb = await User.find({_id: userId}, {name: 1, createdAt: 1, profilePic: 1, _id: 0});

  
  // const hello = userDb[0];
  // const hello = userDb[0].name;
    const len = await Kalam.find({createdBy: userId});
    const leng = len.length
   
    //Total contributions made in nazm
    const nazm = await Kalam.find({createdBy: userId, type: "nazm"})
    const nazmLen = nazm.length;
    
    // Total contributions made in ghazal
    const ghazal = await Kalam.find({createdBy: userId, type: "ghazal"});
    const ghazalLen = ghazal.length;

    // Total contributions made in shayri
    const sherCollection = await Kalam.find({createdBy: userId, type: "sher"});
    const sherCollectionLen = sherCollection.length;


    const counter = await User.find({_id: userId}, {_id: 0, streak: 1})

  

  
  return res.json({
    userDb,
    leng,
    nazmLen,
    ghazalLen,
    sherCollectionLen,
    counter,
    

  });
})

// app.get("/kalam", (req, res)=>{

// })


app.get("/api/streak", async (req, res)=>{


  const token = req.cookies.uid;

  const user = getUser(token);

  req.user = user;


  const userStreak = await User.find({_id: req.user._id})

  return res.json(userStreak)


})

// app.get("/api/username", async (req, res)=>{
    
//   console.log(req.body)
//  const ulo = await User.find({}, {_id: 0, name: 1})

//  return res.json(ulo)
// })
app.post("/api/username", handleSearch)


app.post("/api/community", stayLoggedIn, handleCommunity)




app.get("/api/communityDisp", async (req, res)=>{


  const comms = await Community.find();
  // const comms2 = await Community.find({}, {name: 0, category: 1, bio: 1, createdAt: 1} )

  return res.json(comms)

})

app.post("/api/community/search", async (req, res)=>{

  const need = req.body.need

  const communityFound = await Community.find({name: need});

  
  const token = req.cookies.uid;
  req.user = getUser(token)
  const userId = await User.find({"_id": req.user._id}, {_id: 1});

  return res.json({
    
    communityFound,
    userId
  });
})

app.post("/api/community/search2", async (req, res)=>{

  const token = req.cookies.uid;
   req.user = getUser(token);

   const userId = await User.find({_id: req.user._id}, {_id: 1})

   return res.json(userId);
  
})

app.get("/api/community/Chat", async(req, res)=>{
  const community = req.query.community;

  // console.log(community)

 const result = await Community.find({name: community}, {messages: 1, _id: 0})

//  const result2 = result



 res.json(result)
})

app.get('/api/social', async(req, res)=>{

  const allKalam = await Kalam.find({}, {title: 1, content: 1, _id: 0})
  const allKalamsName = await Kalam.find({}, {type: 1, content: 1, name: 1, createdAt: 1, _id:1})

  const token = req.cookies.uid;

  req.user = getUser(token);

  const userId = await User.find({_id: req.user._id});
  

  return res.json({
    
    allKalamsName,
    userId,
    

  })
})


app.get('/api/kalam/comment', async (req, res)=>{

  const id = url.parse(req.url, true).query.kalamId
  console.log("kalamd_id", id)

  const token = req.cookies.uid;
  req.user = getUser(token);

  const userKalam = await Kalam.find({_id: id}, {comments: 1, _id: 0})
  const mId = await User.find({_id: req.user._id})
  

  return res.json({

    userKalam,
    mId
  });
})



app.post('/api/kalam/comm', commentController )


app.post('/upload', upload.single('image'), cloudfareUploader, handleUserProfile)


  
  // console.log("req.file",req.file);
  //     return res.json(req.file.path);


app.use("/uploads", express.static(path.join(__dirname, "uploads")))


// app.get("/api/community/profile")

app.post("/api/album", albumController)

app.get('/api/displayAlbums', async (req, res)=>{

const token = req.cookies.uid;
req.user = getUser(token);

const list = await Album.find({createdBy: req.user._id})

return res.json(list)

})

app.get('/api/albumKalams', async (req, res)=>{

 const albumId =  url.parse(req.url, true).query.albumId
 console.log("_id", albumId)
 const token = req.cookies.uid;
 req.user = getUser(token);
//  const albumKalams = await Album.find({_id: albumId});

 const albumKalams = await Album.find({_id: albumId}).populate('kalamCollection.kalam')
 const kalamList = await Kalam.find({createdBy: req.user._id});

 console.log("array checking", albumKalams)
 const length = albumKalams[0].kalamCollection.length;

 console.log("length", length);

 return res.json({albumKalams, length, kalamList});





//   Album.find({_id:albumId}).populate('kalamCollection.kalam')

//   .then((data)=>{
//      console.log("dataaa", data)

//      return res.json(data)
//   })


  





})


app.post('/api/selection', async (req, res)=>{

  // console.log(req.body.list[0]);

  const selectedKalams = req.body.list;

  console.log("selectedKalams", selectedKalams)

 

  const objectValues = Object.values(selectedKalams)

  

  const length = objectValues.length;

  console.log("objectValues", objectValues);


// const allValues =  Object.values(selectedKalams);
// console.log("all values",allValues);




// const allValues  = Object.values(selectedKalams);

const albumId = url.parse(req.url, true).query.albumId;

 

 for(i=0; i<length; i++){

Album.updateOne({_id: albumId}, {$push:{kalamCollection:{kalam: objectValues[i]}}})

 .then((result)=>{
  
  console.log("Succesfully updated", result);
 })

 .catch((error)=>{

  console.log("error while updating the mongo field", error)
 })
 }


 Album.find({_id: albumId})

 .then((afterUpdating)=>{
console.log("Album with updated kalams")

  return res.json(afterUpdating);
 })
  
 .catch((error)=>{
  console.log("error while finding the updated kalam album", error)
  return res.json(error);
 })


})



  

app.post('/api/GalleryCover', upload.single('video'), cloudfareUploader);

app.post('/upload/kalamAudio', upload.single('audio'), clearVoice, audioWave, cloudinaryAudio)

  // console.log("dekh",req.file.originalname)
  // console.log("reqbody", req.body.type);
  // res.json("hello from buckend")


  // console.log("req.body",req.body)
  // console.log("req.file", req.file)


  // res.json("Response from backend multer ha ha ha")


// const child = spawn('ffmpeg', ['-i', "./uploads/profilePics/video-68ff816b785eb33c34d4d91f.wav", "-filter:a", "arnndn=model=./voiceModel/bd.rnnn", "-codec:a", "pcm_s24le", "./uploads/kalamAudio/output.wav"])

// child.stdout.on('data', (data)=>{

//     console.log("data", data);
// })

// child.stderr.on('data', (data)=>{

//     console.log("stderr", data.toString());
// })


// child.on('error', (error)=>{

//     console.log("There's an error pls look onto it", error)
// })

app.get('/api/kalam/player',(req, res)=>{

  const albumId = url.parse(req.url, true).query.albumId;

  Album.findOne({_id: "69a5d8f556d3fad3bbed6b02"}).populate("kalamCollection.kalam")

  .then((result)=>{
 
    res.json(result);
    return
  })
})

app.post   ('/api/album/status', (req, res)=>{

  const albumId = url.parse(req.url, true).query.albumId;

  Album.updateOne({_id: albumId},{$bit:{isLive: {xor: 1}}})

  .then(()=>{

    console.log("Kalam published successfully")

    res.json("Kalam Published successfully")
    return;
  })

  .catch((error)=>{
    console.log("error while uploading to mongoDB", error)
  })
})


app.get('/api/albumsLive', (req, res)=>{
  Album.find({isLive: 1})

  .then((result)=>{
    console.log("result", result)

    return res.json(result)
  })

  .catch((error)=>{
    console.log("error from mongodb", error)

    return
  })
})

app.post('/api/upload/albumCover', upload.single('albumCover'), cloudfareUploader, albumCoverController)

app.get("/health", (req, res) => {

  console.log("request recieved fom esp32")
  res.status(200).json({
    ok: true,
    message: "Server is running"
  });
});

// User Data for global chat
app.get('/globalchat/userInfo', (req, res)=>{

  const token = req.cookies.uid;

  req.user = getUser(token);

  User.findOne({_id: req.user._id})

  .then((userInfo)=>{
    return res.json(userInfo)
  })
})



module.exports = server
