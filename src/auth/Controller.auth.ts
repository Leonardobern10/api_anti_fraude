import type { Request, Response } from 'express';
import type ServiceAuth from './Service.auth';

export default class ControllerAuth {
    private service: ServiceAuth;

    constructor(service: ServiceAuth) {
        this.service = service;
    }

    public getUser(req: Request, res: Response) {
        return res.status(200).json({ message: this.service.getUser() });
    }
}
