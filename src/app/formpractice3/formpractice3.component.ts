import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-formpractice3',
  templateUrl: './formpractice3.component.html',
  styleUrls: ['./formpractice3.component.scss']
})
export class Formpractice3Component {

  registerform: FormGroup | any;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.registerform = this.fb.group({
      fullname: new FormControl(),
      skills: new FormArray([
        new FormControl(),
      ]),
      address: new FormArray([
        new FormGroup({
          landmark: new FormControl(),
          street: new FormControl(),
          city: new FormControl()
        }),
      ]),
    })
  }


  register() {
    console.log(this.registerform.value);
  }

  remove(id: any) {
    (<FormArray>this.registerform.get('skills')).removeAt(id);
  }
  addskill() {
    (<FormArray>this.registerform.get('skills')).push(new FormControl());
  }


  addNewAddr() {
    const newaddr = new FormGroup({
      landmark: new FormControl(),
      street: new FormControl(),
      city: new FormControl()
    });
    (<FormArray>this.registerform.get('address')).push(newaddr);
  }
}
