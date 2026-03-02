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

    createdBy:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',

    }


})


const Album = mongoose.model('Album', AlbumSchema)

module.exports = Album;