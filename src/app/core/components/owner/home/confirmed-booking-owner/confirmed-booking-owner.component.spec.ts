import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedBookingOwnerComponent } from './confirmed-booking-owner.component';

describe('ConfirmedBookingOwnerComponent', () => {
  let component: ConfirmedBookingOwnerComponent;
  let fixture: ComponentFixture<ConfirmedBookingOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedBookingOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmedBookingOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
