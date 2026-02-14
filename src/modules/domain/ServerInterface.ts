import { Router } from 'express';

export default interface ServerInterface {
    init(port: string | number): void;
    addRouters(path: string, router: Router): void;
    checkHealth(): void;
}
