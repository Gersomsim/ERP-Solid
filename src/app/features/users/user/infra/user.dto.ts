import { Profile } from '@features/users/profile/domain'
import { Role } from '@features/users/role/domain'

export interface UserDto {
	id: string
	email: string
	password: string
	isActive: boolean
	tenantId: string
	mfaEnabled: boolean
	mfaSecret: string | null
	lastLoginAt?: Date
	roleId?: string
	role: Role
	profile: Profile
}
