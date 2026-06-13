// const {spawn} = require('child_process');
// const { resolveSoa } = require('dns');


//  const clearVoice=(req, res, next)=>{

//     console.log("req.body cv", req.body)

//     console.log("req.file cv", req.files)


//   new Promise(function(resolve, reject){

//    req.clearVoicePath =   "CLV" + req.files.path;

//    const outputPath = "CLV" + req.uniqueSuffix;

//    req.heck = `./uploads/kalamAudio/CLV${req.uniqueSuffix}.wav`

//     const child = spawn('ffmpeg', ['-i', req.files.kalamAudio[0].path, "-filter:a", "arnndn=model=./voiceModel/bd.rnnn", "-codec:a", "pcm_s24le", req.heck])

// child.stdout.on('data', (data)=>{

//     console.log("data", data.toString());
// })

// child.stderr.on('data', (data)=>{

//     console.log("stderr", data.toString());
// })


// child.on('error', (error)=>{

//     console.log("There's an error pls look onto it", error.toString())

//     reject();
// })

// child.on('exit', (code, signal)=>{
//   if(code)console.log(`process exit with code: ${code}`)
//     if(signal)console.log(`process killed with signal: ${signal}`)

//       console.log("done");
      
// })

// child.on("close", (code)=>{
//     if(code !== 0){
//         console.log("error creating audiowave")
//     }else if( code === 0){
//         resolve();
//     }
// })

//  })

//  .then(()=>{
//     console.log("New noise free voice has been created");
//     next();
//  })


// }

// module.exports = {clearVoice}


// "ffmpeg -i audio_waveform.mkv -filter:a arnndn=model=bd.rnnn \ -codec:a pcm_s24le output.wav"






const {spawn} = require('child_process');
const { resolveSoa } = require('dns');


 const clearVoice=async(inputPath, fileName)=>{

//     console.log("req.body cv", req.body)

//     console.log("req.file cv", req.files)
    let outputPath;
    console.log("See input path", inputPath)


return  new Promise(function(resolve, reject){


const nameUnique = Date.now() + '_' + Math.round(Math.random()* 1E9)
 outputPath = `./uploads/clearedVoice/${fileName}.wav`

    const child = spawn('ffmpeg', ['-i',inputPath , "-filter:a", "arnndn=model=./voiceModel/bd.rnnn", "-codec:a", "pcm_s24le", outputPath])

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
        console.log("error clearing background noise")
    }else if( code === 0){
        resolve();
    }
})

 })

 .then(()=>{
    console.log("New noise free voice has been created");
    return outputPath;
 })

 return

}

module.exports = {clearVoice}


"ffmpeg -i audio_waveform.mkv -filter:a arnndn=model=bd.rnnn \ -codec:a pcm_s24le output.wav"