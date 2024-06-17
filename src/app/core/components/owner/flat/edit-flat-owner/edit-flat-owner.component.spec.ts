import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlatOwnerComponent } from './edit-flat-owner.component';

describe('EditFlatOwnerComponent', () => {
  let component: EditFlatOwnerComponent;
  let fixture: ComponentFixture<EditFlatOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFlatOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFlatOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
