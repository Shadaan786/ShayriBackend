const {getUser} = require('../service/auth');
const ReportedKalam = require('../models/ReportedKalam');

const reportKalam=(req, res)=>{
    
    const{details, reason, kalamId} = req.body;
    const token = req.cookies.uid;

    req.user = getUser(token);

    ReportedKalam.create({
        kalams: kalamId,
        user: req.user._id,
        detail: details,
        reason: reason
    })
    .then((response)=>{
        return res.status(201).json({
            success: true,
            data: "reported successfully"
        })
    })
    .catch((error)=>{
        console.log("Error while updating reported fields to mongodb", error);
        return res.status(501).json({
            success: false,
            error: error
        })
    })


}

module.exports = {reportKalam}