import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBuildingOwnerComponent } from './home-building-owner.component';

describe('HomeBuildingOwnerComponent', () => {
  let component: HomeBuildingOwnerComponent;
  let fixture: ComponentFixture<HomeBuildingOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBuildingOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeBuildingOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
