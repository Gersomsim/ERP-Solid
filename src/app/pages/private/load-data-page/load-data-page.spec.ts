import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataPage } from './load-data-page';

describe('LoadDataPage', () => {
  let component: LoadDataPage;
  let fixture: ComponentFixture<LoadDataPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadDataPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadDataPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
