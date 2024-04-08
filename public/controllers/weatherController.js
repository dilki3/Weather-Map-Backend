const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });  


  const insertOrUpdateWeatherData = async (cityId, weatherData) => {
    try {
      
      const checkQuery = 'SELECT * FROM weather_data WHERE city_id = $1';
      const { rows } = await pool.query(checkQuery, [cityId]);
    
      if (rows.length > 0) {
      
        const updateQuery = 'UPDATE weather_data SET temperature = $1, humidity = $2, air_pressure = $3 WHERE city_id = $4';
        const updateValues = [weatherData.temperature, weatherData.humidity, weatherData.airPressure, cityId];
        await pool.query(updateQuery, updateValues);
      } else {
        // If weather data doesn't exist, insert it\
        const insertQuery = 'INSERT INTO weather_data (city_id, temperature, humidity, air_pressure) VALUES ($1, $2, $3, $4)';
        const insertValues = [cityId, weatherData.temperature, weatherData.humidity, weatherData.airPressure];
        await pool.query(insertQuery, insertValues);
      }
    
      console.log(`Weather data updated/inserted for city ID ${cityId}`);
    } catch (error) {
      console.error('Error inserting/updating weather data:', error);
    }
    };
    
    const updateWeatherData = async () => {
    try {
      const client = await pool.connect();
      const query = 'SELECT * FROM cities';
      const { rows } = await pool.query(query);
    
      // Iterate over each city and fetch weather data
      for (const city of rows) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=02599dc04d81ee7325f67533d7ae2cb3&units=metric`);
        
        // Extract relevant weather data from the API response
        const weatherData = {
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          airPressure: response.data.main.pressure
        };
    
        await insertOrUpdateWeatherData(city.id, weatherData);
      }
    } catch (error) {
      console.error('Error updating weather data:', error);
    }
    };
    

    updateWeatherData();
    


const getWeatherData = async (req, res) => {
    try {
        const client = await pool.connect();
        const districtName = req.query.district;
    
        // Fetch weather data for the requested district from the weather_data table
        const query = `
          SELECT wd.temperature, wd.humidity, wd.air_pressure 
          FROM weather_data wd
          JOIN cities c ON wd.city_id = c.id
          WHERE c.name = $1
        `;
        const { rows } = await pool.query(query, [districtName]);
    
        if (rows.length > 0) {
          const weatherData = rows[0];
          console.log(`Weather data for ${districtName}:`, weatherData);
          res.json(weatherData);
        } else {
          res.status(404).json({ error: 'Weather data not found for the requested district' });
        }
        client.release();
      } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
      }
  };


module.exports = { getWeatherData , updateWeatherData};
