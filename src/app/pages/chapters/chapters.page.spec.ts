import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersPage } from './chapters.page';

describe('ChaptersPage', () => {
  let component: ChaptersPage;
  let fixture: ComponentFixture<ChaptersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
