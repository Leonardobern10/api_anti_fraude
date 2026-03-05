import z from 'zod';
import { Currency } from '../Currency';

export const CurrencySchema = z.object({
    currency: z.enum(Currency),
});
