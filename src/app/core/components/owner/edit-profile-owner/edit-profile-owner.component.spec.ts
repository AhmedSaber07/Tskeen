import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileOwnerComponent } from './edit-profile-owner.component';

describe('EditProfileOwnerComponent', () => {
  let component: EditProfileOwnerComponent;
  let fixture: ComponentFixture<EditProfileOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProfileOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
