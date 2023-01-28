import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGrievenceComponent } from './customer-grievence.component';

describe('CustomerGrievenceComponent', () => {
  let component: CustomerGrievenceComponent;
  let fixture: ComponentFixture<CustomerGrievenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGrievenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGrievenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
