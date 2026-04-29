import type { Response } from 'express';
import { ZodError } from 'zod';
import { HttpStatus } from './HttpStatus.utils.js';
import BaseError from '@errors/BaseError.js';

export default class BuildResponseError {
    static buildError(
        res: Response,
        error: unknown,
        status?: HttpStatus,
    ): Response {
        if (error instanceof ZodError) {
            const errorData = error.issues[0];
            console.log(errorData);
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: errorData?.message,
                reason: errorData?.code,
                fieldError: errorData?.path[0],
            });
        } else if (error instanceof BaseError) {
            console.log(error);
            return res
                .status(status || HttpStatus.INTERNAL_SERVER)
                .json({ error: error.message });
        } else {
            return res
                .status(status || HttpStatus.INTERNAL_SERVER)
                .json({
                    error:
                        (error as any).message ||
                        'Error on processing request.',
                });
        }
    }
}
