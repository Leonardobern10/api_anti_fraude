import { Router } from 'express';

export default interface ApiGatewayInterface {
    getPath(): string;
    addRoute(subPath: string, router: Router): void;
    build(): Router;
}
