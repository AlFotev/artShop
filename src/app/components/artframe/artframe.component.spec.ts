import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtframeComponent } from './artframe.component';

describe('ArtframeComponent', () => {
  let component: ArtframeComponent;
  let fixture: ComponentFixture<ArtframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
