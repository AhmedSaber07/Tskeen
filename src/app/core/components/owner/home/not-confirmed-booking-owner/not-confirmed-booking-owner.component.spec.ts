import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotConfirmedBookingOwnerComponent } from './not-confirmed-booking-owner.component';

describe('NotConfirmedBookingOwnerComponent', () => {
  let component: NotConfirmedBookingOwnerComponent;
  let fixture: ComponentFixture<NotConfirmedBookingOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotConfirmedBookingOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotConfirmedBookingOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
