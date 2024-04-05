// cityRoutes.js
const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/', cityController.getCityCoordinates);

module.exports = router;
