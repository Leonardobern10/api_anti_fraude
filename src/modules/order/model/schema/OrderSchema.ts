import z from 'zod';

export const OrderSchema = z.object({
    email: z.email(),
    value: z.number(),
});

export type OrderType = z.infer<typeof OrderSchema>;
