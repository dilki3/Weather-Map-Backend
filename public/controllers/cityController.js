// cityController.js
const pool = require('../db');

const getCityCoordinates = async (req, res) => {
  try {
    const cityName = req.query.city;
    const result = await pool.query('SELECT * FROM cities WHERE name = $1', [cityName]);
    if (result.rows.length > 0) {
      const city = result.rows[0];
      res.json({ latitude: city.latitude, longitude: city.longitude });
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    res.status(500).json({ error: 'Error fetching city coordinates' });
  }
};

module.exports = { getCityCoordinates };

