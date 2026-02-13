import type { Response } from 'express';
import { ZodError } from 'zod';
import { HttpStatus } from './HttpStatus.utils';

export default class BuildResponseError {
    static buildError(res: Response, error: unknown): Response {
        if (error instanceof ZodError) {
            const errorData = error.issues[0];
            console.log(errorData);
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: errorData?.message,
                reason: errorData?.code,
                fieldError: errorData?.path[0],
            });
        } else {
            const errorRes = error as Error;
            return res
                .status(Number(errorRes.cause))
                .json({ error: errorRes.message });
        }
    }
}
