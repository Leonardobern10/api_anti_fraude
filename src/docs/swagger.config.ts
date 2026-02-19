import swaggerJsdoc from 'swagger-jsdoc';

const isProd = process.env.NODE_ENV === 'production';

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sistema Anti Fraude API',
            version: '1.0.0',
            description: 'Documentação da API de autenticação e pedidos',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'token',
                },
            },
            schemas: {
                RegisterDTO: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: { type: 'string', example: 'Leonardo' },
                        email: {
                            type: 'string',
                            example: 'leonardo@email.com',
                        },
                        password: { type: 'string', example: '123456' },
                    },
                },
                LoginDTO: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            example: 'leonardo@email.com',
                        },
                        password: { type: 'string', example: '123456' },
                    },
                },
                ClientResponse: {
                    type: 'object',
                    properties: {
                        idUser: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string', enum: ['admin', 'user'] },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                CreateOrderDTO: {
                    type: 'object',
                    required: ['value'],
                    properties: {
                        value: { type: 'number', example: 1500 },
                    },
                },
                OrderResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        user: { type: 'string' },
                        value: { type: 'number' },
                        orderStatus: {
                            type: 'string',
                            example: 'PENDING',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
            },
        },
        security: [{ cookieAuth: [] }],
        tags: [
            { name: 'Auth', description: 'Autenticação e usuários' },
            { name: 'Orders', description: 'Gestão de pedidos' },
        ],
    },
    apis: isProd
        ? ['./dist/modules/**/router/*.js']
        : ['./src/modules/**/router/*.ts'],
});
