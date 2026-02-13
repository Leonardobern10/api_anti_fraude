import type { Router } from 'express';
import type Server from '../server/Server';

export default class App {
    private path: string;
    private port: string | number;
    private server: Server;

    constructor(path: string, port: string | number, server: Server) {
        this.path = path;
        this.port = port;
        this.server = server;
    }

    public async init() {
        this.server.init(this.port);
    }

    public async registerRoutes(router: Router) {
        this.server.addRouters(this.path, router);
    }
}
