const Album = require('../models/Album');
const FeaturedAlbum = require('../models/FeaturedAlbum');

const featuredAlbumUploader=async()=>{

    //Fetching album to feature

    try{

    const featuredAlbum = await Album.findOne({}).sort({totalLikes: -1})
    
    //Uploading Featured Album

    FeaturedAlbum.create({
        featuredAlbum: featuredAlbum._id
    }).then((created)=>{
        console.log("Featured album created successfully")
    })
    }catch(error){
        console.log("Error while searching for featuredAlbum", error)
    }
    

    
}

module.exports = featuredAlbumUploader