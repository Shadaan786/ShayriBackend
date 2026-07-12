const { urlencoded } = require("express");
const SavedKalams =  require("../models/SavedKalams");
const url = require('url')
const {getUser} = require('../service/auth.js')

const savingKalam=async(req, res)=>{

    const token = req.cookies.uid;
  req.user = getUser(token);

    const kalamId = req.body.kalamId;

  const savedKalam = await SavedKalams.findOne({savedBy: req.user._id, savedKalam: kalamId})

  if(!savedKalam){

    console.log("Saving kalam");
   SavedKalams.create({savedBy: req.user._id, savedKalam: kalamId})
    .then((kalamSaved)=>{
        console.log("Kalam saved successfullly")

        return res.status(201).json({
            message: "Kalam saved successfully"
        })
    }).catch((error)=>{
        console.log("Error saving a kalam", error);

        return res.status(500).json(error)
    })


   }else{
     SavedKalams.deleteOne({savedBy: req.user._id, savedKalam: kalamId})

    .then((response)=>{
    console.log("kalam unsaved successfully")
      return res.status(201).json({
        success: true,
        message: "Saved kalam removed successfully"
      })
    }).catch((error)=>{
    console.log("Error while removing saved kalam", error)
      return res.status(500).json(error)
    })
  }


    
}

const savedKalams = (req, res)=>{
   // const userId = url.parse(req.url, true).query.userId;

  const token = req.cookies.uid;
  req.user = getUser(token);

    SavedKalams.find({savedBy: req.user._id}).populate('savedKalam')
    .then((savedKalams_found)=>{
      console.log("savedKalams", savedKalams_found)
        return res.status(200).json(savedKalams_found)
    }).catch((error)=>{
        console.log("Error while getting saved kalams", error)
        return res.status(500).json(error);
    })

}
module.exports = {savingKalam, savedKalams};
