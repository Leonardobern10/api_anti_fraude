import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod';
import type Payment from '../Payment';

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
