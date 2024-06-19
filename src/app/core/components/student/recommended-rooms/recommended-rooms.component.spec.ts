import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedRoomsComponent } from './recommended-rooms.component';

describe('RecommendedRoomsComponent', () => {
  let component: RecommendedRoomsComponent;
  let fixture: ComponentFixture<RecommendedRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
