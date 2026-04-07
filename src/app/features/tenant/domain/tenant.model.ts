export interface Tenant {
	id: string
	name: string
	slug: string
	taxIdentifier: string
	settings: Record<string, unknown>
	status: string
}

export interface CreateTenantDto {
	name: string
	slug: string
	taxIdentifier: string
}
