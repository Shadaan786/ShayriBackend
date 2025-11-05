require("dotenv").config();
console.log("Port from env:", process.env.PORT);

const express = require("express");
const status = require("express-status-monitor");
const cookieParser = require('cookie-parser')


// const shayri = require("./shayri.json")
const cors = require("cors");
const mongoose = require("mongoose");
// const Shayri = require('./models/Shayri');
const { stayLoggedIn } = require('./middleware/auth')
const app =express();
app.use(express.json());

const userRoute = require('./routes/signup');
const userRoute2 = require('./routes/login');
const kalamRoute = require('./routes/kalamRoute');
const Kalam = require('./models/Kalam');
const User = require('./models/User')
const {setUser, getUser} = require('./service/auth');
const streakRoute = require('./routes/StreakRoute');
const Streak = require("./models/Streak")



const PORT = 9000;

app.use(cors({
     origin: ["http://localhost:5173", "https://shayriclub.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"], // your frontend URL
    credentials: true,      // allow cookies to be sent
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
    const sher = shayri.find((sher)=> sher.id === id);
    return res.json(sher);
})

app.get("/api/users", async (req, res)=>{
  const token = req.cookies.uid;
  const  user = getUser(token);
  req.user = user;
  const userDb = await User.find({_id: req.user._id}, {name: 1, createdAt: 1, _id: 0});

  
  // const hello = userDb[0];
  // const hello = userDb[0].name;
    const len = await Kalam.find({createdBy: req.user._id});
    const leng = len.length
   
    //Total contributions made in nazm
    const nazm = await Kalam.find({createdBy: req.user._id, type: "nazm"})
    const nazmLen = nazm.length;
    
    // Total contributions made in ghazal
    const ghazal = await Kalam.find({createdBy: req.user._id, type: "ghazal"});
    const ghazalLen = ghazal.length;

    // Total contributions made in shayri
    const sherCollection = await Kalam.find({createdBy: req.user._id, type: "sher"});
    const sherCollectionLen = sherCollection.length;


    const counter = await User.find({_id: req.user._id}, {_id: 0, streak: 1})

  

  
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




app.listen(PORT, ()=> console.log(`Server is running at ${PORT}`));
