export interface CreatePriceListDto {
	id: string
	name: string
	tenantId: string
	isDefault: boolean
	validFrom: Date | null
	validTo: Date | null
}
