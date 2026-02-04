const mongoose = require("mongoose");

const KalamSchema = new mongoose.Schema({
    type: {

        required: true,
        type: String

    },

    content: {
        required: true,
        type: String,
        unique: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    name: {
        type: String,
        required: true
    },

 totalLikes:{
    type: Number,
    default: 0,
    required: true
   },

   likedBy:[
    {
        type: String
    }
   ],

   comments:[
    {
        commentBy:{
            type: String
        },

        comment:{
            type: String
        }
    },

    {
        timestamps: true
    }
   ]


}, {timestamps: true});

const Kalam = mongoose.model("Kalam", KalamSchema);
module.exports = Kalam;