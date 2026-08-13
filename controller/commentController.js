const Comment = require('../models/Comments');
const Kalam = require('../models/Kalam');
const url = require('url');
const { getUser } = require('../service/auth');


const fetchUserComments=(req, res)=>{
    const token = req.cookies.uid;
    req.user = getUser(token);
    const {commentType, kalamId, postId} = url.parse(req.url, true).query;

    if (commentType === 'kalamComment'){

    

    Comment.find({commentBy: req.user._id, commentFromKalam: kalamId})
    .then((result)=>{
        return res.status(200).json({
            success: true,
            message: "Comments found successfully",
            content: result
        })
    }).catch((error)=>{
        console.log("Error while fetching user comments", error);
        return res.status(500).json({
            success: false,
            data: error
        })
    })
}else if(commentType === 'postComment'){

       Comment.find({commentBy: req.user._id, commentFromPost: postId})
    .then((result)=>{
        return res.status(200).json({
            success: true,
            message: "Comments found successfully",
            content: result
        })
    }).catch((error)=>{
        console.log("Error while fetching user comments", error);
        return res.status(500).json({
            success: false,
            data: error
        })
    })

    
}
}
const commentController= async (req, res)=>{

const {comment} = req.body;
const {commentType,kalamId,postId} = url.parse(req.url, true).query

const token = req.cookies.uid;
req.user = getUser(token);
const mUid = req.user._id;
console.log(req.body);

//  const check = await  Kalam.updateOne({_id: kalamId},{ $addToSet:{comments:{commentBy: mUid, comment: comment}}})

 if(commentType === "kalamComment"){

    try{
        const check = await Comment.create({commentFromKalam: kalamId, commentBy:mUid, comment: comment})
     console.log("checking", check)
     return res.status(201).json({
        success: true,
        message: "Comment created successfully"
     })

    }catch(error){
        console.log("Error while creating comment", error);
        return res.status(501).json({
            success:false,
            message:error
        })
    }
    

 }else if(commentType === 'postComment'){

    Comment.create({commentFromPost: postId, commentBy: mUid, comment:comment})
    .then((result)=>{
        console.log("Post comment created successfully");
        return res.status(201).json({
            success: true,
            message: "Post kalam created successfully"
        })
    }).catch((error)=>{
        console.log("Error while creating post kalam", error);
        return res.status(501).json({
            success: false,
            message: error
        })
    })
 }



    return res.json("Comment added succesfully");

}

module.exports = {commentController, fetchUserComments};