import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formpractice3Component } from './formpractice3.component';

describe('Formpractice3Component', () => {
  let component: Formpractice3Component;
  let fixture: ComponentFixture<Formpractice3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Formpractice3Component]
    });
    fixture = TestBed.createComponent(Formpractice3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
