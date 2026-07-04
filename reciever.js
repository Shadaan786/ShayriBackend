const amqp = require('amqp-connection-manager');
const sendMail = require('./service/mailer')
const {messenger} = require('./firebase');
const mqStarter = require('./send');
const User = require('./models/User');
const Kalam = require('./models/Kalam');
let queue2;

const reciever =async(makeSure)=>{

  console.log("makeSure", makeSure)

  if(!makeSure)return

  
    // const connection = await amqp.connect(['amqps://ekvncpnr:y0NMR6YFWcGntP2bvWTAKtfCnFkq4fhE@fuji.lmq.cloudamqp.com/ekvncpnr2']);
    const connection = await amqp.connect(['amqps://ekvncpnr:MfgNIppn7NWI-01W5Il20tMEUU7O-WKz@fuji.lmq.cloudamqp.com/ekvncpnr']);

    connection.on("error", error=>{
      console.log("error while connecting ", error)
    })

const channel = await connection.createChannel();
   channel.on("error", error=>{
        console.log("error while creating channel", error);
     })
 const queue = 'checking';
     channelWrapper = await connection.createChannel({
        json: true,
        setup: async(channel)=>{
         queue2 =   await channel.assertQueue(queue, {
                durable: true,
                arguments:{
                    "x-queue-type": "quorum",
                } 
            })
        }
     });
console.log("Waiting for message ", queue);

channel.consume(queue, (msg)=>{

  const data_final = JSON.parse(msg.content.toString())
  

  channel.ack(msg)
    console.log("Message recieved,",data_final);

    if(data_final.job_type === "welcome_mail"){

      sendMail(data_final.email, "welcome to ShayriClub BUDDY!!! RabbitMQ")
      .then((mailResponse)=>{
        console.log("Mail sent successfullt", mailResponse);
      }).catch((error)=>{
        console.log("Error while sending welcome mail", error);
      })

    }else if(data_final.jobType === 'notifying_user'){

      console.log("notifying user jobType matched")

      const message = {
        notification: {
          "title": data_final.payload.notification.title,
          "body": data_final.payload.notification.body
        },
        data:{
          score: '850',
          time: '2:45'
        },
        token: data_final.token
      }

      messenger.send(message)

      .then((notification_response)=>{
        console.log("user notified successfiully", notification_response)
        User.findOne({FCMtoken: data_final.token})
        .then((updateResPre)=>{
          console.log("Update res PRE", updateResPre);
        })

        User.updateOne({FCMtoken: data_final.token}, {$push:{notifications:{notificationType: "New Follower", notificationTitle: "You got a new follower", notificationBody: "A new user started following you"}}})

        .then((updatedResult)=>{
          console.log("Update_result", updatedResult)

          return

        }).catch((error)=>{
          console.log("Error while updating user", error)
          return
        })


      }).catch((error=>{
        console.log("Error while notifying user", error)
      }))



    }else if(data_final.jobType === "offline_user_notification"){

      User.findByIdAndUpdate(data_final.payload.toNotify,{$addToSet:{notifications:{notificationType: "Follow_notification", notificationTitle: data_final.payload.notificationTitle, notificationBody: data_final.payload.notificationBody, toNavigate: `/Profile?=${data_final.payload.follower}`}}})

      .then((offlineNotificationResult)=>{
        console.log("Offline user notified successfully", offlineNotificationResult)
      }).catch((error)=>{
        console.log("Error whilie notifying offline user", error)
      })

    }else if(data_final.jobType === "kalamLike_notification"){
    const check =(async()=>{
      
      const likedKalam = await Kalam.findOne({_id: data_final.payload.kalamId})
      const createdBy = (likedKalam.createdBy).toString()
      const likedBy = await User.findOne({_id: data_final.payload.likedBy})
      const likerName = likedBy.name;
      console.log("likerName", likerName)

      // Fetching FCM token 
      try{
        console.log("createdBy", createdBy)
        const user = await User.findOne({_id: createdBy});
        const FCMtoken = user.FCMtoken;
        console.log("token length", FCMtoken.length);
        if(FCMtoken.length !== 0){
          //notifying user if user is loggedIn

          console.log("forEach is running")

          FCMtoken.forEach((token)=>{

             const message = {
            notification: {
              "title": `New like to your kalam`,
              "body": `${likerName} has liked your kalam`
            },
            data:{
              score: '850',
              time:'2:45'
            },
            token: token.token
          }

          messenger.send(message)
          .then((data)=>{
            console.log("User notified successfully", data);
          }).catch((error)=>{
            console.log("Eror while notifying user", error)
          })


          })


          try{

          
        const userNotified =  await User.updateOne({_id: createdBy},{$push:{notifications:{notificationType:"kalam liked",notificationTitle:"You got a like on your comment", notificationBody: `${likerName} liked your kalam`}}})
        console.log("User notification stored successfully in MonogDb1", userNotified)

          }catch(error){
            console.log("Error while storing user notification in MongoDB1",error);

          }
         
        }else{

    try{ const userNotified =  await User.updateOne({_id: createdBy},{$push:{notifications:{notificationType:"kalam liked",notificationTitle:"You got a like on your comment", notificationBody: `${likerName} liked your kalam`}}})
       console.log("User notification stored successfully in MongoDb2", userNotified)
      }catch(error){
        console.log("Error while storing user notification in MongoDB2", error)
      }

        }
      }catch(error){
        console.log("Error fetching the owner of liked Kalam", error)
      }})
      check()
    }else if(data_final.jobType === "kalamUpload_notification"){
      const kalamUploadBy = data_final.payload.uploadBy;
      User.findOne({_id: kalamUploadBy}).populate("followers.follower")
      .then((kalamUploader)=>{
        console.log("kalamUploader", kalamUploader)
        const followers = kalamUploader.followers
        const kalamUploaderName = kalamUploader.name;

        if(followers.length === 0){
          return
        }else{

          followers.forEach((follower)=>{
           const tokens = follower.follower.FCMtoken
           if(tokens.length === 0){
            User.updateOne({_id:follower.follower._id},{$push:{notifications:{notificationType: "User upload notification", notificationTitle: "New Kalam", notificationBody:`${kalamUploaderName} uploaded a new kalam`}}})
            .then((notificationsStored)=>{
              console.log("Notifications stored in Database")
            }).catch((error)=>{
              console.log("Error in storing kalam upload notification in Database", error)
            })
           }else{
            tokens.forEach((token)=>{
              const message= {
                notification:{
                  "title": "New Kalam",
                  "body": `${kalamUploaderName} uploaded a new kalam, check out now!!`
                },
                data:{
                  score: '850',
                  time: '2:45'
                },
                token: token.token
              }
              
              console.log("token:", token.token)
              console.log("message", message)

              messenger.send(message)
              .then((sent)=>{
                console.log(`Kalam upload notification sent to ${followers.name} `)
              }).catch((error)=>{
                console.log("Error while sending kalam upload notification to followers", error);
              })
            })
           }
          })
          
        }

      })
      
    }

},{
    noAck:false
});
}

reciever();

module.exports = reciever;
