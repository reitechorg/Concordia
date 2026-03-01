import z from 'zod';
import { versionSchema } from './versionSchema';

export const serverStatusSchema = z.object({
	version: versionSchema,
	iconUrl: z.url(),
	name: z.string(),
	description: z.string(),
});
export type ServerStatus = z.infer<typeof serverStatusSchema>;
