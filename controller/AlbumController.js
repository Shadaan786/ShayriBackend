const Album = require('../models/Album')
const {getUser} = require("../service/auth")


const albumController=(req, res)=>{

const {name} = req.body;


const token = req.cookies.uid;
req.user = getUser(token);

 Album.create({
    name,
    createdBy: req.user._id
})
   .then((checking)=>{
                console.log("checking_creation", checking)
   })

   .catch((error)=>{
    console.error("Error updating the mongoDB field", error)

    res.json("Error updating mongoDB field", error)
   })
}

module.exports = {albumController};