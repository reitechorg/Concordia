import z from 'zod';

export const idSchema = z.string().min(1, 'ID cannot be empty');
export type Id = z.infer<typeof idSchema>;
