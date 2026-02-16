import pino, { type Logger as PinoLogger } from 'pino';
import type LoggerInterface from '../modules/domain/LoggerInterface';

export default class Logger implements LoggerInterface {
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

    /**
     * A função recebe como parâmetro uma string `msg`
     * que é exibida no console como mensagem informativas
     * em alguns momentos cujo registro é importante.
     *
     * @param msg Mensagem a ser exibida.
     */
    info(msg: string) {
        this.logger.info(msg);
    }

    /**
     * A função recebe como parâmetro `action` que é a origem
     * do erro e `msg`que representa a mensagem de erro a ser exibida.
     * Sua execução é dada em cenário de erro ao qual são necessários
     * serem exibidos no console.
     *
     * @param action Descrição concisa da operação geradora do erro
     * @param msg Mensagem de erro a ser exibida.
     */
    error(action: string, msg: string) {
        this.logger.error(`Error on ${action}: ${msg}`);
    }

    alert(msg: string) {
        this.logger.warn(msg);
    }
}
