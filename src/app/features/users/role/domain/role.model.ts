import { Permission } from '../../permission/domain'

export interface Role {
	id: string
	name: string
	tenantId: string
	permissions: Permission[]
}
