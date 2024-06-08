import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuildingOwnerComponent } from './edit-building-owner.component';

describe('EditBuildingOwnerComponent', () => {
  let component: EditBuildingOwnerComponent;
  let fixture: ComponentFixture<EditBuildingOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBuildingOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBuildingOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
