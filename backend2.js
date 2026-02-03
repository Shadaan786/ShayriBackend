const express = require('express')
const webSocket = require('ws').WebSocketServer
const mongoose = require("mongoose");
const url = require('url')
const cors = require('cors');
const User = require("./models/User")
const { getUser } = require("./service/auth");
const Community = require('./models/Community');
const Kalam = require('./models/Kalam');
const cookieParser = require('cookie-parser')

const app = express();
const allClient = new Map();
const communities = new Map();
const communities2 = new Map();
// let commName;


app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "https://shayriclub.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"], // your frontend URL
    credentials: true,      // allow cookies to be sent
    allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect("mongodb+srv://CloudUser:Developer7310@cluster0.p095vnk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection error:", err));

const ws = new webSocket({
    port: 8080
});


ws.on('connection', (connection, request) => {

    const username = url.parse(request.url, true).query.username

    console.log(`${username} has connected`);

    allClient.set(username, connection)

    // console.log(allClient);

    console.log(`Total clients active: ${allClient.size}`)



    connection.on('message', async message => {
        const data = (message.toString());
        
        console.log(data)
        // console.log(data.payload.content)
        const real_data = JSON.parse(data)
        // console.log(real_data.payload.content)

        if (real_data.type === "global_chat") {

            for (const [key, value] of allClient) {
                const conn = allClient.get(`${key}`)
                conn.send(real_data.payload.content)
            }
        } else if (real_data.type === "joining_community") {

            const communityId = real_data.payload.communityId;
          let  commName = real_data.payload.communityName
            const memberId = real_data.payload.memberUuid
          

            // const community = commName.get(memberId);

            // if (!community) {
               
            //   commName   = new Map();
               
            //    commName.set(memberId, connection);
                 
            // }

            // for (const [key, value] of commName){
            //     const con = commName.get(`${key}`)
            //     con.send(`Welcome to community`)
            // }

            if(!communities.has(commName)){
                   communities.set(commName, new Map());

                
            }

            const community = communities.get(commName);

            community.set(memberId, connection)
            // console.log("Hello testing")
            // community.get(memberId)
            // console.log(community)

            for(const [key, value] of community){
                const con = community.get(`${key}`)
                con.send("Welcome to the community")
            }

            // const token = req.cookies.uid;
            // const user = getUser(token);
            // req.user = user;



            // community.set(req.user._id, connection);
            console.log("member Id", memberId)
            console.log("community id", communityId)

          await  Community.updateOne({ _id: "69637afa344efe2b2d081c16" },
                { $addToSet: {members:{"memberUuid": memberId}}})
                

                // console.log(Community.find({}))

                const klo = await Community.find({_id: "69596c9ef3f6c2957f1b4ec0"})

                console.log(klo)

        }else if(real_data.type === "community_chat"){

            const sandesh = real_data.payload.content;

             const commName2 = real_data.payload.communityName;
             const memberId = real_data.payload.memberUuid;
             const communityId = real_data.payload.communityId;
             

            //  console.log(commName2)
            if(!communities2.has(commName2)){
             communities2.set(commName2, new Map());
            //  console.log(communities2)

            }
             const community = communities2.get(commName2);

             community.set(memberId, connection);
            //  console.log(community)

            console.log("Hello Checking")
        //    console.log(community.get(memberId));

            // console.log("MemeberId", memberId)
            // console.log("Map keys:", [...community.keys()]);
            // console.log(typeof(memberId))

               for(const [key, value] of community){
                const con = community.get(`${key}`)
                con.send(real_data.payload.content);
            }


            console.log("commubityId", communityId)
            console.log("memberId", memberId)
           const updated =   await  Community.updateOne({ _id: communityId },
                { $push: {messages:{sendFrom: memberId, message: sandesh}}})

                console.log(updated)



            
        }else if(real_data.type === "kalam_like"){

            const memberId = real_data.payload.uid ; 
            const kalamId = real_data.payload.kalamUid
            const likes = await Kalam.find({_id: kalamId, likedBy: memberId});

            console.log(likes.length)

            if(likes.length === 0){

              const check =  await Kalam.updateOne({_id: kalamId},{$addToSet:{likedBy: memberId}})

              const check2 =  await Kalam.updateOne({_id: kalamId}, {$inc:{totalLikes: 1}})
              console.log("check", check)
              console.log("check2", check2)
            }else{


           
             
          const check3 =  await Kalam.updateOne({_id: kalamId},{$pull:{likedBy: memberId}})

          const check4 =  await Kalam.updateOne({_id: kalamId}, {$inc:{totalLikes: -1}})

           console.log("check3", check3)
          console.log("check4", check4)

           }
          
         




            
        }else if(real_data.type === "kalam_comment"){

            const memberUuid = real_data.payload.mUid;
            const comment = real_data.payload.content;
            const kalamId = real_data.payload.kalId;
        }
    })


    connection.on('close', () => {
        console.log(`${username} has disconnected`)
        allClient.delete(username)
        console.log(`Total clients active: ${allClient.size}`)
    })


})