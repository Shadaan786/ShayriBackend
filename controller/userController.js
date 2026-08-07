const User = require("../models/User");
//uuid
const {v4: uuidv4} = require('uuid')
const { setUser, getUser } = require('../service/auth')
const bcrypt = require('bcrypt');
const saltRounds = 12;
const sendMail = require('../service/mailer')
const jobQueue = require('../jobQueue')
const mq = require('../send');
const { urlencoded } = require("express");
const url = require('url')
const redis = require('../redis');
const { devLogger } = require("../loggers/devLogger");
const {gen} = require("../send");
const { error } = require("console");
const { message } = require("../firebase");


async function handleUserSignup(req, res) {
    console.log("🔥 Signup route hit");
    console.log("📦 Request body:", req.body);
    

        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields (name, email, password) are required"
            });
        }

        const doesExist = await User.findOne({email: email})

        if(doesExist){
            return res.json({
                success: false,
                message: "user with this email already exist"
            })
        }

        
       

        bcrypt.hash(password, saltRounds)

        .then((hash)=>{
            console.log("hashed password", hash);

            const otp = Math.floor(Math.random()*(10e4 - 1000)+1000)
            const userData = {
                email: email,
                password: hash,
                name: name,
                otp: otp
            }


            redis.set(`user:${email}`,JSON.stringify(userData));

            gen({
                jobType: "OTP_verification",
                payload:{
                    otp: otp,
                    email: email
                }
            })

            return res.status(200).json({
                message: "Otp sent",
                success: true
            })

            // Storing Hashed Password in DataBase

        //      User.create({
        //     name,
        //     email,
        //     password: hash
        // })

        // .then(()=>{

        //     console.log("User created successfully and hashed Password stored successfully in DataBase");
        //      console.log("✅ User created successfully:");
        //     //  jobQueue.push({
        //     //     job_type: "welcome_mail",
        //     //     email: email
        //     //  })

        //      mqStarter(JSON.stringify({
        //         job_type: "welcome_mail",
        //         email: email
        //      }))

               

              
            
        //         return  res.status(201).json({
        //     success: true, 
        //     redirectUrl: '/',
        //     message: "Signup successful",
        //     });
        
             

        //         // console.log("mailResponse", mailResponse)




             

        // })

        // .catch((error)=>{

        //     console.log("Error while creating a user", error); 
        // })

          
        })

        .catch((error)=>{
            console.log("Error while Hashng Password", error);
            return
        })
        
        
    // } catch (error) {
    //     console.log("❌ Error:", error.message);
        
    //     // Handle duplicate email error
    //     if (error.code === 11000) {
    //         return res.status(400).json({ 
    //             message: "Email already exists" 
    //         });
    //     }
        
    //     return res.status(500).json({ 
    //         message: "Signup failed", 
    //         error: error.message 
    //     });
    // }

  
}
const otp_validator = async(req, res)=>{

     const email = url.parse(req.url, true).query.email
     const otpFromUser = req.body.otp
    

    const user = await redis.get(`user:${email}`)

    console.log("see user", email);
    const otp = JSON.parse(user).otp
    const password = JSON.parse(user).password
    const name = JSON.parse(user).name
    console.log("see from user", otpFromUser)
    
    if(otpFromUser == otp){

        User.create({
            name,
            email,
            password
        }).then((userCreated)=>{
            console.log("User successfully created")
            return res.status(201).json({
                success: true,
                message: "User successfully created"
            })
        }).catch((error)=>{
            console.log("Error while creating USer");
            return res.status(404).json({
                success: false,
                message: `Error while creating user ${error}`
            })
        })
    }



}

const resendOtp=async(req, res)=>{

    const email = url.parse(req.url, true).query.email

    const prevUserData = await redis.get(`user:${email}`)
    const name = JSON.parse(prevUserData).name
    const password = JSON.parse(prevUserData).password
     await redis.del(`user:${email}`);

     const newUserData={
        name: name,
        email: email,
        password: password
     }

     const newUser = await redis.set(`user:${email}`,JSON.stringify(newUserData))

     const newOtp = Math.floor(Math.random()*(10e4 - 1000)+1000)

            gen({
                jobType: "OTP_verification",
                payload:{
                    otp: newOtp,
                    email: email
                }
            })

            return res.status(200).json({
                success: true,
                message: "New OTP send to the provided email"
            })




    
}

  async function handleUserLogin (req, res){
    console.log(req.body);
        console.log("login route hit")

        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){

            return res.json({
            success: false,
            msg: "data not found",
            redirectUrl: '/Signup'

            
        })
        }


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
  Headers
});
        // res.cookie('uid', sessionId)
      
            return res.status(200).json({
                msg: "User found successfully",
                 success: true
            })
            }else{

                 
          return  res.json({
            success: false,
            message: "incorrect login credentials"
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

    const handleUserLogout = async(req, res)=>{

        
 
        console.log("logout route hit")
        const token = url.parse(req.url, true).query.token;

        console.log("tokkkeeennnn", token)

        const token2 = req.cookies.uid;
        req.user = getUser(token2);

       await redis.del(req.user._id)

        User.findByIdAndUpdate(req.user._id, {$pull:{FCMtoken:{token:token}}})

        .then((tokenPullResult)=>{
            console.log("token pulled successfully", tokenPullResult);

         return  res.clearCookie("uid").json("logged out successfully");

           

            
        }).catch((error)=>{
            console.log("Error while pulling token from user db", error)

            return res.json(error);
        })

    }

    const handleProfilePicDeletion=(req, res)=>{

        const {profileLink} = req.body;
        const token = req.cookies.uid;
        req.user = getUser(token);

        User.updateOne({_id: req.user._id},{$unset:{profilePic:profileLink}})
        .then((result)=>{
            console.log("Profile pic deleted successfully");
            return res.status(201).json({
                success: true,
                message: "Profile pic deleted successfully"
            })
        }).catch((error)=>{
            console.log("Error while deleting profile pic", error);
            return res.status(501).json({
                success: false,
                message: error
            })
        })

    }

    const handleProfileCoverDeletion = (req, res)=>{
        const token = req.cookies.uid;
        req.user = getUser(token);


        const {profileCover} = req.body;

        User.updateOne({_id: req.user._id},{$unset:{profileCover:profileCover}})
        .then((result)=>{
            console.log("Profile cover removed successfully");

            return res.status(201).json({
                success: true,
                message: "Profile cover removed successfully"
            })
        }).catch((error)=>{
            console.log("Error while removing profile cover", error);

            return res.status(501).json({
                success: false,
                message: `Error while removing profile cover: ${error}`
            })
        })
    }

module.exports = { handleUserSignup, handleUserLogin, handleUserProfile, handleUserLogout, otp_validator, resendOtp, handleProfilePicDeletion, handleProfileCoverDeletion};
// module.exports = { handleUserLogin };

