const { urlencoded } = require('express');
const Post = require('../models/UserPost');
const { getUser } = require('../service/auth');
const Album = require('../models/Album');
const url = require('url');

const PostLikeController=async(req, res)=>{

    const token = req.cookies.uid;
    req.user = getUser(token);

    const {postId} = url.parse(req.url, true).query;

    if(!postId){
        return res.status(501).json({
            success: false,
            error: 'Sorry something went wrong'
        })
    }

    try{
    const likedPost = await Post.findOne({_id: postId, likedBy: req.user._id});

    if(!likedPost){
        try{
            const setting_likedBy = await Post.updateOne({_id: postId},{$addToSet:{likedBy:req.user._id}});
            try{
            const updating_netCount = await Post.updateOne({_id: postId}, {$inc:{likes: 1}});

            return res.status(201).json({
                success: true,
                data: "Post liked successfully"
            })
            }catch(error){
                console.log("Error while incrementing total post likes", error);
                return res.status(501).json({
                    success: false,
                    error: error
                })
            }
        }catch(error){
            console.log("Error while setting liked by in mongo db", error);
            return res.status(501).json({
                success: false,
                error: error
            })
        }
    }else{

        try{
            const removing_likedBy = await Post.updateOne({_id: postId},{$pull:{likedBy:req.user._id}});
            try{
                const decrement_totalLikes = await Post.updateOne({_id: postId},{$inc:{likes:-1}});

                return res.status(201).json({
                    success: true,
                    data: "Post disliked successfully"
                })
            }catch(error){
                console.log("Error while decrementing total post likes", error);
                return res.status(501).json({
                    success: false,
                    error: error
                })
            }
        }catch(error){
            console.log("Error while removing liked by", error);
            return res.status(501).json({
                success: false,
                error: error
            })
        }

    }

    }catch(error){
        console.log("Error while finding the liked post", error);
        return res.status(501).json({
            success: false,
            error: error
        })
    }

}

const userLikedPosts=(req, res)=>{
    const token = req.cookies.uid;
    req.user = getUser(token);

    Post.find({likedBy: req.user._id})
    .then((response)=>{
        console.log("seee liked posts", response)
        return res.status(201).json({
            success: true,
            data: response
        })
    })
}

module.exports = {PostLikeController, userLikedPosts};