const {getUser} = require('../service/auth');
const NotInterestedPost = require('../models/NotInterestedPosts');

const notInterestedPost=(req, res)=>{
    
    const{postId} = req.body;
    const token = req.cookies.uid;

    req.user = getUser(token);

    NotInterestedPost.create({
        posts: postId,
        user: req.user._id
    })
    .then((response)=>{
        return res.status(201).json({
            success: true,
            data: "post removed successfully"
        })
    })
    .catch((error)=>{
        console.log("Error while updating not interested post fields to mongodb", error);
        return res.status(501).json({
            success: false,
            error: error
        })
    })


}

module.exports = {notInterestedPost};