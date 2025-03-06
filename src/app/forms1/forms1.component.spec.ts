import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forms1Component } from './forms1.component';

describe('Forms1Component', () => {
  let component: Forms1Component;
  let fixture: ComponentFixture<Forms1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Forms1Component]
    });
    fixture = TestBed.createComponent(Forms1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
