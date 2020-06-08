import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorCategoriesComponent } from './major-categories.component';

describe('MajorCategoriesComponent', () => {
  let component: MajorCategoriesComponent;
  let fixture: ComponentFixture<MajorCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
