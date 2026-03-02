const {spawn} = require('child_process');
const { log } = require('console');
const { sign } = require('crypto');


 const audioWave=(req, res, next)=>{

    new Promise(function(resolve, reject){

    

   req.finalWaveForm = `./uploads/kalamAudio/AW${req.uniqueSuffix}.mp4`


const child = spawn("ffmpeg", ["-i", req.heck, "-filter_complex", "[0:a]aformat=channel_layouts=mono,showwaves=s=640x360:mode=line:colors=white,format=yuv420p[v]", "-map", "[v]", "-map", "0:a", "-c:v", "libx264", "-c:a", "aac", "-shortest", req.finalWaveForm])

child.stdout.on("data", (data)=>{
    console.log("data:", data.toString());
})

child.stderr.on("data", (data)=>{
    console.log("errdata", data.toString())
})

child.on("error", (error)=>{

    console.log("errpr", error.toString())
})

child.on("exit", (code, signal)=>{
    if(code)console.log("exit with code:", code)
        if(signal)console.log("terminated with:", signal)

            console.log("All Done");
            resolve();
})

})

.then(()=>{

    console.log("MiddleWare AudioWave executed successfully")

    next();
})





}


module.exports = {audioWave}

// ffmpeg -i "VID-20250509-WA0004.mp4" -filter_complex "[0:a]aformat=channel_layouts=mono,showwaves=s=1920x1080:mode=line:colors=white,format=yuv420p[v]" -map "[v]" -map 0:a -c:v libx264 -c:a aac -shortest "single_line_waveform2.mp4"