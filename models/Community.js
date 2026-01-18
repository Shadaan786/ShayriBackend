
const {v4: uuidv4} = require('uuid')
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommunitySchema = new Schema({

    name:{
        type: String,
        required: true,
        unique: true
    },

    category:{
        type: String,
        required: true
    },

    bio:{
        type: String,
        
    },

    id:{
        type: String,
    },

    members:[
       {
        memberUuid:{
            type: String,
            required: true
        }
       }
    ],

    messages:[
        {

            sendFrom: String,
            message: String
            
        },

        {
            _id: false
        }
    ],

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                unique: true
    }
}, {timestamps: true})

const Community = mongoose.model('Community', CommunitySchema)

module.exports = Community;
