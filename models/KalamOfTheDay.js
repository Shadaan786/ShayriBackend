const mongoose = require("mongoose");

const KalamOfTheWeekSchema = new mongoose.Schema({

    Kalam:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kalam'
    },


}, {timestamps: true});

const Kotw = mongoose.model("Kotd", KalamOfTheWeekSchema);

module.exports = Kotw;