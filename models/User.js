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

    profileCover:{
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
    likeNotifications:{
        type: Number,
        default: 1
    },
    commentNotification:{
        type: Number,
        default: 1
    },
    newFollowerNotification:{
        type: Number,
        default: 1
    },
    kalamOfTheWeekNotification:{
        type: Number,
        default: 1
    },
    kalamUploadNotification:{
        type: Number,
        default: 1
    },
    securityAlertEmailNotification:{
        type: Number,
        default: 1
    },
    weeklyDigestEmailNotification:{
        type: Number,
        default: 1
    },
    kalamOfTheWeekEmailNotification:{
        type: Number,
        default: 1
    },
    productAnouncementsEmailNotification:{
        type: Number,
        default: 1
    }
},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;