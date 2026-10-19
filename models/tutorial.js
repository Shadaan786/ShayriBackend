const { type } = require('firebase/firestore/pipelines');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TutorialSchema = new Schema({

    type:{
        type: String,
        required: true
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    isShown:{
        type: Boolean,
        default: false
    }
})

const Tutorial = mongoose.model('Tutorial', TutorialSchema)

module.exports = Tutorial;