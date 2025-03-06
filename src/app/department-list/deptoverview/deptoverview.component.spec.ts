import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptoverviewComponent } from './deptoverview.component';

describe('DeptoverviewComponent', () => {
  let component: DeptoverviewComponent;
  let fixture: ComponentFixture<DeptoverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptoverviewComponent]
    });
    fixture = TestBed.createComponent(DeptoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
