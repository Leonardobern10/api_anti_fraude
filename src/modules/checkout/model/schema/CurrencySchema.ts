import z from 'zod';
import { Currency } from '../Currency.js';

export const CurrencySchema = z.object({
    currency: z.enum(Currency),
});
