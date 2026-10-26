const { type } = require('firebase/firestore/pipelines');
const mongoose = require('mongoose');

const NotInterestedPostSchema  = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    posts:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },

})

const NotInterestedPost = mongoose.model('NotInterestedPost', NotInterestedPostSchema);

module.exports = NotInterestedPost;