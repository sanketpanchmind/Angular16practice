import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-matformsecond',
  templateUrl: './matformsecond.component.html',
  styleUrls: ['./matformsecond.component.scss']
})
export class MatformsecondComponent {

  registeruser: FormGroup | any;

  registerformobj = {
    id: 0,
    fullname: '',
    gender: '',
    mobno: '',
    media: '',
    address: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  }

  constructor(private fb: FormBuilder) {
    this.registeruser = this.fb.group({
      fullname: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
      gender: new FormControl(),
      mobno: new FormArray([
        new FormControl(),
      ]),
      media: new FormControl(),
      address: new FormArray([
        new FormGroup({
          street: new FormControl(),
          city: new FormControl(),
          state: new FormControl(),
          zip: new FormControl(),
        }),
      ])
    })
  }
  ngOnInit() {

    const localdata = localStorage.getItem('registeruser');


    if (localdata != null) {
      const parsedata = JSON.parse(localdata);
      this.userArr = parsedata;

      this.registerformobj.id = 1;
      this.userArr.forEach((element: any, i: number) => {
        console.log(i, element);
      });
    }
  }

  gender: string[] = ['Male', 'Female'];

  socialmedia: string[] = ['LinkedIn', 'Instagram', 'Facebook', 'Twitter'];

  removemobno(id: any) {
    (<FormArray>this.registeruser.get('mobno')).removeAt(id);
  }
  addmobno() {
    (<FormArray>this.registeruser.get('mobno')).push(new FormControl());
  }
  removeAddr(id: any) {
    (<FormArray>this.registeruser.get('address')).removeAt(id);
  }
  addAddr() {
    const newAddr = new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zip: new FormControl(),
    });
    (<FormArray>this.registeruser.get('address')).push(newAddr);
  }


  userArr: any[] = [];

  saveuser() {
    // console.log(this.registeruser.value);
    // const formData = this.registeruser.value;

    // const localdata = localStorage.getItem('registereduser');

    // if (localdata == null) {
    //   this.registerformobj.id = 1;
    //   this.userArr.push(this.registerformobj);

    //   localStorage.setItem('registeruser', JSON.stringify(this.userArr));
    // }
    // else {
    //   const parsedata = JSON.parse(localdata);
    //   this.registerformobj.id = parsedata.length + 1;
    //   this.userArr = parsedata; // Using existing users

    //   this.userArr.push(this.registerformobj);
    //   localStorage.setItem("registereduser", JSON.stringify(this.userArr));
    // }

    // Get form data
    console.log(this.registeruser.value); // log form data for debugging
    const formData = this.registeruser.value;



    // Retrieve existing data from localStorage
    const localdata = localStorage.getItem('registereduser');

    // Initialize userArr if not already initialized
    if (!this.userArr) {
      this.userArr = [];
    }

    // If no data in localStorage, create a new array
    if (localdata == null) {
      this.registerformobj.id = 1; // First user
      this.registerformobj = { ...formData }; // Assign form data to registerformobj
      this.userArr.push(this.registerformobj);

      // Save to localStorage using the correct key
      localStorage.setItem('registereduser', JSON.stringify(this.userArr));
    }
    else {
      // Parse existing data in localStorage
      const parsedata = JSON.parse(localdata);
      this.registerformobj.id = parsedata.length + 1; // Incremental ID for new user
      this.registerformobj = { ...formData }; // Assign form data to registerformobj
      this.userArr = parsedata; // Using existing users
      this.userArr.push(this.registerformobj);

      // Save the updated array to localStorage
      localStorage.setItem('registereduser', JSON.stringify(this.userArr));
    }

    console.log('User saved successfully:', this.registerformobj);

    this.registeruser.reset();
  }

  getdata() {
    const loadData = localStorage.getItem('registereduser');
    if (loadData) {
      this.userArr = JSON.parse(loadData);
    }
  }
}
