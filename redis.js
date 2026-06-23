const Redis = require('ioredis') 

const redis = new Redis('redis://localhost:6379');

// app.get('/redis', async(req, res)=>{
//   const check = await redis.ping()

//   res.json({
//     "checking_redis": check
//   });
// })


module.exports = redis;