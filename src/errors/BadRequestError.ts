import { HttpStatus } from '@utils/HttpStatus.utils';
import BaseError from './BaseError';

export default class BadRequestError extends BaseError {
    constructor(msg: string) {
        super(msg, HttpStatus.BAD_REQUEST);
    }
}
