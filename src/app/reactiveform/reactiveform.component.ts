import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.scss']
})
export class ReactiveformComponent {


  registerForm: FormGroup;

  fullname: string = '';
  gender: string = '';
  activity: string = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullname: new FormControl('', [Validators.required]),
      gender: new FormControl(),
      activity: new FormControl(),
    });
  }


  postdata(registerForm: any) {
    console.log(registerForm.controls);
  }
}
