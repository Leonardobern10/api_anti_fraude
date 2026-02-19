import type { NextFunction, Request, Response } from 'express';
import JwtUtils from '@utils/JWT.utils';
import { HttpStatus } from '@utils/HttpStatus.utils';
import { MSG } from '@utils/MessageResponse';

export default class AuthMiddleWare {
    static checkAuthentication(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ error: MSG.AUTH.ERROR.UNAUTHORIZED });
            }

            const payload = JwtUtils.verify(token);
            (req as any).user = payload; // injeta usuário
            next();
        } catch (error) {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ error: MSG.AUTH.ERROR.INVALID_TOKEN });
        }
    }
}
