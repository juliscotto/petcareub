import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadmedicalhistoryPage } from './uploadmedicalhistory.page';

describe('UploadmedicalhistoryPage', () => {
  let component: UploadmedicalhistoryPage;
  let fixture: ComponentFixture<UploadmedicalhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadmedicalhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadmedicalhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
