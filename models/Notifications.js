const { type } = require('firebase/firestore/pipelines');
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({


    notifiedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
      notificationType: String,
      notificationTitle: String,
      notificationBody: String,
      toNavigate: String,
      isSeen: {

        type: Boolean,
        require: true,
        default: false

      },
      
    
},
 {timestamps: true}
)

const UserNotification = mongoose.model("UserNotification", NotificationSchema);
module.exports = UserNotification