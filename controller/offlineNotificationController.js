const User = require('../models/User');
const url = require('url');

const offlineNotificationHandler = (req, res)=>{

    const userId = url.parse(req.url, true).query.userId;

    User.findOne({_id: userId}, {notifications: 1, _id: 0})
    .then((offlineNotifications)=>{
        console.log("offlineNotifications", offlineNotifications)
        return res.status(201).json({
            msg: "offline notifications fetched successfully",
            success: true,
            offlineNotifications: offlineNotifications
        })
    }).catch((error)=>{
        console.log("Error while fetching offline notifications", error);
        return res.status(401).json({
            msg: "Error while fetching offline notifications",
            success: false
        })
    })

}

module.exports = offlineNotificationHandler