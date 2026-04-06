export interface ApiResponseDto<T> {
	success: boolean
	message: string
	data: T
	meta: Meta
}

export interface Meta {
	method: string
	path: string
	requestId: string
	status: number
	timestamp: Date
}
