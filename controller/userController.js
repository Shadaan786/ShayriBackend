const User = require("../models/User");
//uuid
const {v4: uuidv4} = require('uuid')
const { setUser, getUser } = require('../service/auth')
const bcrypt = require('bcrypt');
const saltRounds = 12;




async function handleUserSignup(req, res) {
    console.log("🔥 Signup route hit");
    console.log("📦 Request body:", req.body);
    
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields (name, email, password) are required"
            });
        }

        bcrypt.hash(password, saltRounds)

        .then((hash)=>{
            console.log("hashed password", hash);

            // Storing Hashed Password in DataBase

             User.create({
            name,
            email,
            password: hash
        })

        .then(()=>{

            console.log("Hashed Password stored successfully in DataBase");
        })

        .catch((error)=>{

            console.log("Error uploading Hashed Password to MongoDb", error); 
        })

            // bcrypt.compare(password, hash)

            // .then((check)=>{
            //     console.log("decrypted password", check);
            // })
        })

        .catch((error)=>{
            console.log("Error while Hashng Password", error);
        })
        
       
        
        console.log("✅ User created successfully:", newUser._id);

        if(name === name &&  email === email && password === password){
          return  res.status(201).json({
            success: true, 
            redirectUrl: '/',
            message: "Signup successful",
            userId: newUser._id});

        //     return res.status(201).json({
        //     message: "Signup successful",
        //     success: true,
        //     userId: newUser._id
        // })
        }else{
          return  res.json({success: false, message: "condition not met"});
        }
        
        
        
    } catch (error) {
        console.log("❌ Error:", error.message);
        
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "Email already exists" 
            });
        }
        
        return res.status(500).json({ 
            message: "Signup failed", 
            error: error.message 
        });
    }

  
}

  async function handleUserLogin(req, res){
    console.log(req.body);
        console.log("login route hit")

        const {email, password} = req.body;

        const user = await User.findOne({email})


        console.log("user_for_hashing", user);

        bcrypt.compare(password, user.password)

        .then((result)=>{

            if(result){
                
                
        const token = setUser(user)
        res.cookie("uid", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",  // HTTPS only in prod
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", 
  path: "/",  // allow cookie on all routes
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});
        // res.cookie('uid', sessionId)
            return res.status(200).json({msg: "User found successfully"})
            }else{

                 
          return  res.json({
            success: true,
            msg: "data not found",
            redirectUrl: '/Signup'

            
        });


            }
        })

        .catch((error)=>{

            console.log("Error while decrypting Password", error);
        })
        
        // if(!user){

          

        

        // }else{

        // //      const sessionId = uuidv4();
        // // setUser(sessionId, user)

        // }


    }

    const handleUserProfile=(req, res, next)=>{
      
        const token = req.cookies.uid;

        req.user = getUser(token);

        User.updateOne({_id: req.user._id}, {profilePic: req.imageLink})

        .then(()=>{
            console.log("Profile pic  uploaded sucessfully");

            return res.json(req.imageLink)
        })

    }

module.exports = { handleUserSignup, handleUserLogin, handleUserProfile};
// module.exports = { handleUserLogin };

