import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomOwnerComponent } from './add-room-owner.component';

describe('AddRoomOwnerComponent', () => {
  let component: AddRoomOwnerComponent;
  let fixture: ComponentFixture<AddRoomOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoomOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRoomOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
