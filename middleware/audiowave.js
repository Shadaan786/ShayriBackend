const {spawn} = require('child_process');
const { log } = require('console');
const { sign } = require('crypto');
let finalWaveForm;


 const audioWave = async(inputPath, fileName)=>{

  return  new Promise(function(resolve, reject){

    

   finalWaveForm = `./uploads/kalamAudio/AW${fileName}.mp4`


const child = spawn("ffmpeg", ["-i", inputPath, "-filter_complex", "[0:a]aformat=channel_layouts=mono,showwaves=s=640x360:mode=line:colors=white,format=yuv420p[v]", "-map", "[v]", "-map", "0:a", "-c:v", "libx264", "-c:a", "aac", "-shortest", finalWaveForm])

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

    return finalWaveForm
})





}


module.exports = {audioWave}

// ffmpeg -i "VID-20250509-WA0004.mp4" -filter_complex "[0:a]aformat=channel_layouts=mono,showwaves=s=1920x1080:mode=line:colors=white,format=yuv420p[v]" -map "[v]" -map 0:a -c:v libx264 -c:a aac -shortest "single_line_waveform2.mp4"