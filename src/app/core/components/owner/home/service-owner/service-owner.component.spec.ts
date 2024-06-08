import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOwnerComponent } from './service-owner.component';

describe('ServiceOwnerComponent', () => {
  let component: ServiceOwnerComponent;
  let fixture: ComponentFixture<ServiceOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
