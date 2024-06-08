import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyOwnerComponent } from './notify-owner.component';

describe('NotifyOwnerComponent', () => {
  let component: NotifyOwnerComponent;
  let fixture: ComponentFixture<NotifyOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifyOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
