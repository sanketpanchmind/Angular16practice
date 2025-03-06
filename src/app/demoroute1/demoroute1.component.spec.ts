import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoroute1Component } from './demoroute1.component';

describe('Demoroute1Component', () => {
  let component: Demoroute1Component;
  let fixture: ComponentFixture<Demoroute1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Demoroute1Component]
    });
    fixture = TestBed.createComponent(Demoroute1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
