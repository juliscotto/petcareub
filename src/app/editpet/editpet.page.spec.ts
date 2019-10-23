import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpetPage } from './editpet.page';

describe('EditpetPage', () => {
  let component: EditpetPage;
  let fixture: ComponentFixture<EditpetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
