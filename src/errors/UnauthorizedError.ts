import { HttpStatus } from '@utils/HttpStatus.utils.js';
import BaseError from './BaseError.js';

export default class UnauthorizedError extends BaseError {
    constructor(msg: string) {
        super(msg, HttpStatus.UNAUTHORIZED);
    }
}
