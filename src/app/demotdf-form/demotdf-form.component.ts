import { Component } from '@angular/core';

@Component({
  selector: 'app-demotdf-form',
  templateUrl: './demotdf-form.component.html',
  styleUrls: ['./demotdf-form.component.scss']
})
export class DemotdfFormComponent {


  // Register(demoForm1: any) {
  //   var fn = demoForm1.controls.fname.value;
  //   var ln = demoForm1.controls.lname.value;
  //   var design = demoForm1.controls.designation.value;
  //   console.log(demoForm1);
  // }

  Register2(demoForm2: any) {
    // if (!demoForm2.form.valid) {
    //   alert("Please fill all the fields");
    // }
    // else {
    //   console.log(demoForm2.value);
    // }
    console.log(demoForm2.value);

  }

}
