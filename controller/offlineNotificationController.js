const User = require('../models/User');
const url = require('url');
const UserNotification = require('../models/Notifications');
const {getUser} = require('../service/auth');
// const { message } = require('../firebase');
// const { resolve } = require('dns');

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

// const allowedNotificatons=(req, res)=>{
    
//     const token = req.cookies.uid;
//     req.user = getUser(token);

//     const allowedNotifications = req.body.notifications

//     allowedNotifications.forEach(async(item)=>{
//         try{
//       await  User.updateOne({_id: req.user._id},{$bit:{[item]:{xor:1}}})
//         }catch(error){
//             console.log("Error while uploading notification permissions to database", error)
//             return res.status(501).json({
//                 success: false,
//                 message: error
//             })
//         }
//     })

//     // console.log("Notification permission uploaded to data base")

//     // return res.status(201).json({
//     //     success: true,
//     //     message: "User permission for notifications successfully added to database"
//     // })

    
// }

const allowedNotificationsHandler=async(req, res)=>{

    const token = req.cookies.uid;
    req.user = getUser(token);
    

    const allowedNotifications = req.body.notifications

    
    new Promise((resolve, reject)=>{
        let itemsLength = 0;

        allowedNotifications.forEach(async(item)=>{

            try{
            await User.updateOne({_id: req.user._id},{$bit:{[item]:{xor:1}}})
            itemsLength++;
            if(itemsLength === allowedNotifications.length){
                resolve()
            }
            
            }catch(error){
                console.log("Error while uploading permissions to database", error);
                reject(error)
            }



        })

        


    }).then(()=>{
        return res.status(201).json({
            success: true,
            message: "Notifications permissions uploaded to database successfully"
        })
    }).catch((error)=>{
        console.log("Error while uploading notification permissions to database", error);

        return res.status(501).json({
            success: false,
            message: error
        })
    })
    
}


module.exports = {offlineNotificationHandler, allowedNotificationsHandler}