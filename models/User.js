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
                type: String
            },

            _id: false
        }
    ],
    notifications:[
        {
             notificationType:{
                type: String
            },
            notificationTitle: {
                type: String
            },
            notificationBody:{
                type: String
            },
            notificationRedirectLink:{
                type: String
            },
            toNavigate:{
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