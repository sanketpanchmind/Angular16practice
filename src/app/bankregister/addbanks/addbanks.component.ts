import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { BanksService } from 'src/app/service/banks.service';

@Component({
  selector: 'app-addbanks',
  templateUrl: './addbanks.component.html',
  styleUrls: ['./addbanks.component.scss']
})
export class AddbanksComponent {

  addbanksform: FormGroup | any;

  organizationArr: any[] = [];
  // @Inject(MAT_DIALOG_DATA) public data: any)

  editflag: boolean = false;

  constructor(private fb: FormBuilder, private bkservice: BanksService, @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(this.data.id, this.data.organizationName, this.data.bankName);

  }

  ngOnInit() {
    this.createform();
    this.organizationlist();
    this.addbanksform.patchValue({
      organization: this.data.organizationName,
      bank: this.data.bankName
    });
    console.log("update form default values ---", this.addbanksform.value);

  }


  EditData() {
    console.log("EditData fn")
    this.editflag = true;
    console.log("inside editdata fn ----", this.data.id, this.data.organizationName, this.data.bankName);
    let id = this.data.id;
    let org = this.addbanksform.get('organization')?.value;
    let bank = this.addbanksform.get('bank')?.value;

    console.log("fetched form values after editing fields - ", id, org, bank);


    this.bkservice.updatedata(id, org, bank).subscribe({
      next: (data) => {
        console.log(id, org, bank);
        console.log("updation attempt =>", data);
      },
      error: (error) => {
        console.log("ERROR", error)
      }
    });
  }

  createform() {
    this.addbanksform = this.fb.group({
      organization: new FormControl(''),
      bank: new FormControl(''),
    });
  }

  organizationlist() {

    this.bkservice.organizationlist().subscribe({
      next: (data) => {
        console.log("Org Data", data.responseData);
        this.organizationArr = data.responseData;
      },
      error: (error) => {
        console.log("error", error);
      }
    });
  }

  submitdata() {
    console.log("submit Data")
    this.editflag = false;
    let orgId = this.addbanksform.get('organization')?.value;
    let bank = this.addbanksform.get('bank')?.value;

    console.log(orgId, bank);
    this.bkservice.addnewbank(orgId, bank).subscribe({
      next: (data) => {
        console.log("data inserted", data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
