import z from 'zod';
import { SchemaErrors } from './SchemaErrors.js';

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, SchemaErrors.PASSWORD.LENGTH),
});

export type LoginType = z.infer<typeof LoginSchema>;
