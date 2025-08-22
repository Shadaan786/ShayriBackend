const { getUser } = require('../service/auth')


async function stayLoggedIn(req, res, next){
    const userUid = req.cookie?.uid;

    if(!userUid) return res.json({
        redirectUrl: "/login"
    })

    const user = getUser(userUid);

    if(!user) return res.json({
        redirectUrl: "/login"
    })

    req.user =  user 
    next();
}

module.exports = {
    stayLoggedIn
}