import { HttpStatus } from '@utils/HttpStatus.utils';
import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
    constructor(msg: string) {
        super(msg, HttpStatus.NOT_FOUND);
    }
}
