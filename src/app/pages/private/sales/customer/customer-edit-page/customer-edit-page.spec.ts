import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditPage } from './customer-edit-page';

describe('CustomerEditPage', () => {
  let component: CustomerEditPage;
  let fixture: ComponentFixture<CustomerEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerEditPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
