const Tutorial = require('../models/tutorial');
const {getUser} = require('../service/auth');
const url = require("url");

const getTutorialInfo = (req, res)=>{
 
    const token = req.cookies.uid;
    req.user = getUser(token);

    const {type} = url.parse(req.url, true).query;

    console.log("type", type);
    console.log("req.body", req.user._id);
    Tutorial.findOne({user: req.user._id, type: type})
    .then((response)=>{
        console.log("see res-------------------------------------------------------------------------------->", response)
        return res.status(200).json({
            success: true,
            data: response?true:false
        })
    }).catch((error)=>{
        console.log("error while getting tutorials info", error);
        return res.status(501).json({
            success: false,
            data: error
        })
    })
}

const updateTutorial = (req, res)=>{

    const token = req.cookies.uid;
    req.user = getUser(token);
    console.log("see req.body", req.body)

    Tutorial.create({user: req.user._id, type: req.body.type, isShown: true})

    .then((response)=>{
        console.log("done", response);
        return res.status(201).json({
            success: true,

        })
    }).catch((error)=>{
        console.log("Error", error)
        return res.status(501).json({
            success: false,
            data: error
        })
    })
}

module.exports = {getTutorialInfo, updateTutorial};