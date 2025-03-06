import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-formspracticetwo',
  templateUrl: './formspracticetwo.component.html',
  styleUrls: ['./formspracticetwo.component.scss']
})
export class FormspracticetwoComponent {
  // 7039174212 sai ganesh tours

  userForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullname: new FormControl('', [Validators.required]),
      designation: new FormControl(),
      mobno: new FormArray([
        new FormControl(),
      ]),
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
      }),
    })
  }

  ngOnInit() {

  }

  saveuser() {
    console.log(this.userForm.value);
  }
  addMobileNum() {
    (<FormArray>this.userForm.get('mobno')).push(new FormControl());
  }
  removenum(ctrl: any) {
    (<FormArray>this.userForm.get('mobno')).removeAt(ctrl);
  }

}
