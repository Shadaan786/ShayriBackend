const url = require('url');
const ReportedPost = require('../models/ReportedPost');
const { getUser } = require('../service/auth');

const reportPost = (req, res)=>{
    const token = req.cookies.uid;
    req.user = getUser(token);
    const {reason, detail, postId} = req.body.payload;

    ReportedPost.create({
        user: req.user._id,
        posts: postId,
        reason: reason,
        detail: detail

    })

    .then((response)=>{
        return res.status(201).json({
            success: true,
            data: "post reported successfully"
        })
    })
    .catch((error)=>{
        console.error("error while updating reported post in mongodb", error);
        return res.status(501).json({
            success: false,
            error: error
        })
    })
}

module.exports = {reportPost};