const axios = require('axios');
//const { Pool } = require('pg');
const getWeatherData = async (req, res) => {
    try {
      const cityName = req.query.city;
      const latitude = req.query.lat;
      const longitude = req.query.lon;
      const city_id = req.query.id;
  
      // Make a request to an external weather API (e.g., OpenWeatherMap) using latitude and longitude
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=02599dc04d81ee7325f67533d7ae2cb3&units=metric`);
      
      // Extract relevant weather data from the API response
      const weatherData = {
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        airPressure: response.data.main.pressure
      };
  
      console.log(`Weather data ${cityName}:`, weatherData); // Log weather data to console
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  };
  

module.exports = { getWeatherData };
