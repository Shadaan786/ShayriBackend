const amqp = require('amqp-connection-manager');
const { Channel } = require('firebase-admin/eventarc');
let connection;
let channelWrapper;
let queue;

//Queue setup part 
const mediaQueue = async(makeSure2)=>{
    console.log("makeSure2", makeSure2)

    if(!makeSure2)return

    connection = amqp.connect(['amqps://ekvncpnr:MfgNIppn7NWI-01W5Il20tMEUU7O-WKz@fuji.lmq.cloudamqp.com/ekvncpnr'])
    connection.on('connect', (connected)=>{
        console.log("Connected successfully");
    })
    connection.on('error', error=>{
        console.log("Error while connecting to amqps server");

    })

    queue = 'mediaPipeline';
    channelWrapper = connection.createChannel({
        json: true,
        setup: async(channel)=>{
            await channel.assertQueue(queue,{
                durable: true,
                arguments:{
                    "x-queue-type": "quorum",
                }
            })
        }
    })

    channelWrapper.on("error", error=>{
        console.log("Error while creating channel", error);
    })

    await channelWrapper.waitForConnect();
    return;
}

// Data pushing to queue part

const mediaData=(data)=>{

    channelWrapper.sendToQueue(queue, data)

}

module.exports = {mediaQueue, mediaData}