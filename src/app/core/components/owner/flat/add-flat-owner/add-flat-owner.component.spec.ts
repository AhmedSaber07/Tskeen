import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlatOwnerComponent } from './add-flat-owner.component';

describe('AddFlatOwnerComponent', () => {
  let component: AddFlatOwnerComponent;
  let fixture: ComponentFixture<AddFlatOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFlatOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFlatOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
