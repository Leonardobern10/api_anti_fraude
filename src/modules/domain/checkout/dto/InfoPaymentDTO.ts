import type { PaymentMethod } from '@modules/checkout/model/infoMethods/PaymentMethod.js';

export type InfoPaymentDTO = {
    currency: string;
    paymentMethod: PaymentMethod;
    tokenCard?: string;
    installments?: number;
    pixKey?: string;
    dueDate?: Date;
};
