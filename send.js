const amqp = require('amqp-connection-manager')
let connection;
let channelWrapper;
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

    //  connection = await amqp.connect(['amqps://ekvncpnr:y0NMR6YFWcGntP2bvWTAKtfCnFkq4fhE@fuji.lmq.cloudamqp.com/ekvncpnr']);
     connection =  amqp.connect(['amqps://ekvncpnr:MfgNIppn7NWI-01W5Il20tMEUU7O-WKz@fuji.lmq.cloudamqp.com/ekvncpnr']);
     connection.on("connect", (connected)=>{
        console.log("connected successfully", connected)
     })
     connection.on("error", error=>{
        console.log("error while connecting to amqp send.js", error)
     })
    //  on(connection,()=>{
    //     console.log("connected successfully")
    //  })

     queue = 'checking';
     channelWrapper =  connection.createChannel({
        json: true,
        setup: async(channel)=>{
            await channel.assertQueue(queue, {
                durable: true,
                arguments:{
                    "x-queue-type": "quorum",
                } 
            })
        }
     });

     channelWrapper.on("error", error=>{
        console.log("error while creating channel", error);
     })

     
    //   console.log(queue)

      console.log("Hellooooooooooooo")
        // channel.assertQueue(queue,{
        //     durable: true,
        //     arguments:{
        //     'x-queue-type': 'quorum'
        // }
        

        // })
        // .then((success)=>{
        //     console.log("queue assereted successfully", success)
        // })
        // .catch((error)=>{
        //     console.log("Error whilr asserting queue", error)
        // })


        await channelWrapper.waitForConnect();

        return;

}

    const gen =(data)=>{

        


        console.log("gen_data", data)

        

       

        channelWrapper.sendToQueue(queue, data)

        console.log("msg sent", data);

    }


    



module.exports = {mq,gen}