export default class BaseError extends Error {
    public readonly statusCode: number;

    constructor(msg: string, statusCode: number) {
        super(msg);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/**
 Por que precisamos do Object.setPrototypeOf?
    Quando estendemos Error em TypeScript/Node, o prototype chain pode quebrar.
    Isso faz:
    
    error instanceof BaseError // pode retornar false ❌
    
    Por isso usamos:

    Object.setPrototypeOf(this, new.target.prototype);
*/
