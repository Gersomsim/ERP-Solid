import { User } from '../../user/domain'

export interface Auth {
	user: User
	token: string
}
