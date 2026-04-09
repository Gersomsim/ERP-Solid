import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAgentDetailPage } from './sale-agent-detail-page';

describe('SaleAgentDetailPage', () => {
  let component: SaleAgentDetailPage;
  let fixture: ComponentFixture<SaleAgentDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleAgentDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleAgentDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
