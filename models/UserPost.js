const { type } = require("firebase/firestore/pipelines");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    postBY:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    text:{
        type: String
    },

    featuredAlbum:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },

    featurdKalam:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kalam'
    },

    likes:{
        types: Number,
        default: 0
    },
},
{timestamps: true}
)

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;