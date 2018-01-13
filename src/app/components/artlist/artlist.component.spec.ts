import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtlistComponent } from './artlist.component';

describe('ArtlistComponent', () => {
  let component: ArtlistComponent;
  let fixture: ComponentFixture<ArtlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
