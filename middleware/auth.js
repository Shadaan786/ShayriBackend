const { getUser } = require('../service/auth');

async function stayLoggedIn(req, res, next) {
    const token = req.cookies?.uid;

    if (!token) {
        return res.json({
            success: true,
            redirectUrl: "/Signup/Login"
        });
    }

    const user = await getUser(token); // await if async

    if (!user) {
        return res.json({
            redirectUrl: "/login"
        });
    }

    req.user = user; // attach user to req
    next();
}

module.exports = { stayLoggedIn };
