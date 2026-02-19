import { HttpStatus } from '@utils/HttpStatus.utils';
import BaseError from './BaseError';

export default class UnauthorizedError extends BaseError {
    constructor(msg: string) {
        super(msg, HttpStatus.UNAUTHORIZED);
    }
}
