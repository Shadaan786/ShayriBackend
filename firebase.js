// // Import the functions you need from the SDKs you need
// const { initializeApp } =  require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   
//   authDomain: "shayriclub-notify.firebaseapp.com",
//   projectId: "shayriclub-notify",
//   storageBucket: "shayriclub-notify.firebasestorage.app",
//   messagingSenderId: "473546921229",
//   appId: "1:473546921229:web:a7868360ee2ad984228c44",
//   measurementId: "G-FT8QJ53F8Z"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

require("dotenv").config();
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const{ getMessaging } = require('firebase-admin/messaging');


const app =
initializeApp({
  // The credential is configured to be the sender project's service
  // account key via the environment variable GOOGLE_APPLICATION_CREDENTIALS
  credential: applicationDefault(),
  projectId: 'shayriclub-notify',
});
const messenger = getMessaging(app);

// This registration token comes from the client FCM SDKs.
const registrationToken = process.env.REGISTRATION_TOKEN

const message = {

  notification: {
          "title": "hello",
          "body": "checking yay"
        },
  data: {
    score: '850',
    time: '2:45'
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
// messenger.send(message)
//   .then((response) => {
//     // Response is a message ID string.
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.log('Error sending message:', error);
//   });


module.exports  = {messenger, message}