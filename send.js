const amqp = require('amqplib')

const mqStarter = async(data)=>{

    const connection = await amqp.connect('amqp://localhost:5672')

    const channel =  await connection.createChannel();

    console.log(data)


    const queue = 'hello';
    const msg = 'Hello World';

    await channel.assertQueue(queue, {
        durable: true,
        arguments:{
            'x-queue-type': 'quorum'
        }
    });

    if(!data) return

    channel.sendToQueue(queue, Buffer.from(data));

    console.log("msg sent", data);

    setTimeout(()=>{
        connection.close();
        

    }, 500)

}

mqStarter()

module.exports = mqStarter;