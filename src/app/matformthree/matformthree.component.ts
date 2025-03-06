import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-matformthree',
  templateUrl: './matformthree.component.html',
  styleUrls: ['./matformthree.component.scss']
})
export class MatformthreeComponent {

  registeruser: FormGroup | any;
  registeruserobj = {
    id: 0,
    name: '',
    gender: '',
    language: ''
  }

  constructor(private fb: FormBuilder) {
    this.registeruser = this.fb.group({
      name: new FormControl(),
      gender: new FormControl(),
      language: new FormControl(),
    })
  }
  ngOnInit() {
    const localdata = localStorage.getItem('registeruser');


    if (localdata != null) {
      const parsedata = JSON.parse(localdata);
      this.registeruserobj.id = 1;
      this.userArr.push(this.registeruserobj);
      parsedata.forEach((element: any, i: number) => {
        // console.log(i, element);
        this.userArr = parsedata;
      });
    }
  }

  genders: string[] = ['Male', 'Female'];
  languages: string[] = ['Angular', 'React', 'Vue', 'C#', 'SQL'];
  userArr: any[] = [];


  savedata() {
    // console.log(this.registeruser.value)

    const formdata = this.registeruser.value;

    const localdata = localStorage.getItem('registeruser');

    if (!this.userArr) {
      this.userArr = [];
    }

    if (localdata == null) {
      this.registeruserobj.id = 1;
      this.registeruserobj = { ...formdata };
      this.userArr.push(this.registeruserobj);

      localStorage.setItem('registeruser', JSON.stringify(this.userArr));
    }
    else {
      const parsedata = JSON.parse(localdata);

      const ispresent = parsedata.find((x: any) => x.name === formdata.name);
      // console.log(ispresent);

      if (ispresent) {
        alert("name already present");
      }
      else {
        this.registeruserobj.id = parsedata.length + 1;
        this.registeruserobj = { ...formdata };
        this.userArr.push(this.registeruserobj);

        localStorage.setItem('registeruser', JSON.stringify(this.userArr));
      }



    }
    this.registeruser.reset();
    console.log("Data Saved");
  }


  delete(ud: number) {
    // console.log(ud);

    const localdata = localStorage.getItem('registeruser');

    // if (localdata) {
    //   const parsedata = JSON.parse(localdata);
    //   console.log(parsedata);

    //   const index = parsedata.findIndex((x: any) => x.id === ud);
    //   console.log(index);
    //   if (index != -1) {
    //     parsedata.splice(index, 1);

    //     localStorage.setItem('registeruser', JSON.stringify(parsedata));
    //   }
    // }

    console.log(ud);
    const index = this.userArr.findIndex((x: any) => x.id === ud);
    this.userArr.splice(index, 1);

    localStorage.setItem('registeruser', JSON.stringify(this.userArr));

  }
}
