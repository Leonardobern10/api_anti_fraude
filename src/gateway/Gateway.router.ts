import { Router } from 'express';
import type ApiGatewayInterface from '../modules/domain/ApiGatewayInterface';

export default class ApiGateway implements ApiGatewayInterface {
    private path: string;
    private router: Router;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
    }

    public getPath(): string {
        return this.path;
    }

    public addRoute(subPath: string, router: Router) {
        this.router.use(subPath, router);
    }

    public build(): Router {
        return this.router;
    }
}
