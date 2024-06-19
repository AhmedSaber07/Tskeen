import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailsStudentComponent } from './room-details-student.component';

describe('RoomDetailsStudentComponent', () => {
  let component: RoomDetailsStudentComponent;
  let fixture: ComponentFixture<RoomDetailsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetailsStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomDetailsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
