const Album = require('../models/Album');

const AllTimeFavourite=(req, res)=>{
    Album.find({}).sort({totalLikes: -1}).limit(3).populate("createdBy")

    .then((result)=>{
        console.log("All time favourite albums found");
        return res.status(201).json({
            success: true,
            message: result
        })
    }).catch((error)=>{
        console.log("Error while searching for all time favourite albums", error);
        return res.status(501).json({
            success: false,
            message: error
        })
    })
}

module.exports = AllTimeFavourite;