import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalBannerComponent } from './seasonal-banner.component';

describe('SeasonalBannerComponent', () => {
  let component: SeasonalBannerComponent;
  let fixture: ComponentFixture<SeasonalBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonalBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonalBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
