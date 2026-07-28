const User = require('../models/User');
const url = require('url');
const UserNotification = require('../models/Notifications');
const {getUser} = require('../service/auth');

const offlineNotificationHandler = (req, res)=>{

    const token = req.cookies.uid;
    req.user = getUser(token)

    const userId = url.parse(req.url, true).query.userId;

    // User.findOne({_id: userId}, {notifications: 1, _id: 0})
    // .then((offlineNotifications)=>{
    //     console.log("offlineNotifications", offlineNotifications)
    //     return res.status(201).json({
    //         msg: "offline notifications fetched successfully",
    //         success: true,
    //         offlineNotifications: offlineNotifications
    //     })
    // }).catch((error)=>{
    //     console.log("Error while fetching offline notifications", error);
    //     return res.status(401).json({
    //         msg: "Error while fetching offline notifications",
    //         success: false
    //     })
    // })

    UserNotification.find({notifiedUser: req.user._id})
    .then((notifications)=>{
        console.log("offlineNotifications", notifications)
        return res.status(201).json({
            msg: "offline notifications fetched successfully",
            success: true,
            offlineNotifications: notifications
        })

    }).catch((error)=>{
        console.log("Error while fetching user notifications");
          return res.status(401).json({
            msg: "Error while fetching offline notifications",
            success: false
        })
    })

    

}

module.exports = offlineNotificationHandler