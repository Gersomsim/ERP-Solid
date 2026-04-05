export interface Tenant {
	id: string
	name: string
	slug: string
	taxIdentifier: string
	settings: Record<string, any>
	status: string
}
