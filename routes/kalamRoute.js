const express = require('express');

const { handleKalam } = require('../controller/kalamController');

const router = express.Router();

router.post('/', handleKalam);

module.exports = router;