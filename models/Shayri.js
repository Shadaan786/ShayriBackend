const mongoose = require("mongoose");

const ShayriSchema = new mongoose.Schema({
         id: Number,
  name: String,
  text: String,
});


module.exports = mongoose.model("Shayri", ShayriSchema);