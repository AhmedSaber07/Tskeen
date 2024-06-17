import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRoomOwnerComponent } from './home-room-owner.component';

describe('HomeRoomOwnerComponent', () => {
  let component: HomeRoomOwnerComponent;
  let fixture: ComponentFixture<HomeRoomOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRoomOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeRoomOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
