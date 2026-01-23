const {getUser} = require('../service/auth')


const Kalam = require("../models/Kalam");

async function handleKalam(req, res) {


    const {type, content} = req.body;
    if(!type || !content){
        return res.status(400).json({
            msg: "all fields are required"
        });
    }

    const kalam = await Kalam.create({
        type,
        content,
        createdBy: req.user._id,
        name: req.user.name
    });

    console.log("Kalam created successfully");

    if(type === type && content === content){

        const token = req.cookies.uid;
        getUser(token);


        let streak = await Kalam.find({createdBy: req.user._id}, {createdAt: 1, _id: 0}).sort({createdAt: -1}).limit(2);

    return res.status(201).json({
        streak,
        msg: "kalam uploaded succesfully",
        success: true,
        kalam: kalam.content

    })
}else{
    return res.status(404).json({
        msg: "error while uploading"
    })
}
    
}

module.exports = { handleKalam };   