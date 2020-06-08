import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTrackingComponent } from './review-tracking.component';

describe('ReviewTrackingComponent', () => {
  let component: ReviewTrackingComponent;
  let fixture: ComponentFixture<ReviewTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
