import { Permissions, PermissionState } from '../generated/client.js';
import { SafeUser } from '../types/RequestWithUser.js';

export default function hasPermission(user: SafeUser, lookupPermission: Permissions) {
	return user.roles.some((role: { permissions: any[] }) =>
		role.permissions.some(
			permission =>
				permission.permission === lookupPermission &&
				permission.state === PermissionState.ALLOW,
		),
	);
}
