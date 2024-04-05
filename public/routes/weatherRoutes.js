// weatherRoutes.js

const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');



/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get weather data by city name
 *     description: Retrieve weather data (temperature, humidity, air pressure) for a specific city.
 *     parameters:
 *       - in: query
 *         name: city ID
 *         schema:
 *           type: string
 *         required: true
 *         description: cities
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temperature:
 *                   type: number
 *                   description: Current temperature in Celsius
 *                 humidity:
 *                   type: number
 *                   description: Current humidity percentage
 *                 air_pressure:
 *                   type: number
 *                   description: Current air pressure in hPa
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

   

router.get('/', weatherController.getWeatherData);

module.exports = router;






