const express = require('express');

const { handleKalam } = require('../controller/kalamController');

const router = express.Router();

router.post('/', handleKalam);

// router.get('/UrKalam', resizeBy.json(kalam));

module.exports = router;