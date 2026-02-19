import type { Response } from 'express';
import { ZodError } from 'zod';
import { HttpStatus } from './HttpStatus.utils';
import BaseError from '@errors/BaseError';

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
        } else if (error instanceof BaseError) {
            return res
                .status(error.statusCode || HttpStatus.INTERNAL_SERVER)
                .json({ error: error.message });
        } else {
            return res
                .status(HttpStatus.INTERNAL_SERVER)
                .json({ error: 'Error on processing request.' });
        }
    }
}
