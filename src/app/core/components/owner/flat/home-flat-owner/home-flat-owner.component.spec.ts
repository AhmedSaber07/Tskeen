import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFlatOwnerComponent } from './home-flat-owner.component';

describe('HomeFlatOwnerComponent', () => {
  let component: HomeFlatOwnerComponent;
  let fixture: ComponentFixture<HomeFlatOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFlatOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFlatOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
