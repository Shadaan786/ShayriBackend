const User = require("../models/User");
//uuid
const {v4: uuidv4} = require('uuid')
const { setUser } = require('../service/auth')



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
        
        const newUser = await User.create({
            name,
            email,
            password,
        });
        
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

        const user = await User.findOne({email, password})
        
        if(!user){

           
          return  res.json({
            success: true,
            msg: "data not found",
            redirectUrl: '/Signup'

            
        });

        

        }else{

        //      const sessionId = uuidv4();
        // setUser(sessionId, user)

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
        }


    }

module.exports = { handleUserSignup, handleUserLogin};
// module.exports = { handleUserLogin };

