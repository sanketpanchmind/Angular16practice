import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankregisterService } from 'src/app/service/bankregister.service';

@Component({
  selector: 'app-addbank',
  templateUrl: './addbank.component.html',
  styleUrls: ['./addbank.component.scss']
})
export class AddbankComponent {

  addbankform: FormGroup | any;

  organizationArr: any[] = [];

  constructor(private bankservice: BankregisterService, private httpclient: HttpClient, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(this.data.organizationName, this.data.bankName);

  }

  ngOnInit() {
    this.addbankFormCtrl();
    this.getorganizationdata();
    if (this.data) {
      this.onEditmodal();
    }
  }

  addbankFormCtrl() {
    this.addbankform = this.fb.group({
      organization: new FormControl('', [Validators.required]),
      bankname: new FormControl('', [Validators.required])
    });
  }

  getorganizationdata() {
    this.bankservice.getorganizationlist().subscribe({
      next: (data) => {
        this.organizationArr = data.responseData;
      },
      error: (error) => {
        console.log("error", error);
      }
    });
  }

  submitnewbank() {

    let orgId = this.addbankform.get('organization')?.value;
    let bankname = this.addbankform.get('bankname')?.value;


    console.log(orgId, bankname);

    this.bankservice.registernewBank(orgId, bankname).subscribe({
      next: (data) => {
        console.log("add bank data", data)

      },
      error: (error) => [
        console.log(error),
      ]
    })
  }

  onEditmodal() {
    let orgId = this.data.organizationName;
    let bankname = this.data.bankName;
    let id = this.data.id;

    console.log("inside modal data => ", id, orgId, bankname);
    if (this.data) {
      this.addbankform.patchValue({
        organization: orgId,
        bankname: bankname
      });
    }
  }


}
