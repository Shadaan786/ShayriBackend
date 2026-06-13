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
    
    
 if(media_data.fileType === "image&audio"){
        console.log("Image and audio consumer ran");
        
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


    }else if(media_data.fileType === 'image'){
        console.log("only image consumer ran")
        const check3 = (async()=>{
            const imageUrl = await cloudfareUploader(media_data.payload.kalamBgPath);
            await dbImageUploader(media_data.payload.fileData, media_data.payload.userId, imageUrl)

        })
        check3();
    }else if(media_data.fileType === 'audio'){
        const check4 = (async()=>{

            console.log("see input in consumer", media_data.payload.kalamAudioPath);
            
              const clearedVoice = await clearVoice(media_data.payload.kalamAudioPath, media_data.payload.kalamAudioFileName);
            console.log("voice cleared successfully done!!");
            const audioWaveGenerated  = await audioWave(clearedVoice, media_data.payload.kalamAudioFileName);
           console.log("audiowave generated successfully done!!")
            const videoUrl = await cloudinaryAudio(audioWaveGenerated);
            console.log("Video url generated successfully done!!")
            const kalamBgUpdate =  await dbImageUploader(media_data.payload.fileData, media_data.payload.userId, null, videoUrl);
            console.log("Kalam stored in database successfully done!!");
            console.log("seeeee", kalamBgUpdate);
            
        })
        check4()
    }

},{
    noAck: false
})
 

}
module.exports = {mediaQueueConsumer};
