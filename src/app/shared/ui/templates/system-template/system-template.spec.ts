import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTemplate } from './system-template';

describe('SystemTemplate', () => {
  let component: SystemTemplate;
  let fixture: ComponentFixture<SystemTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
