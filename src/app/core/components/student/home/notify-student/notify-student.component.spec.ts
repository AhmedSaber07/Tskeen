import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyStudentComponent } from './notify-student.component';

describe('NotifyStudentComponent', () => {
  let component: NotifyStudentComponent;
  let fixture: ComponentFixture<NotifyStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifyStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
