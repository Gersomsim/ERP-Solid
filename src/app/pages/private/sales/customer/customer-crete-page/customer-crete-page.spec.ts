import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCretePage } from './customer-crete-page';

describe('CustomerCretePage', () => {
  let component: CustomerCretePage;
  let fixture: ComponentFixture<CustomerCretePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCretePage],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCretePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
