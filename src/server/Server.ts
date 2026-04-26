import type { Application, Request, Response, Router } from 'express';
import express from 'express';
import HttpLogger from '../logs/HttpLogger.js';
import type ServerInterface from '../modules/domain/ServerInterface.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express'; // <-- FALTAVA
import { swaggerSpec } from '../docs/swagger.config.js';
import cors from 'cors';

export default class Server implements ServerInterface {
    private server: Application;

    constructor(server: Application) {
        this.server = server;
        this.server.use(express.json());
        this.server.use(cookieParser());
        this.server.use(HttpLogger.buildHttpLogger()); // ✔ middleware correto
        this.server.use(
            '/api/v1/docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerSpec),
        );
        this.server.use(
            cors({
                origin: ['http://localhost:5173'],
                methods: ['GET'],
                allowedHeaders: ['Content-type', 'Authorization'],
            }),
        );
        this.checkHealth();
    }

    public init(port: string | number) {
        this.server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
            console.log(`Swagger on http://localhost:${port}/api/v1/docs`);
        });
    }

    public addRouters(path: string, router: Router) {
        this.server.use(path, router);
    }

    public checkHealth() {
        this.server.get('/', async (req: Request, res: Response) => {
            res.status(200).json({ message: 'Everything is cool!!!! 😎' });
        });
    }
}
