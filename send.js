const amqp = require('amqp-connection-manager')
let connection;
let channel;
let queue;
// const mqStarter = async(data)=>{

//     if(!data)return;
//     if(connection){

//           const channel =  await connection.createChannel();


//           console.log(data)


//     const queue = 'hello';
//     const msg = 'Hello World';

  



//       await channel.assertQueue(queue, {
//         durable: true,
//         arguments:{
//             'x-queue-type': 'quorum'
//         }
//     });

//     channel.sendToQueue(queue, Buffer.from(data));

//     console.log("msg sent", data);


//     }else{


//           connection = await amqp.connect('amqp://localhost:5672')

//     const channel =  await connection.createChannel();

    
//     const queue = 'hello';
//     const msg = 'Hello World';

  

//     if(!data) return

//       await channel.assertQueue(queue, {
//         durable: true,
//         arguments:{
//             'x-queue-type': 'quorum'
//         }
//     });

//     channel.sendToQueue(queue, Buffer.from(data));

//     console.log("msg sent", data);
        


//     }

   

  

//     // setTimeout(async()=>{
//     //  await connection.close();
//     //  await channel.close();
        

//     // }, 500)

// }

// // mqStarter()

// module.exports = mqStarter;

const mq = async(makeSure)=>{
    console.log("Makesure", makeSure)

    if(!makeSure) return

    console.log("Connection builder running")

     connection = await amqp.connect('amqp://localhost:5672');
     channel = await connection.createChannel();

      queue = 'checking';
       await channel.assertQueue(queue,{
            durable: true,
            arguments:{
            'x-queue-type': 'quorum'
        }
        

        })


}

    const gen =(data)=>{

        if(!data)return

        

       

        channel.sendToQueue(queue, Buffer.from(data));

        console.log("msg sent", data);

    }

    mq()
    



module.exports = {mq,gen}