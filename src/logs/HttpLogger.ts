import pino from 'pino';
import pinoHttp from 'pino-http';
import type { RequestHandler } from 'express';

export default class HttpLogger {
    public static buildHttpLogger(): RequestHandler {
        return pinoHttp({
            logger: pino({
                transport: {
                    target: 'pino-pretty',
                    options: { colorize: true },
                },
            }),
        });
    }
}
