import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontComponent } from './front.component';

describe('FrontComponent', () => {
  let component: FrontComponent;
  let fixture: ComponentFixture<FrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
