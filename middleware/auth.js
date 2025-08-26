const { getUser } = require('../service/auth');

async function stayLoggedIn(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.json({
            success: true,
            redirectUrl: "/Signup/Login"
        });
    }

    const user = await getUser(userUid); // await if async

    if (!user) {
        return res.json({
            redirectUrl: "/login"
        });
    }

    req.user = user; // attach user to req
    next();
}

module.exports = { stayLoggedIn };
