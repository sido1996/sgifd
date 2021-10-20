import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPtfFournisseurComponent } from './detail-ptf-fournisseur.component';

describe('DetailPtfFournisseurComponent', () => {
  let component: DetailPtfFournisseurComponent;
  let fixture: ComponentFixture<DetailPtfFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPtfFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPtfFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
