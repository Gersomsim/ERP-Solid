export interface Customer {
	id: string
	name: string
	taxId: string
	email: string | null
	phone: string | null
	address: string | null
	city: string | null
	state: string | null
	zip: string | null
	country: string | null
	tenantId: string
	creditLimit: number
}
