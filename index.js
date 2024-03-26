const express = require('express');
const { Pool } = require('pg');
const app = express();

// Middlewares
app.use(express.json());

// Pool configuration for PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this env variable is set in your Heroku app
  ssl: {
    rejectUnauthorized: false // Note: For production, you'll need a more secure configuration
  }
});

// POST endpoint to add data
app.post('/add-data', async (req, res) => {
  const { data } = req.body; // Extracting data from the POST request body
  if (!data) {
    return res.status(400).send('No data provided');
  }

  try {
    // Insert data into the PostgreSQL table and return the inserted record
    const result = await pool.query('INSERT INTO example_table (data) VALUES ($1) RETURNING *', [data]);
    res.status(201).json(result.rows[0]); // Send back the inserted data as confirmation
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server error');
  }
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});