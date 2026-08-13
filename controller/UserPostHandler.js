const { message } = require('../firebase');
const Post = require('../models/UserPost');
const { getUser } = require('../service/auth');

const userPostHandler=(req, res)=>{

    const token = req.cookies.uid;
    req.user = getUser(token);

    const {text} = req.body;
    const kalam = req.body.kalam;
    const album = req.body.album;

    if(kalam){
        Post.create({postBy: req.user._id, text: text, featurdKalam: kalam})
        .then((result)=>{
            console.log("post created successfully");
        }).catch((error)=>{
            console.log("error while creating post", error);
        })
    }else if(album){
        Post.create({postBy: req.user._id, text: text, featuredAlbum: album})
        .then((result)=>{
            console.log("Post created successfully");
            return res.status(201).json({
                success: true,
                message: "User post created successfully"
            })
        }).catch((error)=>{
            console.log("Error while creating post", error);

            return res.status(501).json({
                success: false,
                message: error
            })
        })
    }else{
        Post.create({postBy: req.user._id, text: text})
        .then((result)=>{
            console.log("Post created successfully")
        }).catch((error)=>{
            console.log("Error while creating post", error)
        })
    }


}

const getUserPosts=(req, res)=>{

    Post.find({})
    .populate("postBy")
    .populate("featuredAlbum")
    .populate("featurdKalam").sort({createdAt: -1})
    .then((result)=>{
        return res.status(201).json({
            success: true,
            message: "User posts fetched successfully",
            content: result
        })
    }).catch((error)=>{
        console.log("Error while getting user posts from database", error);
        return res.status(501).json({
            success: false,
            message: error
        })
    })

}

module.exports = {userPostHandler, getUserPosts};