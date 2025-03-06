import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angpractice1Component } from './angpractice1.component';

describe('Angpractice1Component', () => {
  let component: Angpractice1Component;
  let fixture: ComponentFixture<Angpractice1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Angpractice1Component]
    });
    fixture = TestBed.createComponent(Angpractice1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
