import swaggerJsdoc from 'swagger-jsdoc';
import { Env } from './env.config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Knob API',
      version: '1.0.0',
      description: 'API для пет-проекта (клон Jira)',
    },
    servers: [
      {
        url: `${Env.APP_URL}:${Env.BACKEND_PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);