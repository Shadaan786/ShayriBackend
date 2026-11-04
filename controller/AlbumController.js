const { Mongoose, default: mongoose } = require('mongoose');
const Album = require('../models/Album')
const { getUser } = require("../service/auth")


const albumController = (req, res) => {

    const { name, category, kalams, albumCover } = req.body.albumData;

    //Casting string to ObjectId

    const kalams2 = kalams.map((item) => {
        return {
            "kalam": new mongoose.Types.ObjectId(item)
        }
    })

    const token = req.cookies.uid;
    req.user = getUser(token);

    Album.create({
        name,
        category: category,
        kalamCollection: kalams2,
        createdBy: req.user._id,
        defaultAlbumCover: albumCover
    })
        .then((checking) => {
            console.log("checking_creation", checking)
            return res.status(201).json({
                success: true,
                data: "Album create successfully"
            })
        })

        .catch((error) => {
            console.error("Error updating the mongoDB field", error)
            return res.status(501).json({
                success: false,
                error: error
            })
        })
}

const albumCoverController = (req, res, next) => {

    const name = (req.body.name).toString()
    const albumCategory = (req.body.category).toString();

    console.log("checking req.body", req.body)




    const token = req.cookies.uid;

    req.user = getUser(token);

    console.log("checking undefined", req.user._id);

    //  const albumName = req.body.name; 
    //   console.log("albumName", albumName)

    //   const strAlbumName = albumName.toString()

    //   console.log("checking_req.body", strAlbumName);

    const category = req.fieldName;
    console.log("req.fieldName", category)


    Album.create({
        name: name,
        albumCover: req.imageLink,
        createdBy: req.user._id,
        category: albumCategory
    })

        .then((mongoDBResult) => {

            console.log("albumCover_URL", req.imageLink)
            console.log("mongoDBResult ln: 59", mongoDBResult)
            return res.json({ imageUrl: req.imageLink })
        })

        .catch((error) => {

            console.log("Error while uploading to MongoDB", error);

            return;
        })


}

const getFeaturedAlbum = () => {

    Album.find({}).sort()

}

const handleAlbumLike = (req, res) => {

    const { albumId } = req.body;
    const token = req.cookies.uid;
    req.user = getUser(token);


    Album.findOne({ _id: albumId, likesBy: req.user._id })
        .then((likedAlbum) => {
            if (!likedAlbum) {
                Album.updateOne({ _id: albumId }, { $addToSet: { likesBy: req.user._id } })
                    .then((likeUploaded) => {
                        console.log("Album like uploaded");
                        Album.updateOne({ _id: albumId }, { $inc: { totalLikes: 1 } })
                            .then((totalLikesIncremented) => {
                                console.log("Total likes successfully incremented");

                                return res.status(201).json({
                                    success: true,
                                    message: "Album liked successfully"
                                })
                            }).catch((error) => {
                                console.log("Error while incrementing total likes in album", error);
                                return res.status(501).json({
                                    success: false,
                                    message: error
                                })
                            })
                    }).catch((error) => {
                        console.log("Error while uploading album like to database", error);
                        return res.status(501).json({
                            success: false,
                            message: error
                        })
                    })
            } else {
                Album.updateOne({ _id: albumId }, { $pull: { likesBy: req.user._id } })
                    .then((disliked) => {
                        console.log("Album disliked successfully");

                        Album.updateOne({ _id: albumId }, { $inc: { totalLikes: -1 } })
                            .then((totalDecremented) => {

                                console.log("Total likes decremented successfully");

                                return res.status(201).json({
                                    success: true,
                                    message: "Album disliked successfully"
                                })

                            }).catch((error) => {
                                console.log("Error while decrementing total likes", error);
                                return res.status(501).json({
                                    success: false,
                                    message: error
                                })
                            })


                    }).catch((error) => {
                        console.log("Error while disliking the album", error);
                        return res.status(501).json({
                            success: false,
                            message: error
                        })
                    })
            }
        }).catch((error) => {
            console.log("Error while searching for the liked kalam", error);
            return res.status(501).json({
                success: false,
                message: error
            })
        })
}

const albumCoverDelete = (req, res) => {
    const token = req.cookies.uid;
    req.user = getUser(token);

    const { albumId, albumCoverLink } = req.body;

    Album.updateOne({ _id: albumId }, { $unset: { albumCover: albumCoverLink } })
        .then((response) => {
            console.log("re", response)
            return res.status(201).json({
                success: true,
                data: "Album cover deleted successfully"
            })
        }).catch((error) => {
            console.log("Error while removing album cover", error);
            return res.status(501).json({
                success: false,
                error: error
            })
        })

}

const albumBgCoverDelete = (req, res) => {
    const token = req.cookies.uid;
    req.user = getUser(token);

    const { albumId, albumBgCoverLink } = req.body;

    Album.updateOne({ _id: albumId }, { $unset: { albumBgCover: albumBgCoverLink } })
        .then((response) => {
            return res.status(201).json({
                success: true,
                data: "Album background cover deleted successfully"
            })
        }).catch((error) => {
            console.log("error while deleting album bg cover", error);
            return res.status(501).json({
                success: false,
                error: error
            })
        })
}

module.exports = { albumController, albumCoverController, handleAlbumLike, albumCoverDelete, albumBgCoverDelete };