import { Profile } from '../../profile/domain'
import { Role } from '../../role/domain'

export interface User {
	id: string
	email: string
	isActive: boolean
	tenantId: string
	mfaEnabled: boolean
	lastLoginAt?: Date
	roleId?: string
	role: Role
	profile: Profile
}
