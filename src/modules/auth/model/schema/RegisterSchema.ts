import z from 'zod';
import { SchemaErrors } from './SchemaErrors.js';

export const RegisterSchema = z.object({
    name: z.string(SchemaErrors.NAME.STRING).min(2, SchemaErrors.NAME.LENGTH),
    email: z.email(SchemaErrors.EMAIL),
    password: z.string().min(8, SchemaErrors.PASSWORD.LENGTH),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
