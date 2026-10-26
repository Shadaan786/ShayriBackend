const {getUser} = require('../service/auth');
const NotInterestedKalam = require('../models/NotInterestedKalams');

const notInterestedKalam=(req, res)=>{
    
    const{kalamId} = req.body;
    const token = req.cookies.uid;

    req.user = getUser(token);

    NotInterestedKalam.create({
        kalams: kalamId,
        user: req.user._id
    })
    .then((response)=>{
        return res.status(201).json({
            success: true,
            data: "kalam removed successfully"
        })
    })
    .catch((error)=>{
        console.log("Error while updating not interested kalam fields to mongodb", error);
        return res.status(501).json({
            success: false,
            error: error
        })
    })


}

module.exports = {notInterestedKalam};