const swaggerJsdoc = require('swagger-jsdoc');

// Swagger konfiguratsiyasi
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Cars API',
      version: '1.0.0',
      description: 'Authentication system with login, register, and logout features.',
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./router/*.js'], // Routerlar joylashgan joy
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;