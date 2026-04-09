import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAgentListPage } from './sale-agent-list-page';

describe('SaleAgentListPage', () => {
  let component: SaleAgentListPage;
  let fixture: ComponentFixture<SaleAgentListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleAgentListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleAgentListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
