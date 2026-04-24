const { type } = require("firebase/firestore/pipelines");
const mongoose = require("mongoose");

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

    FCMtoken:{
        type: String,
        unique: true
    },

    followers:[
        {
            follower:{
                type: String
            },

            _id: false
        }
    ],
    notifications:[
        {
            notification: {
                type: String
            },
            _id: false,
            
        },
        {
            timestamps: true
        }
    ]
},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;