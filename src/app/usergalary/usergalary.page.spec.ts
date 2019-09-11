import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergalaryPage } from './usergalary.page';

describe('UsergalaryPage', () => {
  let component: UsergalaryPage;
  let fixture: ComponentFixture<UsergalaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergalaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergalaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
