export interface PaginateDto<T> {
	data: T[]
	pagination: Pagination
}

export interface Pagination {
	totalItems: number
	itemCount: number
	itemsPerPage: number
	totalPages: number
	currentPage: number
}
