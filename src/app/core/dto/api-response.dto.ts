import { Pagination } from '@features/common/dto/paginate.dto'

export interface ApiResponseDto<T> {
	success: boolean
	message: string
	data: T
	meta: Meta
	pagination?: Pagination
}

export interface Meta {
	method: string
	path: string
	requestId: string
	status: number
	timestamp: Date
}
