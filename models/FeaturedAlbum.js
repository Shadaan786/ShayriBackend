const mongoose = require('mongoose');


const FeaturedAlbumSchema = new mongoose.Schema({

    featuredAlbum:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
},
{
    timestamps: true
}
)

const FeaturedAlbum = mongoose.model("FeaturedAlbum", FeaturedAlbumSchema);
module.exports = FeaturedAlbum;