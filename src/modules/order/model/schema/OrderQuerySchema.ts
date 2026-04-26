import { OrderStatus } from '@modules/domain/order/OrderStatus.js';
import z from 'zod';

export const OrderQuerySchema = z.object({
    status: z.enum(OrderStatus).optional(),

    minValue: z.coerce.number().min(0).optional(),
    maxValue: z.coerce.number().optional(),

    user: z.string().optional(),

    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),

    sortBy: z.enum(['value', 'createdAt', 'updatedAt']).optional(),
    modeSort: z.enum(['DESC', 'ASC']).default('ASC'),
});

export type OrderQueryType = z.infer<typeof OrderQuerySchema>;
