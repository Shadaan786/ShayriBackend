const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({


    name:{
        type: String,
        required: true
    },

    kalamCollection:[
        {
            kalam:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Kalam'
                 
            },

          _id: false

            
        },
       
    ],

    albumCover:{
        type: String
    },

    isLive:{
        type: Number,
        default: 0
    },

    createdBy:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',

    },
    category:{
        type: String,
        require: true
    }


})


const Album = mongoose.model('Album', AlbumSchema)

module.exports = Album;