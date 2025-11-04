import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MasterService } from '../service/master.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent {

  filterform: FormGroup | any;
  organizationtblArray: any[] = [];
  unitlistArray: any[] = [];
  categoryArray: any[] = [];
  unitdisabled: boolean = true;
  categorydisabled: boolean = true;


  constructor(private fb: FormBuilder, private masterService: MasterService, private authService: AuthService) {

  }

  ngOnInit() {
    this.createform();
    this.organizationlist();
    const org = this.filterform.get('organizationname')?.value;
    const unit = this.filterform.get('organizationname')?.value;

    if (org) {
      this.unitdisabled = false;
    }
    this.unitdisabled = true;

    if (unit) {
      this.categorydisabled = false;
    }
    this.categorydisabled = true;
  }

  createform() {
    this.filterform = this.fb.group({
      organizationname: new FormControl(''),
      unitname: new FormControl(''),
      categoryname: new FormControl(''),
      search: new FormControl('')
    })
  }

  organizationlist() {
    this.masterService.getAllOrganization().subscribe({
      next: (res: any) => {
        console.log(res.responseData);
        this.organizationtblArray = res.responseData;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  unitlist() {
    console.log("unit triggered");
    const selectedunitId = this.filterform.get('organizationname')?.value;

    if (!selectedunitId) {
      this.unitlistArray = [];
      return;
    }
    const params = {
      OrganizationId: selectedunitId,
      UserId: 1
    }
    console.log('Fetching units for:', params);

    this.masterService.getAllUnits(params).subscribe({
      next: (res: any) => {
        console.log(res.responseData);
        this.unitlistArray = res.responseData;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  categorylist() {
    console.log("category triggered");

    const organizationname = this.filterform.get('organizationname')?.value;
    const unitId = this.filterform.get('unitname')?.value;

    if (!organizationname && !unitId) {
      this.categoryArray = [];
    }
    const params = {
      OrganizationId: organizationname,
      UnitId: unitId,
    }

    this.masterService.getAllCategory(params).subscribe({
      next: (res: any) => {
        console.log(res.responseData);
        this.categoryArray = res.responseData;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }


  submitfilter() {
    console.log(this.filterform.value);
    let obj = this.filterform.value;
    const token =  this.authService.getToken();
          

    const params: any = {
      OrganizationId: obj?.organizationname,
      UnitId: obj?.unitname,
      CategoryId: obj?.categoryname,
      page: 1,
      pagesize: 10,
      // TextSearch: obj?.search
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const searchValue = this.filterform.get('search')?.value;
    if (searchValue) {
      params.TextSearch = searchValue;
    }
    this.masterService.getassetlistdata(params,headers).subscribe({
      next: (res: any) => {
        console.log(res.responseData);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
