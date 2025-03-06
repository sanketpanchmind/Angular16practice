import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-materialform-practice',
  templateUrl: './materialform-practice.component.html',
  styleUrls: ['./materialform-practice.component.scss']
})
export class MaterialformPracticeComponent {

  registerform: FormGroup | any;


  constructor(private fb: FormBuilder) {
    this.registerform = this.fb.group({
      fullname: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
      gender: new FormControl(),
      status: new FormControl(),
      activity: new FormControl(),
      language: new FormControl(),
      mobno: new FormArray([
        new FormControl(),
      ]),
      address: new FormArray([
        new FormGroup({
          street: new FormControl(),
          city: new FormControl(),
          zip: new FormControl()
        }),
      ])
    });
  }

  ngOnInit() {

  }


  languages: Language[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  genders: Gender[] = [
    { value: 'Male-1', viewValue: 'Male' },
    { value: 'Female-2', viewValue: 'Female' }
  ]

  genders2: string[] = ['Male', 'Female'];
  activity: string[] = ['Indoor', 'OutDoor'];

  register() {
    console.log(this.registerform.value);
  }

  addmobno() {
    (<FormArray>this.registerform.get('mobno')).push(new FormControl());
  }

  addAddress() {
    const newaddr = new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      zip: new FormControl()
    });

    (<FormArray>this.registerform.get('address')).push(newaddr);
  }

}
interface Language {
  value: string;
  viewValue: string;
}

interface Gender {
  value: string;
  viewValue: string;
}