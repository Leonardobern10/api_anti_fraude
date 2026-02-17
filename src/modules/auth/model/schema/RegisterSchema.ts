import z from 'zod';

export const RegisterSchema = z.object({
    name: z
        .string('Name has been String')
        .min(2, 'This field is too short. Min: 2 characters'),
    email: z.email('Email is not valid'),
    password: z.string().min(8, 'This field is too short. Min: 8 characters'),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
