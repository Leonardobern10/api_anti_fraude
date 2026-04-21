import { HttpStatus } from '@utils/HttpStatus.utils.js';
import BaseError from './BaseError.js';

export default class NotFoundError extends BaseError {
    constructor(msg: string) {
        super(msg, HttpStatus.NOT_FOUND);
    }
}
