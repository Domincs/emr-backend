import swaggerJsdoc from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your API Documentation',
    version: '1.0.0',
    description: 'API documentation for your Express.js application',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Replace with your server URL
      description: 'Development server',
    },
  ],
};

// Options for the swagger-jsdoc
const options: swaggerJsdoc.Options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ['./src/routes/*.ts'], // Adjust the path based on your project structure
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
