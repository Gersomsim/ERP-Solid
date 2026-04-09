export interface Customer {
	id: string
	name: string
	taxId: string
	email?: string
	phone?: string
	address?: string
	city?: string
	state?: string
	zip?: string
	country?: string
	tenantId: string
	creditLimit: number
}
