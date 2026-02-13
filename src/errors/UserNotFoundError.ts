export default class UserNotFoundError extends Error {
    constructor(msg: string, code: number) {
        super(msg, { cause: code });
    }
}
