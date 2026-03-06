import { HttpStatus } from '@utils/HttpStatus.utils.js';
import BaseError from './BaseError.js';

export default class BadRequestError extends BaseError {
    constructor(msg: string) {
        super(msg, HttpStatus.BAD_REQUEST);
    }
}
