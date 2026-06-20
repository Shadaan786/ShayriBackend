const { type } = require("firebase/firestore/pipelines");
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
            type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        },

        comment:{
            type: String
        }
    },

    {
        timestamps: true
    }
   ],

   kalamAudio:{
    type: String
   },

   customStyles:{
    title: {
        type: String
    },
    content:{
        type: String
    },
    badgeBg:{
        type: String
    },
    badgeBorder:{
        type: String
    },

    autoMainCOlor:{
        type: String
    },

    resolvedTitleColor:{
        type: String
    },

    titleFs:{
        type: String
    },
    resolvedTitleFamily:{
        type: String

    },

    resolvedContentColor: {
        type: String
    },

    contentFs:{
        type: String
    },

    resolvedContentFamily:{
        type: String
    },

    subColor:{
        type: String
    },

    backdrop:{
        type: String
    },

    resolvedTextColor:{
        type: String
    },
    bgTab:{
        type: String
    },

    selectedColor:{
        type: String
    },
    customColor:{
        type: String
    },

    selectedColor:{
        type: String
    },

    bgOpacity:{
        type: Number
    },

    scrim:{
        type: Number
    },

    imageSrc:{
        type: String
    },

    isImage:{
        type: Boolean
    },

    

    


   }


}, {timestamps: true});

const Kalam = mongoose.model("Kalam", KalamSchema);
module.exports = Kalam;