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



const PORT = 9000;

app.use(cors());
app.use(cookieParser());  

// app.use(status());
app.use("/signup", stayLoggedIn,  userRoute);
console.log("✅ Signup route registered at /signup"); //
app.use("/login", userRoute2);
console.log("login route registered at /signup/login");

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



app.get("/api/sher/Allama_Iqbal", async (req, res) =>{
  const allDbShayri = await Shayri.find({});
    return res.json(allDbShayri);
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






app.listen(PORT, ()=> console.log(`Server is running at ${PORT}`));