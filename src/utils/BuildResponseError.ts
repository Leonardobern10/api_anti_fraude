import type { Response } from 'express';
import { ZodError } from 'zod';

export default class BuildResponseError {
    static buildError(res: Response, error: unknown): Response {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: error.issues[0]?.message,
            });
        } else {
            return res.status(404).json({ error: (error as Error).message });
        }
    }
}
