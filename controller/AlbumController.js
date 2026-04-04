const Album = require('../models/Album')
const {getUser} = require("../service/auth")


const albumController=(req, res)=>{

const {name} = req.body;


const token = req.cookies.uid;
req.user = getUser(token);

 Album.create({
    name,
    createdBy: req.user._id
})
   .then((checking)=>{
                console.log("checking_creation", checking)
   })

   .catch((error)=>{
    console.error("Error updating the mongoDB field", error)

    res.json("Error updating mongoDB field", error)
   })
}

const albumCoverController=(req, res, next)=>{

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

            .then((mongoDBResult)=>{

                console.log("albumCover_URL", req.imageLink)
                console.log("mongoDBResult ln: 59", mongoDBResult)
               return res.json({imageUrl: req.imageLink})
            })

            .catch((error)=>{

                console.log("Error while uploading to MongoDB", error);

                return;
            })
        

}

module.exports = {albumController, albumCoverController};