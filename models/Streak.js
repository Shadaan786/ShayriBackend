const mongoose = require("mongoose")

const StreakSchema = new mongoose.Schema({
    counter: {

        type: Number,
        default: 0

    },

    createdBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user',
    }
}, {timestamps: true});

const Streak = mongoose.model("Streak", StreakSchema);
module.exports = Streak;