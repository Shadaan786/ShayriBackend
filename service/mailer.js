require("dotenv").config()
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const { gmail } = require('googleapis/build/src/apis/gmail');

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

const redirectUrl = 'https://mail.google.com';
const refresh_token = process.env.REFRESH_TOKEN

const oAuthclient = new google.auth.OAuth2(client_id, client_secret, redirectUrl)

oAuthclient.setCredentials({refresh_token: refresh_token})

const sendMail=(reciever, text)=>{
    
    return   oAuthclient.getAccessToken()
        .then((accesstoken)=>{
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth:{
                type: 'OAUTH2',
                user: 'shadaan0019vstar@gmail.com',
                clientId: client_id,
                clientSecret: client_secret,
                refreshToken: refresh_token,
                accessToken: accesstoken
            }
        })

        const mailOptions = {

            from: 'shadaan <shadaan0019vstar@gmail.com>',
            to: reciever,
            subject: 'Hello testing nodemailer',
            text: text,
            
        }

    return   transport.sendMail(mailOptions)      // This gives a promise
       .then((mailResponse)=>{
        console.log("mail_send", mailResponse);
       }).catch((error)=>{
        console.log("error while sending mail", error)
       })
       
    }).catch((error2)=>{
        console.log("error while getting access token", error2);
    })
}

module.exports = sendMail