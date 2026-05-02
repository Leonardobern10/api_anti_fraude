import type { NextFunction, Request, Response } from 'express';
import JwtUtils from '@utils/JWT.utils.js';
import { MSG } from '@utils/MessageResponse.js';
import BadRequestError from '@errors/BadRequestError.js';
import BuildResponseError from '@utils/BuildResponseError.js';

export default class AuthMiddleWare {
    static checkAuthentication(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const token = req.cookies.token;
            if (!token) throw new BadRequestError(MSG.AUTH.ERROR.INVALID_TOKEN);

            const payload = JwtUtils.verify(token);
            (req as any).user = payload; // injeta usuário
            next();
        } catch (error) {
            BuildResponseError.buildError(res, error);
        } finally {
            console.log('Authmiddleware encerrado!');
        }
    }
}
