export default class HttpError extends Error {
    public readonly statusCode: number;
    constructor(msg: string, statusCode: number = 500) {
        super(msg);
        this.statusCode = statusCode;
    }
}
