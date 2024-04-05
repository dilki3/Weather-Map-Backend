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

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname + "/public")))


app.use('/weather-api',swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

app.use('/weather', weatherRoutes);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});  

const { updateWeatherData } = require('./public/controllers/weatherController');

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





