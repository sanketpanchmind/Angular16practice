import { MatDialog } from '@angular/material/dialog';
import { BanksService } from './../service/banks.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AddbanksComponent } from './addbanks/addbanks.component';

@Component({
  selector: 'app-bankregister',
  templateUrl: './bankregister.component.html',
  styleUrls: ['./bankregister.component.scss']
})
export class BankregisterComponent implements OnInit {

  bankregisterform: FormGroup | any;

  organizationArr: any[] = [];
  bankregisterlist: any[] = [];
  displayedColumns: any[] = ['srno', 'organizationName', 'bankName', 'action'];

  constructor(private fb: FormBuilder, private bkservice: BanksService, private dialog: MatDialog) { }

  ngOnInit() {
    this.createform();
    this.organizationlist();
  }

  createform() {
    this.bankregisterform = this.fb.group({
      organization: new FormControl('', [Validators.required]),
      search: new FormControl()
    });
  }

  onEdit(id: any, organizationName: number, bankName: string) {
    console.log("id =>", id);
    this.dialog.open(AddbanksComponent, {
      width: '40%',
      data: { id, organizationName, bankName }
    })
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
    console.log(this.bankregisterform.value);

    let orgId = this.bankregisterform.get('organization')?.value;
    let search = this.bankregisterform.get('search')?.value || '';

    this.bkservice.bankregisterlist(orgId, search).subscribe({
      next: (data) => {
        console.log("data fetched", data.responseData);
        this.bankregisterlist = data.responseData;
        console.log(this.bankregisterlist);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  registernewbank() {
    this.dialog.open(AddbanksComponent, {
      width: '40%',
    })
  }

  deletedata(id: any) {
    let orgId = this.bankregisterform.get('organization')?.value.toString();

    console.log("Attempting to delete - ID:", id, "OrgID:", orgId);

    this.bkservice.deletefn(id, orgId).subscribe({
      next: (data) => {
        console.log("id to b deleted", data);
        console.log("id, orgid", id, orgId);
      },
      error: (error) => {
        console.log("error", error);
      }
    })

  }
}
