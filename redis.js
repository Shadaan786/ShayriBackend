const Redis = require('ioredis') 

const redis = new Redis('redis://default:MmWX84jlnshmBobKxvo5eJy0Kr3Piy7G@xerophytic-hobbies-wash-74199.db.redis.io:19228');

redis.on("error", error=>{
    console.log("Error while connecting to redis", error)
})

// app.get('/redis', async(req, res)=>{
//   const check = await redis.ping()

//   res.json({
//     "checking_redis": check
//   });
// })


module.exports = redis;