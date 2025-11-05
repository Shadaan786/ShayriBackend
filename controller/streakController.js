const { getUser } = require('../service/auth')



// const Streak = require("../models/Streak");
const User = require("../models/User");


async function handleStreak(req, res){

    const token = req.cookies.uid;
  const user = getUser(token)

    req.user = user;


    console.log(req.body)


    const streak = await User.updateOne({_id: req.user._id}, {$set:{streak: req.body.count}})



console.log("streak updated successfully");

return res.json({
    msg: "counter updated successfully",
    streak: streak.counter
})

}

module.exports = { handleStreak };
