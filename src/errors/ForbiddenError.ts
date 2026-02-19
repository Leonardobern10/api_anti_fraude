import { HttpStatus } from '@utils/HttpStatus.utils';
import BaseError from './BaseError';

export default class ForbiddenError extends BaseError {
    constructor(msg: string) {
        super(msg, HttpStatus.FORBIDDEN);
    }
}
