const mongoose = require('mongoose')

const SavedKalamsSchema = new mongoose.Schema({
    savedKalam:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kalam"
    },
    
    savedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

const SavedKalams = mongoose.model("SavedKalams", SavedKalamsSchema);
module.exports = SavedKalams;