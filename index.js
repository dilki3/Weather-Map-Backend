
// index.js
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');
const { Pool } = require('pg'); // Import Pool from pg for PostgreSQL connection
const { getWeatherData } = require('./controllers/weatherController'); 
require('dotenv').config();// Import your weather controller

const app = express();
const PORT = process.env.PORT || 3001;

// PostgreSQL database configuration

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Function to insert weather data into the PostgreSQL database
const insertWeatherData = async () => {
  try {
    const response = await getWeatherData(); // Fetch weather data
    console.log('Weather data:', response); // Log weather data

    const { temperature, humidity, airPressure } = response; // Destructure weather data

    // Insert weather data into the database
    const query = `
      INSERT INTO weather_data (temperature, humidity, air_pressure, timestamp)
      VALUES ($1, $2, $3, NOW())
    `;
    await pool.query(query, [temperature, humidity, airPressure]);
    console.log('Weather data inserted into the database.');
  } catch (error) {
    console.error('Error inserting weather data into the database:', error);
  }
};


// Schedule weather data insertion every 5 minutes
setInterval(insertWeatherData, 5 * 60 * 1000);

app.use(cors());
app.use(express.json());

app.use('/weather', weatherRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Test database connection
  try {
    const client = await pool.connect();
    console.log('PostgreSQL connected successfully.');
    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
});







/*const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Route to fetch cities
app.get('/cities', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cities');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cities:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to fetch weather data
app.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/
/*before--------------
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/
