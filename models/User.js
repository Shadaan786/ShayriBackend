const { type } = require("firebase/firestore/pipelines");
const mongoose = require("mongoose");
const NotificationSchema = require("./Notifications")

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,

    },

    streak: {
        type: Number,
        default: 0
    },
    
    profilePic:{
        type: String
    },
    bio:{

        type: String

    },
    featuredVerse:{
        type: String
    },

    FCMtoken:[
        {
            token:{
                type: String,
                 unique: true
    },
    _id: false
    }
    ],

    followers:[
        {
            follower:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },

            _id: false
        }
    ],
},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;