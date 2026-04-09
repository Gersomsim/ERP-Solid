export interface CreateCustomerDto {
	name: string
	taxId: string
	email?: string
	phone?: string
	address?: string
	city?: string
	state?: string
	zip?: string
	country?: string
	creditLimit: number
}
