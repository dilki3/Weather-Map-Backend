const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'Weather API', // Title of the API
      version: '1.0.0', // Version of the API
      description: 'API to get weather data for cities', // Description of the API
    },
    servers: [{ url: 'http://localhost:3001' }], // Base URL of the API
  },
  apis: ['./public/routes/*.js'], // Path to the routes files containing Swagger annotations
};

// Defer setupSwaggerUI until it's called
const setupSwaggerUI = () => swaggerUi.setup(swaggerJSDoc(options));

module.exports = {
  serveSwaggerUI: swaggerUi.serve,
  setupSwaggerUI,
};
