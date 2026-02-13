import chalk from 'chalk';
import pino, { Logger as PinoLogger } from 'pino';

export default class Logger {
    private logger: PinoLogger;

    constructor() {
        this.logger = pino({
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                },
            },
        });
    }

    info(msg: string) {
        this.logger.info(msg);
    }

    error(action: string, msg: string) {
        this.logger.error(`Error on ${action}: ${msg}`);
    }

    alert(msg: string) {
        this.logger.warn(msg);
    }
}
