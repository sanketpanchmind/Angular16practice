import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MasterService } from 'src/app/service/master.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent {

  addbanksform: FormGroup | any;
  organizationArr: any[] = [];
  editflag: boolean = false;
  myControl = new FormControl('');

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<any[]>;


  constructor(private fb: FormBuilder, public dialog: MatDialog, private masterService: MasterService, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getAllorganization();
    if (this.data) {
      this.editflag = true;
      this.addbanksform.patchValue({
        organizationname: this.data.orgId,
        bankname: this.data.bankname,
        id: this.data.id
      });
    } else {
      console.error("Error: this.data is null or undefined.");
    }


    console.log("modal opened - ", this.data);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.organizationArr.filter(org =>
      org.organizationName.toLowerCase().includes(filterValue)
    );
  }

  createForm() {
    this.addbanksform = this.fb.group({
      organizationname: new FormControl(),
      bankname: new FormControl()
    })
  }


  getAllorganization() {
    this.masterService.getAllOrganization().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.organizationArr = res.responseData;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  addOrgbanks() {
    console.log("Sending Bank Data:", this.addbanksform.value); // Check form data

    let org = this.addbanksform.get('organizationname')?.value;
    let bankname = this.addbanksform.get('bankname')?.value;
    // let createdBy = 1;

    console.log("Sending Bank Data org :", this.addbanksform.get('organizationname')?.value); // Check form data

    this.masterService.addbanks(org, bankname).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          console.log("Data Inserted");
          this.snackBar.open("New Record Added ","Close",{
            duration: 2000,
            verticalPosition:'top',
            horizontalPosition:'right',
            panelClass: ['snack-success']
          })
        }
      },
      error: (error: any) => {
        console.log("ERROR", error);
      }
    })
    this.dialog.closeAll();
  }

  updatebanks() {

    const selectedId = this.addbanksform.get('organizationname')?.value;
    console.log("Selected Organization ID:", selectedId);


    const params = {
      organizationId: this.addbanksform.get('organizationname')?.value,
      bankname: this.addbanksform.get('bankname')?.value,
      createdBy: 1,
      modifiedBy: 1,
      createdDate: "2025-02-28T17:41:16.367Z",
      modifiedDate: "2025-02-28T17:41:16.367Z",
      isDeleted: false,
      id: this.data.id,
    }

    console.log("update from values --", this.addbanksform.value);
    console.log("params --", params);

    this.masterService.edit(params).subscribe({
      next: (data: any) => {
        console.log("inside update fn --- ", data.responseData);
        // this.addOrgbanks();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
