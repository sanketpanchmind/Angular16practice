import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveformComponent } from './reactiveform.component';
import { ReactiveFormsModule } from '@angular/forms';   // 👈 add this


fdescribe('ReactiveformComponent', () => {
  let component: ReactiveformComponent;
  let fixture: ComponentFixture<ReactiveformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveformComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(ReactiveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 controls', () => {
    expect(component.registerForm.contains('fullname')).toBeTrue();
    expect(component.registerForm.contains('gender')).toBeTrue();
    expect(component.registerForm.contains('activity')).toBeTrue();
  });

  it('should have fullname required', () => {
    const control = component.registerForm.get('fullname');
    control?.setValue('');
    expect(control?.valid).toBeFalse();

    control?.setValue('Sanket P');
    expect(control?.valid).toBeTrue();
  });

  it('should have gender required', () => {
    const control = component.registerForm.get('gender');
    expect(control).toBeTruthy();

    control?.setValue('Male');
    expect(control?.valid).toBeTrue();

    control?.setValue('Female');
    expect(control?.valid).toBeTrue();
  });

  it('should call console with form controls when post data invoked', () => {
    const spy = spyOn(console, 'log');
    component.registerForm.patchValue({
      fullname: 'Bob',
      gender: 'Male',
      activity: 'In Door'
    });
    component.postdata(component.registerForm);

    expect(spy).toHaveBeenCalledWith(component.registerForm.controls);
  })
});
