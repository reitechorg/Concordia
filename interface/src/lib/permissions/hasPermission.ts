import { Permissions } from '../../generated/enums';

export const user = { roles: [] };

export function hasPermission(checkPerm: Permissions): boolean {
	return user.roles.some((role: any) =>
		role.permissions.some(
			(permission: any) =>
				permission.permission === checkPerm && permission.state === 'ALLOW',
		),
	);
}
