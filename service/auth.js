const jwt = require("jsonwebtoken");

const secret = "lappu@123"
// const sessionIdToUserMap = new Map()



function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}
// function setUser(id, user){
//     sessionIdToUserMap.set(id, user)
// } 

// function getUser(id){
//     return sessionIdToUserMap.get(id)
// }

function getUser(token){
      if(!token){
        return null
    }
    else{
    return jwt.verify(token, secret);
    }

  
}


module.exports = {
    setUser,
    getUser
}