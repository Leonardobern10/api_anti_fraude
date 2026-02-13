import type { Application, Request, Response, Router } from 'express';
import express from 'express';

export default class Server {
    private server: Application;
    private routers: Map<string, Router>;

    constructor(server: Application) {
        this.server = server;
        this.routers = new Map();
        this.server.use(express.json());
        this.checkHealth();
    }

    public init(port: string | number) {
        this.registerRouters();

        this.server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }

    public addRouters(path: string, router: Router) {
        this.routers.set(path, router);
    }

    public checkHealth() {
        this.server.get('/', async (req: Request, res: Response) => {
            res.status(200).json({ message: 'Everything is cool!!!! 😎' });
        });
    }

    public registerRouters() {
        for (const [path, router] of this.routers) {
            this.server.use(path, router);
        }
    }
}
