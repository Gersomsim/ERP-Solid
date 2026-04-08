import { Component, OnDestroy, OnInit, output, input } from '@angular/core'
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs'

import { Icon } from '../../atoms/icon/icon'

@Component({
    selector: 'lib-ui-search-input',
    imports: [Icon],
    templateUrl: './search-input.html',
})
export class SearchInput implements OnInit, OnDestroy {
    placeholder = input<string>('Buscar...')
    debounceMs = input<number>(300)

    search = output<string>()

    protected value = ''
    private input$ = new Subject<string>()

    ngOnInit(): void {
        this.input$
            .pipe(debounceTime(this.debounceMs()), distinctUntilChanged())
            .subscribe(term => this.search.emit(term))
    }

    ngOnDestroy(): void {
        this.input$.complete()
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
