import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAgentCreatePage } from './sale-agent-create-page';

describe('SaleAgentCreatePage', () => {
  let component: SaleAgentCreatePage;
  let fixture: ComponentFixture<SaleAgentCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleAgentCreatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleAgentCreatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
