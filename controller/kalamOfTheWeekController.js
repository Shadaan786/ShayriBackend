const Kotw = require('../models/KalamOfTheDay');

const kotwController = (req, res)=>{

  Kotw.find()
  .then((kotw_found)=>{

    res.status(201).json(kotw_found)
  }).catch((error)=>{
    console.log("Error while finding kotw", error)
    return res.status(501).json(error);
  })
}