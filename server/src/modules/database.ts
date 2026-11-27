import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client.js';
import dotenv from 'dotenv';
dotenv.config();

function parseMysqlConnectionString(conn: string) {
	// Ensure URL has a scheme so the URL parser can handle it
	const normalized = conn.startsWith('mysql://') ? conn : 'mysql://' + conn;

	const regexp = /\/\/([^:/?#]+)(?::(.+))?@([^:/?#]+)(?::(\d+))?\/([^/?#]+)/;

	const data = regexp.exec(conn);

	if (!data) throw new Error('Invalid DATABASE_URL!');

	return {
		user: data[1],
		password: data[2],
		host: data[3],
		port: parseInt(data[4]),
		database: data[5],
	};
}

// Prisma you're so shit at times...
const adapter = new PrismaMariaDb({
	...parseMysqlConnectionString(process.env.DATABASE_URL!),
});

const db = new PrismaClient({ adapter }).$extends({
	result: {
		file: {
			url: {
				needs: { id: true },
				compute(file) {
					return `${process.env.URL}/files/${file.id}`;
				},
			},
		},
	},
	query: {
		$allModels: {
			async $allOperations({ args, query }) {
				const result = await query(args);
				return convertBytesToStrings(result);
			},
		},
	},
});

function convertBytesToStrings(obj: any): any {
	if (obj === null || obj === undefined) return obj;

	if (obj instanceof Date) {
		return obj;
	}

	if (obj instanceof Uint8Array) {
		return Buffer.from(obj).toString('utf-8');
	}

	if (Array.isArray(obj)) {
		return obj.map(convertBytesToStrings);
	}

	if (typeof obj === 'object') {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [key, convertBytesToStrings(value)]),
		);
	}

	return obj;
}

export default db;
