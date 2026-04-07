import { Injectable, computed, signal } from '@angular/core'

import { Permission } from '@features/users/permission/domain'
import { Role } from '@features/users/role/domain'
import { Auth } from '@features/users/auth/domain'
import { User } from '@features/users/user/domain'

const STORAGE_KEY = 'erp_auth'

interface PersistedUser {
	id: string
	email: string
	tenantId: string
	isActive: boolean
	mfaEnabled: boolean
	roleId?: string
	profile: User['profile']
	role: User['role']
}

@Injectable({ providedIn: 'root' })
export class AuthState {
	private readonly _user = signal<User | null>(null)
	private readonly _token = signal<string | null>(null)
	private readonly _role = signal<Role | null>(null)
	private readonly _permissions = signal<Permission[]>([])

	readonly user = this._user.asReadonly()
	readonly token = this._token.asReadonly()
	readonly role = this._role.asReadonly()
	readonly permissions = this._permissions.asReadonly()
	readonly isAuthenticated = computed(() => this._user() !== null)
	readonly hasToken = computed(() => this._token() !== null)

	constructor() {
		this.restore()
	}

	setAuth(auth: Auth): void {
		this._user.set(auth.user)
		this._token.set(auth.token)
		this._role.set(auth.user.role ?? null)
		this._permissions.set(auth.user.role?.permissions ?? [])
		this.persist(auth.user)
	}

	setToken(token: string): void {
		this._token.set(token)
	}

	clear(): void {
		this._user.set(null)
		this._token.set(null)
		this._role.set(null)
		this._permissions.set([])
		localStorage.removeItem(STORAGE_KEY)
	}

	hasPermission(slug: string): boolean {
		return this._permissions().some(p => p.slug === slug)
	}

	private persist(user: User): void {
		const safe: PersistedUser = {
			id: user.id,
			email: user.email,
			tenantId: user.tenantId,
			isActive: user.isActive,
			mfaEnabled: user.mfaEnabled,
			roleId: user.roleId,
			profile: user.profile,
			role: user.role,
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(safe))
	}

	private restore(): void {
		try {
			const raw = localStorage.getItem(STORAGE_KEY)
			if (!raw) return
			const persisted = JSON.parse(raw) as PersistedUser
			this._user.set(persisted as User)
			this._role.set(persisted.role ?? null)
			this._permissions.set(persisted.role?.permissions ?? [])
		} catch {
			localStorage.removeItem(STORAGE_KEY)
		}
	}
}
