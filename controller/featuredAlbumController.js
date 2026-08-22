const FeaturedAlbum = require('../models/FeaturedAlbum');

const featuredAlbum = (req, res)=>{

    FeaturedAlbum.findOne().populate('featuredAlbum')
    .then((featuredAlbumFound)=>{
        console.log("See collection name", FeaturedAlbum.collection.name)
        console.log("Featured album found successfully",featuredAlbumFound);

        return res.status(200).json({
            success: true,
            message: featuredAlbumFound
        })
    }).catch((error)=>{
        console.log("Error while querying featured album", error);
        return res.status(501).json({
            success: false,
            message: error
        })
    })

}


module.exports = featuredAlbum;
