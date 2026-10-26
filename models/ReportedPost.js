const { type } = require('firebase/firestore/pipelines');
const mongoose = require('mongoose');

const ReportedPostSchema  = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    posts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    },

    reason:{
        type:String
    },

    detail:{
        type:String
    }
})

const ReportedPost = mongoose.model('ReportedPost', ReportedPostSchema);

module.exports = ReportedPost;