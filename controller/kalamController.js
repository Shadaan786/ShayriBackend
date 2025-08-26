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
        content
    });

    console.log("Kalam created successfully");

    if(type === type && content === content){

    return res.status(201).json({
        msg: "kalam successfully created",
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