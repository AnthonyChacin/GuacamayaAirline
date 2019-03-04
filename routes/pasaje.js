const express = require('express');
const router = express.Router();
const pasajeController = require('../controllers/pasajeController');

router.get('/pasaje/:id');

module.exports = router;