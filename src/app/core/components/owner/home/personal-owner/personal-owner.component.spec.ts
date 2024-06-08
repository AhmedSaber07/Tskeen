import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOwnerComponent } from './personal-owner.component';

describe('PersonalOwnerComponent', () => {
  let component: PersonalOwnerComponent;
  let fixture: ComponentFixture<PersonalOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
