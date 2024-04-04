// databaseController.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'ipsprhwtiyjvqi',
  host: 'ec2-52-73-67-148.compute-1.amazonaws.com',
  database: 'df3f1dhqeseush',
  password: '095110791a9adf5592cae4ee7d157a3f78867b5541e3ffc76147ebcfd92db0af',
  port: 5432
});

  
  // Call the function to parse GeoJSON and insert cities into the database
  //parseGeoJSONAndInsertCities();

// You can implement other CRUD operations here as needed

//module.exports = {parseGeoJSONAndInsertCities};
