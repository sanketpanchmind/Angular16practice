import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-matform-five',
  templateUrl: './matform-five.component.html',
  styleUrls: ['./matform-five.component.scss']
})
export class MatformFiveComponent implements OnInit {

  userForm: FormGroup | any;

  userFormObj = {
    id: 0,
    name: '',
    mobno: '',
    street: '',
    city: '',
    gender: '',
    languages: ''
  }

  userFormArr: any[] = [];


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {

    const localdata = localStorage.getItem('user');

    if (localdata !== null) {
      const parsedata = JSON.parse(localdata);
      this.userFormObj.id = 1;
      this.userFormArr = parsedata;
      this.userFormArr.forEach((element: any, i: number) => {
        console.log(i, element);
      });

      localStorage.setItem('user', JSON.stringify(this.userFormArr));
    }

  }


  createForm() {
    this.userForm = this.fb.group({
      name: new FormControl,
      mobno: new FormArray([
        new FormControl(),
      ]),
      address: new FormArray([
        new FormGroup({
          street: new FormControl(),
          city: new FormControl(),
        }),
      ]),
      gender: new FormControl(),
      languages: new FormControl(),
    })
  }

  addno() {
    (<FormArray>this.userForm.get('mobno')).push(new FormControl());
  }
  deleteno(id: any) {
    (<FormArray>this.userForm.get('mobno')).removeAt(id);
  }

  addAddress() {
    const newAddr = new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
    });
    (<FormArray>this.userForm.get('address')).push(newAddr);
  }

  saveuser() {
    console.log(this.userForm.value);
    const localdata = localStorage.getItem('user');

    const formdata = this.userForm.value;

    if (localdata == null) {
      this.userFormObj.id = 1;
      this.userFormObj = { ...formdata };
      this.userFormArr.push(this.userFormObj);

      localStorage.setItem('user', JSON.stringify(this.userFormArr));
      console.log("Initial data done")
    }
    else {


      const index = this.userFormArr.find((x: any) => x.name == formdata.name);

      if (!index) {
        const parsedata = JSON.parse(localdata);
        this.userFormObj.id = parsedata.length + 1;
        this.userFormObj = { ...formdata };
        this.userFormArr.push(this.userFormObj);

        localStorage.setItem('user', JSON.stringify(this.userFormArr));
        console.log("Inserted into existing data done")
      }

      else {
        console.log("data already exists");
        window.alert("data exists");
      }

    }

  }

  editRec(user: any) {
    console.log(user);
    const localdata = localStorage.getItem('user');


    if (localdata != null) {
      const parsedata = JSON.parse(localdata);
      const editdata = parsedata.find((x: any) => x.id == user);

      console.log(editdata);

      this.userForm.patchValue({
        name: editdata.name,
        mobno: editdata.mobno,
        gender: editdata.gender,
        languages: editdata.languages
      });

    }

  }




  deleteRec(user: number) {
    console.log(user);

    const index = this.userFormArr.findIndex((x: any) => x.id == user);
    this.userFormArr.splice(index, 1);

    localStorage.setItem('user', JSON.stringify(this.userFormArr));
  }
}
