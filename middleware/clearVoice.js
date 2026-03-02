const {spawn} = require('child_process');
const { resolveSoa } = require('dns');


 const clearVoice=(req, res, next)=>{


  new Promise(function(resolve, reject){

   req.clearVoicePath =   "CLV" + req.file.path;

   const outputPath = "CLV" + req.uniqueSuffix;

   req.heck = `./uploads/kalamAudio/CLV${req.uniqueSuffix}.wav`

    const child = spawn('ffmpeg', ['-i', req.file.path, "-filter:a", "arnndn=model=./voiceModel/bd.rnnn", "-codec:a", "pcm_s24le", req.heck])

child.stdout.on('data', (data)=>{

    console.log("data", data.toString());
})

child.stderr.on('data', (data)=>{

    console.log("stderr", data.toString());
})


child.on('error', (error)=>{

    console.log("There's an error pls look onto it", error.toString())

    reject();
})

child.on('exit', (code, signal)=>{
  if(code)console.log(`process exit with code: ${code}`)
    if(signal)console.log(`process killed with signal: ${signal}`)

      console.log("done");
      
})

child.on("close", (code)=>{
    if(code !== 0){
        console.log("error creating audiowave")
    }else if( code === 0){
        resolve();
    }
})

 })

 .then(()=>{
    console.log("New noise free voice has been created");
    next();
 })


}

module.exports = {clearVoice}


"ffmpeg -i audio_waveform.mkv -filter:a arnndn=model=bd.rnnn \ -codec:a pcm_s24le output.wav"