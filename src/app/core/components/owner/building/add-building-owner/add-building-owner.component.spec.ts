import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuildingOwnerComponent } from './add-building-owner.component';

describe('AddBuildingOwnerComponent', () => {
  let component: AddBuildingOwnerComponent;
  let fixture: ComponentFixture<AddBuildingOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBuildingOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBuildingOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
