const express = require("express");
const { handleUserLogin} = require("../controller/userController")


console.log(typeof handleUserLogin)
const router = express.Router();

router.post("/", handleUserLogin);


module.exports = router;