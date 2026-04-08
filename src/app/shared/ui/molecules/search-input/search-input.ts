import { Component, OnDestroy, OnInit, effect, inject, input } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs'

import { Icon } from '../../atoms/icon/icon'

@Component({
	selector: 'lib-ui-search-input',
	imports: [Icon],
	templateUrl: './search-input.html',
})
export class SearchInput implements OnInit, OnDestroy {
	private readonly router = inject(Router)
	private readonly route = inject(ActivatedRoute)

	placeholder = input<string>('Buscar...')
	debounceMs = input<number>(300)

	protected value = ''
	private input$ = new Subject<string>()
	private readonly search = toSignal(this.route.queryParamMap.pipe(map(params => params.get('search'))))

	constructor() {
		effect(() => {
			const search = this.search() ?? ''
			this.value = search
			this.input$.next(search)
		})
	}

	ngOnInit(): void {
		this.input$
			.pipe(debounceTime(this.debounceMs()), distinctUntilChanged())
			.subscribe(term => this.searchByQuery(term))
	}

	ngOnDestroy(): void {
		this.input$.complete()
	}

	searchByQuery(param: string) {
		const search = param.length > 0 ? param : null
		this.router.navigate([], { queryParams: { search }, queryParamsHandling: 'merge' })
	}

	protected onInput(event: Event): void {
		const value = (event.target as HTMLInputElement).value
		this.value = value
		this.input$.next(value)
	}

	protected clear(): void {
		this.value = ''
		this.input$.next('')
	}
}
