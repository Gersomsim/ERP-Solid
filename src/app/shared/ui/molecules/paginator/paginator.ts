import { Component, computed, inject, input, output } from '@angular/core'
import { Router } from '@angular/router'

import { Icon } from '../../atoms/icon/icon'

@Component({
	selector: 'lib-ui-paginator',
	imports: [Icon],
	templateUrl: './paginator.html',
})
export class Paginator {
	private readonly router = inject(Router)

	total = input.required<number>()
	pageSize = input<number>(10)
	page = input<number>(1)

	pageChange = output<number>()

	protected totalPages = computed(() => Math.ceil(this.total() / this.pageSize()))

	protected hasPrev = computed(() => this.page() > 1)
	protected hasNext = computed(() => this.page() < this.totalPages())

	protected from = computed(() => {
		if (this.total() === 0) return 0
		return (this.page() - 1) * this.pageSize() + 1
	})
	protected to = computed(() => Math.min(this.page() * this.pageSize(), this.total()))

	/** Genera las páginas visibles: máx 5, centradas en la página actual */
	protected visiblePages = computed<number[]>(() => {
		const total = this.totalPages()
		const current = this.page()
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

		const delta = 2
		const left = Math.max(2, current - delta)
		const right = Math.min(total - 1, current + delta)

		const pages: number[] = [1]
		if (left > 2) pages.push(-1) // ellipsis izquierdo
		for (let i = left; i <= right; i++) pages.push(i)
		if (right < total - 1) pages.push(-2) // ellipsis derecho
		pages.push(total)
		return pages
	})

	protected goTo(page: number): void {
		this.pageChange.emit(page)
		this.router.navigate([], {
			queryParams: { page },
			queryParamsHandling: 'merge',
		})
	}
}
