import type { NextFunction, Request, Response } from 'express';
import Crypt from '../../../utils/Crypt';
import JwtUtils from '../../../utils/JWT.utils';

export default class AuthMiddleWare {
    static checkAuthentication(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(403).json({ error: 'Credentials invalid' });
            }

            const payload = JwtUtils.verify(token);
            (req as any).user = payload; // injeta usuário
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
}
