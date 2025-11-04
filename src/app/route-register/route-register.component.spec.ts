import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteRegisterComponent } from './route-register.component';

describe('RouteRegisterComponent', () => {
  let component: RouteRegisterComponent;
  let fixture: ComponentFixture<RouteRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouteRegisterComponent]
    });
    fixture = TestBed.createComponent(RouteRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
