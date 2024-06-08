import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordOwnerComponent } from './change-password-owner.component';

describe('ChangePasswordOwnerComponent', () => {
  let component: ChangePasswordOwnerComponent;
  let fixture: ComponentFixture<ChangePasswordOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePasswordOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
