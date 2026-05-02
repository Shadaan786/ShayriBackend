const User = require('../models/User');
const {getUser} = require('../service/auth');
const url = require('url');
const {messenger} = require('../firebase')
const mqStarter = require('../send');
const { score } = require('firebase/firestore/pipelines');
const {gen} = require('../send');


const handleFollow=async(req, res)=>{


    const userId = req.body.userId;
    const token = req.cookies.uid;
    req.user = getUser(token);

    const fcm =await User.findOne({_id: userId});
    const fctoken =  fcm.FCMtoken;

    console.log("fcm", fcm)

    // console.log(fctoken);

    // if(!fctoken){
    //     console.log("Error while searching for fcm token in User document")
    //     return
    // }


    User.updateOne({_id: userId},{$addToSet:{followers:{follower: req.user._id}}})

    
    .then(()=>{

        // const message={
        //     notification: {
        //         "title": "You got a new follower",
        //         "body": "A user started following you"
        //     },
        //     token: fctoken
        // }
        const jobData={
            jobType: "notifying_user",
            payload:{
                notification: {
                    "title": "New Follower",
                    "body": "A user started following you"

                },
                
            },
            data:{
                    score: '850',
                    time: '2:45'
                },
             token: fctoken
        }

        // messenger.send(message)
        // mqStarter(JSON.stringify(jobData))

        gen(JSON.stringify(jobData))




       return res.status(200).json({
            msg: "follower updated successfully",
            success: true
        })
    }).catch((error)=>{
         console.log("error updating the follower field", error);

         return res.status(404).json({
            msg: "error updating the follower fiels",
            error: error,
            success: false
         })
    })

}

const getFollowers =(req, res)=>{

    const token = req.cookies.uid;
    req.user = getUser(token);
    const user = url.parse(req.url, true).query.user

    User.findOne({_id: user, followers:[{follower: req.user._id}]})
    .then((mongoResult)=>{
        console.log("mongo_result", mongoResult);

        console.log("mongo_result", mongoResult)

        if(mongoResult === null){
            return res.status(200).json({
                message: "follower doesnt existed",
                found: false
                
            })
        }else{
            return res.status(200).json({
                messgae: "follower found",
                found: true,
                follower: mongoResult
            })
        }
    })


}

const handleUnfollow=(req,res)=>{

    const user = url.parse(req.url, true).query.userId
    const token = req.cookies.uid;
    req.user = getUser(token);
        
    console.log("user", user);
    console.log("req.user._id", req.user._id)
    User.updateOne({_id: user}, {$unset:{followers:{follower: req.user._id}}})
    .then((updatedResult)=>{

        console.log("updatedResult", updatedResult)
        return res.status(200).json({
            message: "unfollowed successfully",
            success: true
        })
    }).catch((error)=>{
        console.log("Error_while_unfollowing", error);

        return res.status(204).json({
            message: "currently unable to unfollow",
            success: false
        })
    })

}

module.exports = {handleFollow, getFollowers, handleUnfollow};