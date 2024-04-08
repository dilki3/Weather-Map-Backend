const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const weatherRoutes = require('./public/routes/weatherRoutes');
const { Pool } = require('pg');
require('dotenv').config();
const axios = require('axios');
const path = require('path')
//////////
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { updateWeatherData } = require('./public/controllers/weatherController');
const { setupSwaggerUI } = require('./swagger');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname + "/public")))
const sw =  setupSwaggerUI()

app.use('/weather-api',swaggerUi.serve, sw);

app.use('/weather', weatherRoutes);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});  



setInterval(updateWeatherData, 5 * 60 * 1000);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const client = await pool.connect();
    
    console.log('PostgreSQL connected successfully.');
    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
});





