const { response } = require("express")
const Album = require("../models/Album");
const { error } = require("winston");
const { default: mongoose } = require("mongoose");

const albumCreator=(userId, albumCoverUrl, albumData)=>{

    //parsing
    const albumData2 = JSON.parse(albumData)
    const kalams = albumData2.kalams.map((item)=>{
        return {
            'kalam': new mongoose.Types.ObjectId(item)
        }
    })
    Album.create({
        createdBy:userId,
        kalamCollection:kalams,
        category:albumData2.category,
        name: albumData2.name,
        albumCover: albumCoverUrl,
        isLive: Boolean(albumData2.isLive)
    })
    .then((response)=>{
        console.log("Album created with album cver successfully");
        return
    })
    .catch((error)=>{
        console.log("Error while creating album with album coner", error);
        return
    })
}

module.exports = {albumCreator};