import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-matformfour',
  templateUrl: './matformfour.component.html',
  styleUrls: ['./matformfour.component.scss']
})
export class MatformfourComponent {

  registeruser: FormGroup | any;

  registeruserobj = {
    id: 0,
    name: '',
    mobno: '',
    gender: '',
    languages: ''
  }
  registeruserArr: any[] = [];

  constructor(private fb: FormBuilder) {
    this.registeruser = this.fb.group({
      name: new FormControl(),
      mobno: new FormControl(),
      gender: new FormControl(),
      languages: new FormControl(),

    })
  }
  ngOnInit() {

    const localdata = localStorage.getItem('registeruser');


    if (localdata != null) {
      const parsedata = JSON.parse(localdata);
      this.registeruserobj.id = 1;
      this.registeruserArr.push(this.registeruserobj);
      this.registeruserArr = parsedata;

      parsedata.forEach((element: any, i: number) => {
        this.registeruserArr = parsedata;
      });

    }
  }

  saveuser() {
    console.log(this.registeruser.value);

    const localdata = localStorage.getItem('registeruser');

    const formdata = this.registeruser.value;

    if (!this.registeruserArr) {
      this.registeruserArr = [];
    }

    if (localdata == null) {
      this.registeruserobj.id = 1;
      this.registeruserobj = { ...formdata };
      this.registeruserArr.push(this.registeruserobj);

      localStorage.setItem('registeruser', JSON.stringify(this.registeruserArr));
    }
    else {
      const parsedata = JSON.parse(localdata);

      this.registeruserobj.id = parsedata.length + 1;
      this.registeruserobj = { ...formdata };
      this.registeruserArr.push(this.registeruserobj);
      localStorage.setItem('registeruser', JSON.stringify(this.registeruserArr));

    }
    this.registeruser.reset();
  }
  deleteRecord(user: number) {
    console.log(user);

    const index = this.registeruserArr.findIndex((x: any) => x.id == user);
    this.registeruserArr.splice(index, 1);

    localStorage.setItem('registeruser', JSON.stringify(this.registeruserArr));

  }
}
