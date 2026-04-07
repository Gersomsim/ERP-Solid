import { UserDto } from '@features/users/user/infra'

export interface AuthDto {
	user: UserDto
	token: string
}
