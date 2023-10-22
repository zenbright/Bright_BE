import swaggerJSDoc from 'swagger-jsdoc';
import { API_DOCS_HOST, ROUTE_ENDPOINT } from './config';
const swaggerDefinition = {
    info: {
        title: 'BRIGHT BACKEND API V1 Documentation',
        version: '1.0.0',
        description: 'API Documentation',
    },
    host: API_DOCS_HOST,
    basePath: ROUTE_ENDPOINT.BASE_URL_V1,
    produces: ['application/json'],
    consumes: ['application/json'],
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    security: [{ jwt: [] }],
};
const apiFiles = [
    'src/components/**/*.route.ts',
    'src/components/**/*.docs.ts',
    'src/components/**/*.model.ts',
    'src/api/validatorErrorHandler.ts',
];
const options = {
    swaggerDefinition,
    apis: apiFiles,
};
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
