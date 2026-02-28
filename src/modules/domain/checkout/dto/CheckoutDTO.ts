import type { PaymentMethod } from '@modules/checkout/model/infoMethods/PaymentMethod';
import type InterfaceInfoMethod from '../InterfaceInfoMethod';

export default class CheckoutDTO {
    public readonly idPayment: string;
    public readonly orderId: string;
    public readonly userId: string;
    public readonly req: Request;
    public readonly paymentMethod: PaymentMethod;
    public readonly infoMethod: InterfaceInfoMethod;
    public readonly currency: string;
    public readonly ipAddress: string;
    public readonly userAgent: string;
    public readonly requestedAt: string;

    constructor(
        idPayment: string,
        orderId: string,
        userId: string,
        req: Request,
        paymentMethod: PaymentMethod,
        infoMethod: InterfaceInfoMethod,
        currency: string,
        ipAddress: string,
        userAgent: string,
        requestedAt: string,
    ) {
        this.idPayment = idPayment;
        this.orderId = orderId;
        this.userId = userId;
        this.req = req;
        this.paymentMethod = paymentMethod;
        this.infoMethod = infoMethod;
        this.currency = currency;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.requestedAt = requestedAt;
    }
}
