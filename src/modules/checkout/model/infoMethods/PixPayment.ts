import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod.js';
import type Payment from '../Payment.js';

export default class PixPayment implements InterfaceInfoMethod {
    private readonly pixKey: string;

    constructor(pixKey: string) {
        this.pixKey = pixKey;
    }

    public getPixKey(): string {
        return this.pixKey;
    }

    pay(): Payment {
        throw new Error('Method not implemented.');
    }
}
