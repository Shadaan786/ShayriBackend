const amqp = require('amqp-connection-manager');
const {clearVoice} = require('./middleware/clearVoice');
const {cloudfareUploader} = require('./utilities/cloudfareUploader');
const dbImageUploader = require('./utilities/dbImageUploader');
const {audioWave} = require('./middleware/audiowave');
const {cloudinaryAudio} = require('./utilities/cloudinaryAudio')
const mediaQueueConsumer = async(makeSure2)=>{

    //Queue consumer setup
 if(!makeSure2) return
 
 const connection = await amqp.connect(['amqps://ekvncpnr:MfgNIppn7NWI-01W5Il20tMEUU7O-WKz@fuji.lmq.cloudamqp.com/ekvncpnr']);
 connection.on('error', error=>{
    console.log("Error while cponnecting to the media queue");

    
 })

 const channel = await connection.createChannel();
 channel.on('error', error=>{
    console.log("Error while creating channel", error);
 })
 const queue = 'mediaPipeline';
 channelWrapper = await connection.createChannel({
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

 console.log("Media processing queue is up and running");

 // Queue consumption

channel.consume(queue, msg=>{
    const media_data = JSON.parse(msg.content.toString())
    console.log("media_data", media_data)


    channel.ack(msg)
    
    
    if(media_data.fileType === 'audio'){
const check = (async()=>{

            console.log("Media consumer running");
            

const check2 = await clearVoice(media_data.payload.filePath, media_data.payload.fileName)
            
            console.log(check2);
            
        })
        check();
        
        
    }else if(media_data.fileType === "image&audio"){
        const check2 = (async()=>{

            const imageUrl = await cloudfareUploader(media_data.payload.kalamBgPath);
            console.log("imageUrl generated successfully done!!");
            const clearedVoice = await clearVoice(media_data.payload.kalamAudioPath, media_data.payload.kalamAudioFileName);
            console.log("voice cleared successfully done!!");
            const audioWaveGenerated  = await audioWave(clearedVoice, media_data.payload.kalamAudioFileName);
           console.log("audiowave generated successfully done!!")
            const videoUrl = await cloudinaryAudio(audioWaveGenerated);
            console.log("Video url generated successfully done!!")
            console.log("see videoUrl", videoUrl)
            console.log("see imageUrl", imageUrl)
            await dbImageUploader(media_data.payload.fileData, media_data.payload.userId, imageUrl, videoUrl);
            console.log("Kalam stored in database successfully done!!");




        })
        check2()


    }

},{
    noAck: false
})
 

}
module.exports = {mediaQueueConsumer};
