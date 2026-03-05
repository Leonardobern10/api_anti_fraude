import z from 'zod';
import { CurrencySchema } from './CurrencySchema';
import { PaymentMethod } from '../infoMethods/PaymentMethod';

export const CheckoutSchema = z.discriminatedUnion('paymentMethod', [
    CurrencySchema.extend({
        paymentMethod: z.literal(PaymentMethod.CARD),
        cardToken: z.string().min(1),
        installments: z.number().int().min(1).max(12),
    }),

    CurrencySchema.extend({
        paymentMethod: z.literal(PaymentMethod.PIX),
        pixKey: z.string().min(1),
    }),

    CurrencySchema.extend({
        paymentMethod: z.literal(PaymentMethod.TICKET),
        dueDate: z.date(),
    }),
]);

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;
