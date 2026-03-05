import type { NextFunction, Request, Response } from 'express';
import JwtUtils from '@utils/JWT.utils';
import { MSG } from '@utils/MessageResponse';
import BadRequestError from '@errors/BadRequestError';
import BuildResponseError from '@utils/BuildResponseError';

export default class AuthMiddleWare {
    static checkAuthentication(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            console.log('Middleware executado!');

            const token = req.cookies.token;
            if (!token) throw new BadRequestError(MSG.AUTH.ERROR.INVALID_TOKEN);

            const payload = JwtUtils.verify(token);
            (req as any).user = payload; // injeta usuário
            next();
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }
}
