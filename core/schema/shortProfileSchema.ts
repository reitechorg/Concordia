import z from 'zod';
import { idSchema } from './idSchema';

export const shortProfileSchema = z.object({
	id: idSchema,
	name: z.string(),
	profileUrl: z.url().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ShortProfile = z.infer<typeof shortProfileSchema>;
