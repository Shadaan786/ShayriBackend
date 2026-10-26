const { type } = require('firebase/firestore/pipelines');
const mongoose = require('mongoose');

const ReportedKalamSchema  = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    kalams:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kalam'
    },

    reason:{
        type:String
    },

    detail:{
        type:String
    }
})

const ReportedKalam = mongoose.model('ReportedKalam', ReportedKalamSchema);

module.exports = ReportedKalam;