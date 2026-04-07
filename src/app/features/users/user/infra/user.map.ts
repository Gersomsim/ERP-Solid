import { User } from '../domain'
import { UserDto } from './user.dto'

export class UserMap {
	static toDomain(raw: UserDto): User {
		return {
			id: raw.id,
			email: raw.email,
			isActive: raw.isActive,
			tenantId: raw.tenantId,
			mfaEnabled: raw.mfaEnabled,
			lastLoginAt: raw.lastLoginAt,
			roleId: raw.roleId,
			role: raw.role,
			profile: raw.profile,
		}
	}
}
