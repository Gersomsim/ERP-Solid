import { CreateTenantDto, Tenant } from './tenant.model'

export interface ITenantRepository {
	getTenantById(tenantId: string): Promise<Tenant>
	createTenant(dto: CreateTenantDto): Promise<Tenant>
	updateTenant(tenant: Tenant): Promise<Tenant>
	updateSettings(tenantId: string, settings: Tenant): Promise<Tenant>
}
