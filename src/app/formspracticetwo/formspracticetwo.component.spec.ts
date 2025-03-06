import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormspracticetwoComponent } from './formspracticetwo.component';

describe('FormspracticetwoComponent', () => {
  let component: FormspracticetwoComponent;
  let fixture: ComponentFixture<FormspracticetwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormspracticetwoComponent]
    });
    fixture = TestBed.createComponent(FormspracticetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
