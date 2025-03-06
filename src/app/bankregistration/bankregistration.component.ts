import { BankregisterService } from './../service/bankregister.service';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddbankComponent } from './addbank/addbank.component';


@Component({
  selector: 'app-bankregistration',
  templateUrl: './bankregistration.component.html',
  styleUrls: ['./bankregistration.component.scss']
})
export class BankregistrationComponent {

  /**
   *
   */
  bankregistration: FormGroup | any;

  constructor(private bankservice: BankregisterService, private fb: FormBuilder, private dialog: MatDialog) {
    console.log(this.organizationlistArr); // Check the data being populated in the dropdown.

  }

  ngOnInit() {
    this.createForm();
    this.getorganizationlistFn();
  }

  organizationlistArr: any[] = [];

  tblistArr: any[] = [];

  displayedColumns: any[] = ['srno', 'organizationName', 'bankName', 'action'];


  ondelete(id: number, orgname: string) {
    console.log("rec to be deleted", id, orgname);

    this.bankservice.deletedata(id, orgname).subscribe({
      next: (data) => {
        console.log("record deleted", data);
      },
      error: (error) => {
        console.log("error", error);
      }
    })



  }

  createForm() {
    this.bankregistration = this.fb.group({
      organization: new FormControl('', [Validators.required]),
      search: new FormControl(''),
    })
  }

  getorganizationlistFn() {
    this.bankservice.getorganizationlist().subscribe({
      next: (data) => {
        console.log("got org list", data.responseData);
        this.organizationlistArr = data.responseData;
      },
      error: (errors) => {
        console.log("error");
      }
    });
  }

  gettabledata() {

    let orgId = this.bankregistration.get('organization')?.value; // Get selected orgId from form
    let search = this.bankregistration.get('search')?.value || '';

    console.log("Selected OrgId:", orgId);
    console.log("Search Text:", search);

    if (!orgId || isNaN(orgId)) {
      console.error("Invalid OrgId:", orgId);
      return; // Stop execution if OrgId is invalid
    }
    else {


      this.bankservice.gettbldata(orgId, search).subscribe({
        next: (data) => {
          console.log("data =======> ", data);
          this.tblistArr = data.responseData;
        },
        error: (error) => {
          console.log("errors");
        }
      })
    }
  }

  addbankfn() {
    const dialogRef = this.dialog.open(AddbankComponent, {
      width: '40%'
    });
  }

  onEditdata(id: any, organizationName: string, bankName: string) {
    console.log("update id", id);
    const dialogRef = this.dialog.open(AddbankComponent, {
      width: '40%',
      data: { id, organizationName, bankName }
    });

    console.log("without modal data = ", id, organizationName, bankName);

  }

}
