import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalStudentComponent } from './personal-student.component';

describe('PersonalStudentComponent', () => {
  let component: PersonalStudentComponent;
  let fixture: ComponentFixture<PersonalStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
