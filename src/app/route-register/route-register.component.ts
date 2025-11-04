import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteregisterService } from '../service/routeregister.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddRouteComponent } from './add-route/add-route.component';

@Component({
  selector: 'app-route-register',
  templateUrl: './route-register.component.html',
  styleUrls: ['./route-register.component.scss']
})
export class RouteRegisterComponent {

  routeRegisterFilterForm!: FormGroup;
  organizationArray: any[] = [];
  unitArray: any[] = [];
  routetypeArray: any[] = [];
  routeListArray: any[] = [];
  displayedColumns: string[] = ['srno', 'organizationName','unitName','routeCode','routeName','routeType', 'action'];
  dataSource = new MatTableDataSource<any>([]);
@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private routeregisterservice: RouteregisterService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ){

  }
  ngOnInit(){
    this.filterform();
    this.OrganizationLists();
    this.routetypes();
  }
ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  filterform(){
   this.routeRegisterFilterForm = this.fb.group({
      organization: ['', Validators.required],
      unit: [''],
      routetype:[''],
      searchRouteName: ['']
    })
  }

  OrganizationLists(){
    this.routeregisterservice.getOrganization().subscribe({
      next: (res: any) => {
        console.log("org - ", res.responseData);
        if(res.statusCode == 200){
          this.organizationArray = res.responseData;
          this.routeregisterservice.statusMessage(res.statusMessage, 0);
        }
      },
      error: (error: any) => {
        console.log("error - ", error);
        this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }

  onOrganizationChange(orgId: number)
  {
    orgId = this.routeRegisterFilterForm.value.organization; 
    this.routeregisterservice.getUnits(orgId).subscribe({
      next: (res: any) => {
        if(res.statusCode == 200) {
          this.unitArray = res.responseData;
          // this.routeregisterservice.statusMessage(res.statusMessage, 0);
          this.routeRegisterFilterForm.patchValue({ unit: '' });
        }
      }, 
      error: (error: any) => {
        console.log("error - ", error);
        // this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }

  routetypes(){
    this.routeregisterservice.getRouteType().subscribe({
      next: (res: any) => {
        if(res.statusCode == 200) {
          this.routetypeArray = res.responseData;
        }
      },
       error: (error: any) => {
        console.log("error - ", error);
        // this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }


  getFilteredData(){
    console.log(this.routeRegisterFilterForm.value);
    const orgId = this.routeRegisterFilterForm.value.organization;
    const unitId = this.routeRegisterFilterForm.value.unit || 0;
    const routetypeId = this.routeRegisterFilterForm.value.routetype || 0;
    const search = this.routeRegisterFilterForm.value.searchRouteName || '';

    this.routeregisterservice.getRouteLists(orgId, unitId, routetypeId,search).subscribe({
      next: (res: any) => {
        if(res.statusCode == 200) {
          console.log("route list - ", this.routeListArray);
          this.dataSource.data = res.responseData;
          this.routeregisterservice.statusMessage(res.statusMessage, 0);
        }
      },
      error: (error: any) => {
        this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }

  addroute(){
    this.dialog.open(AddRouteComponent,{
      width: '900px'
    })
  }

  view(element: any){
    // console.log("view - ", element);
    this.dialog.open(AddRouteComponent,{
      width: '900px',
      data: element
    })
  }

  delete(element: any){
    console.log("delete - ", element);

    this.routeregisterservice.deleteroute(element.id).subscribe({
      next: (res: any) => {
        this.routeregisterservice.statusMessage(res.statusMessage, 0);
        this.getFilteredData();
      },
      error: (error: any) => {
        this.routeregisterservice.statusMessage(error.statusMessage, 0);
      }
    });
  }
}
