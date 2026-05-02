const amqp = require('amqp-connection-manager');
const sendMail = require('./service/mailer')
const {messenger} = require('./firebase');
const mqStarter = require('./send');

const reciever =async()=>{
    const connection = await amqp.connect('amqp://localhost:5672');

    connection.on("error", error=>{
      console.log("error while connecting ", error)
    })

const channel = await connection.createChannel();
const queue = 'checking';

await channel.assertQueue(queue, {
  durable: true,
  arguments: {
    'x-queue-type': 'quorum'
  }
});

console.log("Waiting for message ", queue);
channel.consume(queue, (msg)=>{

  const data = msg.content.toString()
  const data_final = JSON.parse(data)

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
      }).catch((error=>{
        console.log("Error while notifying user", error)
      }))



    }

},{
    noAck:false
});
}

reciever();

module.exports = reciever;
