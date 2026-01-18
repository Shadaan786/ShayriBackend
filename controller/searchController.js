const User = require('../models/User');

async function handleSearch (req, res){

    // req.body = req;
   
    // console.log(req.body)

    
    // req = req.name;

    // console.log(req)

   const nam =  req.body.name

 const userRes =  await User.find({name: nam}, {name: 1, _id: 0})

 return res.json(userRes)

}


module.exports = { handleSearch }