const express = require("express");
const { handleUserSignup } = require("../controller/userController");
// const { handleUserLogin} = require("../controller/userController")


console.log("✅ Signup route file loaded");
console.log("📦 handleUserSignup function:", typeof handleUserSignup); // Add this line
// console.log("📦 handleUserLogin function:", typeof handleUserLogin);
    
const router = express.Router();

router.post("/", handleUserSignup);
console.log("✅ POST / route defined");


// router.post("/", handleUserLogin);

module.exports = router;