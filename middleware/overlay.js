const {spawn} = require('child_process');
const Album = require('../models/Album')
const fs = require('fs');
const { response } = require('express');
let outputVideoPath;


const overlay=async(inputVideoPath, imagePath, videoFileName)=>{

    return new Promise(function (resolve, reject){

        

    
        // //creating writeable stream
        //     const writeAble = new WritableStream({
        //     write(chunk){
        //         fs.appendFileSync(`./temp/Img/IMG${imageFileName}.jpg`, chunk)
        //     }
        // })
        // const writeAble2 = new WritableStream({
        //     write(chunk){
        //         fs.appendFileSync(`./temp/videos/${videoFileName}.mp4`, chunk)
        //     }
        // })
        
    
        // fetch(albumCoverUrl)
        // .then((response)=>{

        //     response.body.pipeTo(writeAble)
    
        // fetch(audioGraphUrl)
        
        // .then((response2)=>{

        //             response2.body.pipeTo(writeAble2)



        // })



        // })
    
        





         outputVideoPath = `./temp/videos/${videoFileName}.mp4`
         console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",outputVideoPath)
        // const imagePath = `./temp/Img/Img${imageFileName}.jpg`
        // const inputVideoPath = `./temp/videos/${videoFileName}.mp4`

        setTimeout(()=>{

             const child = spawn("ffmpeg", [ "-i", inputVideoPath, "-i", imagePath, "-filter_complex", "[1:v]format=rgba,colorchannelmixer=aa=0.5[logo];[0:v][logo]overlay=(W-w)/2:(H-h)/2", "-codec:a", "copy", outputVideoPath])

        // ffmpeg -i input.mp4 -i albumOverlay.png -filter_complex "overlay=0:0" -codec:a copy output.mp4
        child.stdout.on("data", (data)=>{
            console.log("data", data.toString())
        })
        
        child.stderr.on("data", (data)=>{
            console.log("errdata", data.toString())
        })
        child.on("error", error=>{
            console.log("error ", error)
        })

        
child.on("exit", (code, signal)=>{
    if(code)console.log("exit with code:", code)
        if(signal)console.log("terminated with:", signal)

            console.log("All Done");
            resolve();
})



        

    })

  
    
    
    

        }, 6000)

          
    .then(()=>{
    
        console.log("MiddleWare AudioWave executed successfully")
    
        return outputVideoPath
    })
    
       
    

    

}

module.exports = overlay;