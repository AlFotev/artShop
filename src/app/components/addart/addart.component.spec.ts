import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddartComponent } from './addart.component';

describe('AddartComponent', () => {
  let component: AddartComponent;
  let fixture: ComponentFixture<AddartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
