import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod';
import type { PaymentMethod } from './infoMethods/PaymentMethod';

export default class Payment {
    private idPayment: string;
    private orderId: string;
    private total: number;
    private userId: string;
    private paymentMethod: PaymentMethod;
    private infoMethod: InterfaceInfoMethod;
    private currency: string;
    private ipAddress: string;
    private userAgent: string;
    private requestedAt: string;

    constructor(
        idPayment: string,
        orderId: string,
        total: number,
        userId: string,
        paymentMethod: PaymentMethod,
        infoMethod: InterfaceInfoMethod,
        currency: string,
        ipAddress: string,
        userAgent: string,
        requestedAt: string,
    ) {
        this.idPayment = idPayment;
        this.orderId = orderId;
        this.total = total;
        this.userId = userId;
        this.paymentMethod = paymentMethod;
        this.infoMethod = infoMethod;
        this.currency = currency;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.requestedAt = requestedAt;
    }

    getIdPayment(): string {
        return this.idPayment;
    }

    setIdPayment(idPayment: string): void {
        this.idPayment = idPayment;
    }

    getOrderId(): string {
        return this.orderId;
    }

    setOrderId(orderId: string): void {
        this.orderId = orderId;
    }

    getTotal(): number {
        return this.total;
    }

    setTotal(newTotal: number): void {
        this.total = newTotal;
    }

    getUserId(): string {
        return this.userId;
    }

    setUserId(userId: string): void {
        this.userId = userId;
    }

    getPaymentMethod(): PaymentMethod {
        return this.paymentMethod;
    }

    setPaymentMethod(paymentMethod: PaymentMethod): void {
        this.paymentMethod = paymentMethod;
    }

    getInfoMethod(): InterfaceInfoMethod {
        return this.infoMethod;
    }

    setInfoMethod(infoMethod: InterfaceInfoMethod): void {
        this.infoMethod = infoMethod;
    }

    getCurrency(): string {
        return this.currency;
    }

    setCurrency(currency: string): void {
        this.currency = currency;
    }

    getIpAddress(): string {
        return this.ipAddress;
    }

    setIpAddress(ipAddress: string): void {
        this.ipAddress = ipAddress;
    }

    getUserAgent(): string {
        return this.userAgent;
    }

    setUserAgent(userAgent: string): void {
        this.userAgent = userAgent;
    }

    getRequestedAt(): string {
        return this.requestedAt;
    }

    setRequestedAt(requestedAt: string): void {
        this.requestedAt = requestedAt;
    }
}
