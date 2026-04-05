import { Profile } from '../../profile/domain'
import { Role } from '../../role/domain'

export interface User {
	id: string
	email: string
	password: string
	isActive: boolean
	tenantId: string
	mfaEnabled: boolean
	mfaSecret: string | null
	lastLoginAt?: Date
	roleId?: string
	role?: Role
	profile: Profile
}
