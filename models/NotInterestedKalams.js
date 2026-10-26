const { type } = require('firebase/firestore/pipelines');
const mongoose = require('mongoose');

const NotInterestedKalamSchema  = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    kalams:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Kalam'
    },

})

const NotInterestedKalam = mongoose.model('NotInterestedKalam', NotInterestedKalamSchema);

module.exports = NotInterestedKalam;