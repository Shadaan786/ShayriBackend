const Album = require('../models/Album');


const dbAlbumCoverUploader=(albumCoverUrl, userId, albumId)=>{
    console.log("albumCover and userId", albumCoverUrl + " "+userId)

    Album.updateOne({_id:albumId, createdBy:userId},{$set:{albumCover:albumCoverUrl}})
    .then((url)=>{
        console.log("Album cover url uploaded to database successfully");
    }).catch((error)=>{
        console.log("Error while uploading album cover url",error);
    })
    
}

module.exports = dbAlbumCoverUploader;