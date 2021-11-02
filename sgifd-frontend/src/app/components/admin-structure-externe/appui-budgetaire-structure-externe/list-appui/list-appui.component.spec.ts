import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppuiComponent } from './list-appui.component';

describe('ListAppuiComponent', () => {
  let component: ListAppuiComponent;
  let fixture: ComponentFixture<ListAppuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAppuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
