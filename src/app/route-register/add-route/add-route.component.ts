import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RouteregisterService } from 'src/app/service/routeregister.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent {

  addrouteform!: FormGroup;
  organizationArray: any[] = [];
  unitArray: any[] = [];
  routetypeArray: any[] = [];
  stateArray: any[] = [];
  districtArray: any[] = [];
  talukaArray: any[] = [];
  villageArray: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['srno', 'state', 'district', 'taluka', 'village', 'area', 'action'];
  FormData: any[] = [];
  FormDataId: number = 1;
  newRecord: any;
  isEdit: boolean = false;


  constructor(
    private fb: FormBuilder,
    private routeregisterservice: RouteregisterService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public routedata: any
  ) {

  }

  ngOnInit() {
    this.initializeform();
    this.OrganizationLists();
    this.getstate();
    this.routetypes();
    console.log("edit dialog -  ", this.routedata);

    if (this.routedata) {
      this.isEdit = true;
      this.editDialog();
    }
  }

  initializeform() {
    this.addrouteform = this.fb.group({
      organization: ['', Validators.required],
      unit: ['', Validators.required],
      routetype: ['', Validators.required],
      routecode: ['', Validators.required],
      routename: ['', Validators.required],
      state: ['', Validators.required],
      stateName: [''],
      district: ['', Validators.required],
      districtName: [''],
      taluka: ['', Validators.required],
      talukaName: [''],
      village: [''],
      villageName: [''],
      area: ['']
    })
  }

  OrganizationLists() {
    this.routeregisterservice.getOrganization().subscribe({
      next: (res: any) => {
        console.log("org - ", res.responseData);
        if (res.statusCode == 200) {
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

  onOrganizationChange() {
  //  this.addrouteform.patchValue({ unit: '' });
    const orgId = this.addrouteform.value.organization;
    this.routeregisterservice.getUnits(orgId).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.unitArray = res.responseData;
          console.log("unit array - ", this.unitArray);
          // this.routeregisterservice.statusMessage(res.statusMessage, 0);
        }
      },
      error: (error: any) => {
        console.log("error - ", error);
        // this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }

  routetypes() {
    this.routeregisterservice.getRouteType().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          console.log("routetypeArray array - ", this.routetypeArray);
          this.routetypeArray = res.responseData;
        }
      },
      error: (error: any) => {
        console.log("error - ", error);
        // this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }

  getstate() {
    this.routeregisterservice.getstatelists().subscribe({
      next: (res: any) => {
        console.log("state ar - ", res.data)
        this.stateArray = res.status == 'success' ? res.data : [];
      },
      error: () => {
        this.stateArray = [];
      }
    })
  }

  getdistricts() {
    const stateId = this.addrouteform.value.state;
    console.log("state id", stateId);

    this.routeregisterservice.getdistrictlists(stateId).subscribe({
      next: (res: any) => {
        this.districtArray = res.status == 'success' ? res.data : [];
      },
      error: () => {
        this.districtArray = [];
      }
    })
  }

  getTaluka() {
    const districtId = this.addrouteform.value.district;
    console.log("dis id", districtId);
    this.routeregisterservice.gettalukalists(districtId).subscribe({
      next: (res: any) => {
        this.talukaArray = res.status == 'success' ? res.data : [];

      },
      error: () => {
        this.talukaArray = [];
      }
    })
  }
  getVillages() {
    const talukaId = this.addrouteform.getRawValue().taluka;
    console.log("taluka id", talukaId);
    this.routeregisterservice.getVillagelists(talukaId).subscribe({
      next: (res: any) => {
        this.villageArray = res.status == 'success' ? res.data : [];

      },
      error: (error: any) => {
        this.villageArray = [];
      }
    })
  }
  onChangeDropdown(flag: string) {
    if (flag == 'state') {
      this.districtArray = [];
      this.talukaArray = [];
      this.villageArray = [];
      this.addrouteform.controls['district'].reset();
      this.addrouteform.controls['districtName'].reset();
      this.addrouteform.controls['taluka'].reset();
      this.addrouteform.controls['talukaName'].reset();
      this.addrouteform.controls['village'].reset();
      this.addrouteform.controls['villageName'].reset();
      this.getdistricts();
    } else if (flag == 'district') {
      this.talukaArray = [];
      this.villageArray = [];
      this.addrouteform.controls['taluka'].reset();
      this.addrouteform.controls['talukaName'].reset();
      this.addrouteform.controls['village'].reset();
      this.addrouteform.controls['villageName'].reset();
      this.getTaluka();
    } else if (flag == 'taluka') {
      this.villageArray = [];
      this.addrouteform.controls['village'].reset();
      this.addrouteform.controls['villageName'].reset();
      this.getVillages();
    }
  }
  addroute() {
    const formValue = this.addrouteform.value;

    const newRecord = {
      srno: this.FormDataId++,
      stateId: formValue.stateCode,
      stateName: formValue.stateName,
      districtId: formValue.districtCode,
      districtName: formValue.districtName,
      talukaId: formValue.taluka,
      talukaName: formValue.talukaName,
      villageId: formValue.village,
      villageName: formValue.villageName,
      areaName: formValue.area
    };

    console.log("New Record:", newRecord);
    console.log("this.editObj?.index", this.editObj?.index);

    this.editObj?.index != undefined ? this.FormData.splice(this.editObj.index, 1, newRecord) : this.FormData.push(newRecord);
    this.dataSource.data = this.FormData;

    this.addrouteform.get('village')?.reset();
    this.addrouteform.get('area')?.reset();
    this.editObj = '';
  }

  editObj: any;
  edit(index: number, record: any) {
    // this.editObj.index = index;
  
      console.log("Editing record:", record, this.addrouteform.value);

      const address = this.routedata.routePIdbyVillages?.[index];
      console.log("aqddress", address);

      this.addrouteform.patchValue({
        state: this.routedata.routePIdbyVillages?.[index].stateCode,
        stateName: address.stateName,
        district: address.districtCode,
        districtName: address.districtName,
        taluka: address.subDistrictCode,
        talukaName: address.subDistrict,
        village: address.townCode,
        villageName: address.town,
        area: address.areas
      });
      this.getdistricts();
      this.getTaluka();
      this.getVillages();
    
  }

  update() {
    const formValue = this.addrouteform.value;

    const updatedRecord = {
      srno: this.FormDataId++,
      stateId: formValue.state.id,
      stateName: formValue.state.stateName,
      districtId: formValue.district.id,
      districtName: formValue.district.districtName,
      talukaId: formValue.taluka.id,
      talukaName: formValue.taluka.talukaName,
      villageId: formValue.village.id,
      villageName: formValue.village.villageName,
      areaName: formValue.area
    };

    this.routeregisterservice.updateroute(updatedRecord).subscribe({
      next: (res: any) => {
        this.routeregisterservice.statusMessage(res.statusMessage, 0);
        this.addrouteform.reset();
        this.dialog.closeAll();
      },
      error: (error: any) => {
        console.log("Error - ", error);
        this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }



  delete(recordId: number) {
    console.log("delete id - ", recordId);
    let isexist = this.FormData.find((x: any) => x.srno == recordId);
    if (isexist) {
      this.FormData.splice(this.FormData.indexOf(isexist), 1)
    }
    this.dataSource.data = this.FormData;
    this.addrouteform.reset();
  }

  submit() {
    const obj = this.addrouteform.value;
    console.log("Form Value on Submit:", obj);
    console.log("Form Data on Submit:", this.FormData);

    if (!obj || !this.FormData.length) {
      this.routeregisterservice.statusMessage("Please fill all fields and add at least one route entry.", 0);
      return;
    }

    const params = {
      organizationId: obj.organization,
      unitId: obj.unit,
      routeTypeId: obj.routetype,
      routeCode: obj.routecode,
      routeName: obj.routename,
      routeCategory: 1,
      villageLstModels: this.FormData.map(item => ({
        villageId: item.villageId?.toString(),
        routeId: 0,
        townCode: item.villageId?.toString(),
        town: item.villageName,
        areas: item.areaName
      }))
    };

    console.log("Final Submit Payload:", params);

    this.routeregisterservice.addroute(params).subscribe({
      next: (res: any) => {
        this.routeregisterservice.statusMessage(res.statusMessage, 0);
        this.addrouteform.reset();
        this.dialog.closeAll();
      },
      error: (error: any) => {
        console.log("Error - ", error);
        this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    });
  }




  editDialog() {
    console.log("edit data - ", this.routedata);

    this.addrouteform.get('unit')?.enable();
    this.addrouteform.patchValue({
      organization: this.routedata.organizationId,
      unit: this.routedata.unitId,
      routetype: this.routedata.routeTypeId,
      routecode: this.routedata.routeCode,
      routename: this.routedata.routeName,
    });
    this.onOrganizationChange();
    const mappedData = this.routedata.routePIdbyVillages.map((x: any, index: number) => ({
      srno: index + 1,
      stateId: x.stateCode,
      stateName: x.state,
      districtId: x.districtCode,
      districtName: x.district,
      talukaId: x.subDistrictCode,
      talukaName: x.subDistrict,
      villageId: x.townCode,
      villageName: x.town,
      areaName: x.areas || ''
    }));
    console.log("mapped data - ", mappedData);
    this.dataSource.data = mappedData;
    this.FormData = [...mappedData];
    this.FormDataId = this.FormData.length;
  }



}
