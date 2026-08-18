const Album = require('../models/Album');

const dbAlbumBgUploader=(albumBgUrl, userId, albumId)=>{

    console.log("See user data", userId +" "+ albumId);

    Album.findOne({createdBy: userId, _id: albumId})
    .then((found)=>{
        console.log("See album found", found);
    }).catch((error)=>{
        console.log("Error while searching for album", error);
    })

Album.updateOne({createdBy: userId, _id: albumId}, {$set:{albumBgCover: albumBgUrl}})

.then((result)=>{
    console.log("Album bg cover successfully uploaded to database");
    console.log("seeeee",result)
}).catch((error)=>{
    console.log("Error while uploading albumbgCover to database", error);
})
    
}

module.exports = dbAlbumBgUploader;