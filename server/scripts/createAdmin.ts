import { Permissions, PermissionState } from '../src/generated/client.js';
import db from '../src/modules/database.js';
import bcrypt from 'bcryptjs';
import { logError, logInfo } from '../src/lib/logger.js';

const createAdmin = async () => {
	if (!process.env.ADMIN_PASSWORD) {
		throw new Error('[ERROR] [scripts/createAdmin] PASSWORD env is not defined');
	}
	if (!process.env.ADMIN_USERNAME) {
		throw new Error('[ERROR] [scripts/createAdmin] USERNAME env is not defined');
	}

	const permissions = Object.values(Permissions);
	logInfo('[SETUP] Creating role...');
	try {
		await db.role.create({
			data: {
				title: 'admin',
				permissions: {
					createMany: {
						data: permissions.map(perm => ({
							permission: perm,
							state: PermissionState.ALLOW,
						})),
					},
				},
			},
		});
	} catch (e) {
		logError('Failed to create role', e);
	}

	const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

	logInfo('[SETUP] Creating admin user...');
	try {
		await db.user.create({
			data: {
				name: process.env.ADMIN_USERNAME,
				password: passwordHash,
				roles: {
					connect: {
						title: 'admin',
					},
				},
			},
		});
	} catch (e) {
		logError('Failed to create user', e);
	}
	process.exit();
};

createAdmin();
