const Kalam = require('../models/Kalam');
const url = require('url');

const commentController= async (req, res)=>{

const {comment} = req.body;
const kalamId = url.parse(req.url, true).query.kalamId
const {mUid}  = req.body;

console.log(req.body);

 const check = await  Kalam.updateOne({_id: kalamId},{ $addToSet:{comments:{commentBy: mUid, comment: comment}}})

 console.log("checking", check)



    return res.json("Comment added succesfully");

}

module.exports = {commentController};