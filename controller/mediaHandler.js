// const {mediaQueue} = require('../mediaQueue');
const {mediaData} = require('../mediaQueue');
const {getUser} = require('../service/auth');

const mediaHandler=(req, res)=>{
    
    const files = req.files;
    const mediaType = req.files
    const audioFileName = req.files?.kalamAudio?.[0].filename;
    const imageFileName = req.files?.kalamBg?.[0].filename;
    const audioPath = req.files?.kalamAudio?.[0].path;
    const imagePath = req.files?.kalamBg?.[0].path;
    const kalamId = req.body
    console.log("see files", req.files);
    console.log("See req.body", req.body)
    
    console.log("see files /:mediaHandler.js 7:59", req.files?.kalamAudio?.[0].mimetype);

    const token = req.cookies.uid;
    req.user = getUser(token);

    //---------------------------------------------------------------------->
    // if(req.files.kalamAudio?.[0].mimetype === "audio/wav"){
    //     console.log("lmao")
    //     mediaData({
    //         fileType: "audio",
    //         payload:{
    //             fileName: audioFileName,
    //             filePath: audioPath
    //         },
    //     })
        
    // }else if(req.files.kalamBg?.[0].mimetype === "image/jpeg"){
    //     console.log("lmao2");
    //     mediaData({
    //         fileType: "image",
    //         payload:{
    //             fileName: imageFileName,
    //             filePath: imagePath
    //         },
    //     })
        
    // }

    // return res.json("hello done")


    // files.forEach(element => {
            
    //     if(element.mimetype===''){

    //     }
    // });

    //--------------------------------------------------------------->

    if (req.body.fileType === 'image&audio'){
        mediaData({
            fileType: "image&audio",
            payload:{
                kalamBgPath: imagePath,
                kalamAudioPath: audioPath,
                fileData: req.body,
                kalamAudioFileName: audioFileName,
                userId: req.user._id
            }
        })
    }

    return res.json("done")
}

module.exports = mediaHandler