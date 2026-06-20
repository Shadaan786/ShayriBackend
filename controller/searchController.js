const User = require('../models/User');
const Kalam = require('../models/Kalam');
const url = require('url')
const {devLogger} = require('../loggers/devLogger');
const { level } = require('winston');
const { message } = require('../firebase');
const Album = require('../models/Album');
const { response } = require('express');



async function handleSearch (req, res){

    // req.body = req;
   
    // console.log(req.body)

    
    // req = req.name;

    // console.log(req)

   const nam =  req.body.name

 const userRes =  await User.find({name: nam}, {name: 1, _id: 0})

 return res.json(userRes)

}

const handleKalamSearch=(req, res)=>{

  devLogger().log({
    level: "info",
    message: req.url
    
  })
  // const {searchQuery} =  req.body;
  const {limit, page, searchQuery} = url.parse(req.url, true).query

  if(!searchQuery)return
  Kalam.find({$text:{$search: searchQuery}}).skip(page*limit - limit).limit(limit)
  .then((searchKalamsFound)=>{

    return res.status(200).json({
      kalamsSearched: searchKalamsFound
    })

  }).catch((error)=>{
    devLogger().log({
      level: "error",
      message: error,
    })
  })
}

const handleAlbumSearch=(req, res)=>{

  const{searchQuery, page, limit} = url.parse(req.url, true).query;
  Album.find({$text:{$search: searchQuery}}).skip(page*limit-limit).limit(limit)

  .then((searchedAlbums)=>{
    return res.status(200).json({
      albumsResult: searchedAlbums
    })
  }).catch((error)=>{
    devLogger().log({
      level: "error",
      message: error
    })
  })

}


module.exports = { handleSearch,handleKalamSearch, handleAlbumSearch }