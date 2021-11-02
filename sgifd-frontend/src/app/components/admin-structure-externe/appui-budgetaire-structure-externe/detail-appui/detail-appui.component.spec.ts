import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAppuiComponent } from './detail-appui.component';

describe('DetailAppuiComponent', () => {
  let component: DetailAppuiComponent;
  let fixture: ComponentFixture<DetailAppuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAppuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAppuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
