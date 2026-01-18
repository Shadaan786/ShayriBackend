const Community = require('../models/Community')
const {getUser} = require('../service/auth')


function handleCommunity(req, res){

   const {name, category, bio} = req.body;

    const token = req.cookies.uid;
   
     const user = getUser(token);
   
     req.user = user;

       Community.create({
      name,
      category,
      bio,
      createdBy: req.user._id

     })

     console.log("req.body",req.body)

   // Community.insertOne({"name": name, "category": category, "bio": bio, "createdBy": req.user._id})

   return res.json("Community created successfully")
}




module.exports = {handleCommunity}