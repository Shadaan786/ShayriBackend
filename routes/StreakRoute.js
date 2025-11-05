const express = require('express');
const { handleStreak } = require("../controller/streakController");

const router = express.Router();

router.put("/", handleStreak);

console.log("streakROute hit")

module.exports = router;