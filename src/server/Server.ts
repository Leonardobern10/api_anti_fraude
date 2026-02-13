import type { Application, Request, Response, Router } from 'express';
import express from 'express';

export default class Server {
    private server: Application;

    constructor(server: Application) {
        this.server = server;
        this.server.use(express.json());
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
