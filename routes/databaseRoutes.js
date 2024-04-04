// databaseRoutes.js
const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController');

//router.get('/', databaseController.getAllData);
router.post('/insert', databaseController.insertData);

module.exports = router;
