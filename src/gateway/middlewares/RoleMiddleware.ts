import { ClientRole } from '@modules/auth/model/ClientRole.js';
import BuildResponseError from '@utils/BuildResponseError.js';
import { HttpStatus } from '@utils/HttpStatus.utils.js';
import type { NextFunction, Request, Response } from 'express';

export default class RoleMiddleware {
    static logTentative(email: string, role: ClientRole) {
        console.log(
            `The client ${email} tried to access protected route. Your role: ${role}`,
        );
    }
    static checkAuthorization(req: Request, res: Response, next: NextFunction) {
        console.log('RoleMiddleware executado!');
        try {
            const { email, role } = (req as any).user;
            console.log(req.body);
            console.log(
                `The client ${email} tried to access protected route. Your role: ${role}`,
            );
            if (role !== ClientRole.ADMIN && role !== ClientRole.ANALYST)
                throw new Error("This operation isn't authorized.");

            next();
        } catch (error) {
            console.log('Tentative to access protected route failed.');
            BuildResponseError.buildError(res, error, HttpStatus.FORBIDDEN);
        }
    }
    static checkAdminAuthorization(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        console.log('RoleMiddleware executado!');
        try {
            const { email, role } = (req as any).user;
            console.log(
                `The client ${email} tried to access protected route. Your role: ${role}`,
            );
            if (role !== ClientRole.ADMIN)
                throw new Error("This operation isn't authorized.");

            next();
        } catch (error) {
            console.log('Tentative to access protected route failed.');
            BuildResponseError.buildError(res, error, HttpStatus.FORBIDDEN);
        }
    }
}
