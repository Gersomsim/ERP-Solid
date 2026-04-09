import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAgentEditPage } from './sale-agent-edit-page';

describe('SaleAgentEditPage', () => {
  let component: SaleAgentEditPage;
  let fixture: ComponentFixture<SaleAgentEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleAgentEditPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleAgentEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
