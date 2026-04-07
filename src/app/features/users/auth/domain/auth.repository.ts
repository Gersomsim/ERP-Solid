import { Auth } from './auth.model'

export interface AuthRepository {
	forgotPassword(email: string): Promise<void>
	login(email: string, password: string): Promise<Auth>
	logout(): Promise<void>
	register(email: string, password: string): Promise<void>
	resetPassword(token: string, password: string): Promise<void>
	validateToken(token: string, type: string): Promise<boolean>
}
