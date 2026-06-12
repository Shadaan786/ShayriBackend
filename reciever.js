const amqp = require('amqp-connection-manager');
const sendMail = require('./service/mailer')
const {messenger} = require('./firebase');
const mqStarter = require('./send');
const User = require('./models/User');
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

    }

},{
    noAck:false
});
}

reciever();

module.exports = reciever;
