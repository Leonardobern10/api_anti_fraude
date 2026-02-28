import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod';
import type InterfaceInfoMethodBuilder from '@modules/domain/checkout/InterfaceInfoMethodBuilder';
import PixPayment from '../PixPayment';

export default class PixPaymentBuilder implements InterfaceInfoMethodBuilder {
    private pixKey: string | null;

    constructor() {
        this.pixKey = null;
    }

    public setPixKey(pixKey: string): PixPaymentBuilder {
        this.pixKey = pixKey;
        return this;
    }

    buildInfoMethod(): InterfaceInfoMethod | undefined {
        if (!this.pixKey) throw new Error('Erro on build InfoMethod');
        return new PixPayment(this.pixKey);
    }
}
