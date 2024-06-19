import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegisterStudentComponent } from './confirm-register-student.component';

describe('ConfirmRegisterStudentComponent', () => {
  let component: ConfirmRegisterStudentComponent;
  let fixture: ComponentFixture<ConfirmRegisterStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRegisterStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmRegisterStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
