import { Router } from 'express';

export default interface InterfaceAuthRouter {
    createUser(): void;
    getUser(): void;
    test(): void;
    getRouter(): Router;
}
