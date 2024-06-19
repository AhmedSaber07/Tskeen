import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireStudentComponent } from './questionnaire-student.component';

describe('QuestionnaireStudentComponent', () => {
  let component: QuestionnaireStudentComponent;
  let fixture: ComponentFixture<QuestionnaireStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionnaireStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
