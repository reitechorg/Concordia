import z from 'zod';

export const versionSchema = z.templateLiteral([
	z.number().int().nonnegative(),
	'.',
	z.number().int().nonnegative(),
	'.',
	z.number().int().nonnegative(),
]);

export type Version = z.infer<typeof versionSchema>;
