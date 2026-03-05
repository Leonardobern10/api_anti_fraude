import type { PaymentMethod } from '@modules/checkout/model/infoMethods/PaymentMethod';
import type InterfaceInfoMethod from '../InterfaceInfoMethod';

export default class CheckoutDTO {
    public readonly orderId: string;
    public readonly userId: string;
    public readonly paymentMethod: PaymentMethod;
    public readonly infoMethod: InterfaceInfoMethod;
    public readonly currency: string;
    public readonly ipAddress: string;
    public readonly userAgent: string;
    public readonly requestedAt: string;

    constructor(
        orderId: string,
        userId: string,
        paymentMethod: PaymentMethod,
        infoMethod: InterfaceInfoMethod,
        currency: string,
        ipAddress: string,
        userAgent: string,
        requestedAt: string,
    ) {
        this.orderId = orderId;
        this.userId = userId;
        this.paymentMethod = paymentMethod;
        this.infoMethod = infoMethod;
        this.currency = currency;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.requestedAt = requestedAt;
    }
}
