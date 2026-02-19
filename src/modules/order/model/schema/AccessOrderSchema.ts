import { UserDTO } from '@modules/domain/auth/dto/UserDTO';
import z from 'zod';

export const AccessOrderSchema = z.object({
    id: z.string(),
    user: z.instanceof(UserDTO),
});

export type AccessOrderType = z.infer<typeof AccessOrderSchema>;
