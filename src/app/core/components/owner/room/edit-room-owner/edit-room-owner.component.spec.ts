import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomOwnerComponent } from './edit-room-owner.component';

describe('EditRoomOwnerComponent', () => {
  let component: EditRoomOwnerComponent;
  let fixture: ComponentFixture<EditRoomOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRoomOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRoomOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
