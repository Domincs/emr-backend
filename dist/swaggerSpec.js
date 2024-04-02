"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./src/routes/*.ts'], // Adjust the path based on your project structure
};
// Initialize swagger-jsdoc
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
