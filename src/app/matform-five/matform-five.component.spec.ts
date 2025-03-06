import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatformFiveComponent } from './matform-five.component';

describe('MatformFiveComponent', () => {
  let component: MatformFiveComponent;
  let fixture: ComponentFixture<MatformFiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatformFiveComponent]
    });
    fixture = TestBed.createComponent(MatformFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
