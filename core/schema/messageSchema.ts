import { z } from 'zod';
import { idSchema } from './idSchema';
import { shortProfileSchema } from './shortProfileSchema';

export const messageSchema = z.object({
	id: idSchema,
	text: z.string().optional(),
	authorId: idSchema,
	channelId: idSchema,
	createdAt: z.date(),
	updatedAt: z.date(),

	author: shortProfileSchema.optional(),
});

export type Message = z.infer<typeof messageSchema>;
