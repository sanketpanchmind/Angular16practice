import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MasterService } from '../service/master.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBankComponent } from './add-bank/add-bank.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-bank-filter',
  templateUrl: './bank-filter.component.html',
  styleUrls: ['./bank-filter.component.scss']
})
export class BankFilterComponent {

  filterform: FormGroup | any;
  organizationArray: any = [];
  bankmastergetAlltblArr: any = [];
  displayedColumns: string[] = ['sn', 'organizationName', 'bankName', 'action']; // Define columns

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private masterService: MasterService, public dialog: MatDialog, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.createfilterform();
    this.getAllOrganization();
  }

  createfilterform() {
    this.filterform = this.fb.group({
      organizationname: new FormControl('', [Validators.required]),
      search: new FormControl()
    })
  }

  get f() {
    return this.filterform.controls;
  }

  addbank() {
    this.dialog.open(AddBankComponent, {
      width: '40%'
    })
  }

  getAllOrganization() {
    this.masterService.getAllOrganization().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          // console.log("id -- ", res.responseData.id);
          this.organizationArray = res.responseData;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  submitfilter() {
    const userId = 1; // Example UserId
    const orgId = this.filterform.get('organizationname')?.value;
    const bank = this.filterform.get('search')?.value;

    if (!orgId) {
      console.error('Invalid Organization ID:', orgId);
      return;
    }

    console.log(userId, orgId);


    this.masterService.bankmastergetAll(orgId, bank).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        if (res.statusCode == 200) {
          this.bankmastergetAlltblArr = res.responseData;
          this.bankmastergetAlltblArr.paginator = this.paginator;
          this.snackBar.open("Data Fetched Successfully", 'Close', {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snack-success'] // Optional for custom styling
          });
        }
      },
      error: (err: any) => {
        console.error('API Error:', err);
      }
    });
  }
  clear() {
    this.filterform.reset();
    this.bankmastergetAlltblArr = [];
  }

  deletebankdata(id: any) {

    const orgId = this.filterform.get('organizationname')?.value;
    const bank = this.filterform.get('search')?.value;
    console.log("ID to be deleted --- ", id);
  
    debugger;
    const params = { id: id };

    this.masterService.deletebank(params).subscribe({
      next: (data: any) => {
      debugger;
        console.log("deleting ID - ", data);
        this.submitfilter();
        debugger;
        this.snackBar.open("Data Deleteed Successfully", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snack-danger'],
        });

      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  editbankdata(id: any) {
    console.log("edit id", id);

    console.log(this.bankmastergetAlltblArr);

    const selectedbank = this.bankmastergetAlltblArr.find((item: any) => item.id === id);
    console.log(selectedbank);

    const rowdt = {
      id: selectedbank.id,
      orgId: selectedbank.organizationId,
      org: selectedbank.organizationName,
      bankname: selectedbank.bankName
    };

    console.log("rowdt --", rowdt);

    this.dialog.open(AddBankComponent, {
      width: '40%',
      data: rowdt
    })

  }

}
