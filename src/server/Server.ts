import type { Application, Request, Response, Router } from 'express';
import express from 'express';
import HttpLogger from '../logs/HttpLogger';
import type ServerInterface from '../modules/domain/ServerInterface';
import cookieParser from 'cookie-parser';

export default class Server implements ServerInterface {
    private server: Application;

    constructor(server: Application) {
        this.server = server;
        this.server.use(express.json());
        this.server.use(cookieParser());
        this.server.use(HttpLogger.buildHttpLogger()); // ✔ middleware correto
        this.checkHealth();
    }

    public init(port: string | number) {
        this.server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
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
