const mongoose = require("mongoose");

const KalamSchema = new mongoose.Schema({
    type: {

        required: true,
        type: String

    },

    content: {
        required: true,
        type: String,
        uique: true
    }



}, {timestamps: true});

const Kalam = mongoose.model("Kalam", KalamSchema);
module.exports = Kalam;