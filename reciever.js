const amqp = require('amqplib');
const sendMail = require('./service/mailer')
const {messenger} = require('./firebase');
const mqStarter = require('./send');

const reciever =async()=>{
    const connection = await amqp.connect('amqp://localhost:5672');

const channel = await connection.createChannel();
const queue = 'hello';

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
    console.log("Message recieved,",data_final);

    if(data_final.job_type === "welcome_mail"){

      sendMail(data_final.email, "welcome to ShayriClub BUDDY!!! RabbitMQ")
      .then((mailResponse)=>{
        console.log("Mail sent successfullt", mailResponse);
      }).catch((error)=>{
        console.log("Error while sending welcome mail", error);
      })

    }else if(data_final.jobType === 'notifying_user'){

      messenger.send(data_final)

      .then((notification_response)=>{
        console.log("user notified successfiully")
      }).catch((error=>{
        console.log("Error while notifying user", error)
      }))



    }

},{
    noAck:true
});
}

reciever();

module.exports = reciever;