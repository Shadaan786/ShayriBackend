const { type } = require('firebase/firestore/pipelines');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    commentFromKalam:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kalam'

    },

    commentFromPost:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    commentBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    comment:{
        type: String
    }
},
{timestamps: true}
)

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;