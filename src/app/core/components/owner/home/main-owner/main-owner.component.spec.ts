import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOwnerComponent } from './main-owner.component';

describe('MainOwnerComponent', () => {
  let component: MainOwnerComponent;
  let fixture: ComponentFixture<MainOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
