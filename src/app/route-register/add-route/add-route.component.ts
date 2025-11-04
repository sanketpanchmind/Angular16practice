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
      unit: [{ value: '', disabled: true }, Validators.required],
      routetype: ['', Validators.required],
      routecode: ['', Validators.required],
      routename: ['', Validators.required],
      state: ['', Validators.required],
      stateName: [''],
      district: [{ value: '', disabled: true }, Validators.required],
      districtName: [''],
      taluka: [{ value: '', disabled: true }, Validators.required],
      talukaName: [''],
      village: [{ value: '', disabled: true }],
      villageName: [''],
      area: [{ value: '', disabled: true }]
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

  onOrganizationChange(orgId: number) {
    this.addrouteform.get('unit')?.enable();
    orgId = this.addrouteform.value.organization;
    this.routeregisterservice.getUnits(orgId).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.unitArray = res.responseData;
          // this.routeregisterservice.statusMessage(res.statusMessage, 0);
          this.addrouteform.patchValue({ unit: '' });
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
        if (res.statusCode == 200) {
          this.stateArray = res.responseData;
        }
      },
      error: (error: any) => {
        console.log("error - ", error);
        // this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }

  getdistricts(stateId: number) {
    this.addrouteform.get('district')?.enable();
    stateId = this.addrouteform.value.state.id;

    this.routeregisterservice.getdistrictlists(stateId).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.districtArray = res.responseData;
        }
      },
      error: (error: any) => {
        console.log("error - ", error);
        // this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }

  getTaluka(districtId: number) {
    this.addrouteform.get('taluka')?.enable();
    districtId = this.addrouteform.value.district.id;

    const villageControl = this.addrouteform.get('village');
    const areaControl = this.addrouteform.get('area');

    // Reset dependent fields
    villageControl?.reset();
    areaControl?.reset();

    // Disable until data is ready
    villageControl?.disable();
    areaControl?.disable();



    this.routeregisterservice.gettalukalists(districtId).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.talukaArray = res.responseData;
        }
      },
      error: (error: any) => {
        console.log("error - ", error);
        // this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }
  getVillages(talukaId: number) {
    this.addrouteform.get('village')?.enable();
    talukaId = this.addrouteform.value.state.id;

    this.addrouteform.get('area')?.enable();
    this.routeregisterservice.getVillagelists(talukaId).subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.villageArray = res.responseData;
        }
      },
      error: (error: any) => {
        console.log("error - ", error);
        // this.routeregisterservice.statusMessage(error.statusMessage, 1);
      }
    })
  }

  addroute() {
    const formValue = this.addrouteform.value;

    const newRecord = {
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
    console.log("New Record:", newRecord);
    this.FormData.push(newRecord);
    this.dataSource.data = this.FormData;;
    this.addrouteform.get('village')?.reset();
    this.addrouteform.get('area')?.reset();
  }



  edit(record: any) {
    console.log("Editing record:", record);
    console.log("Editing record:", this.stateArray);

    // Enable dependent dropdowns first
    this.addrouteform.get('district')?.enable({ emitEvent: false });
    this.addrouteform.get('taluka')?.enable({ emitEvent: false });
    this.addrouteform.get('village')?.enable({ emitEvent: false });
    this.addrouteform.get('area')?.enable({ emitEvent: false });

    // Find actual objects from arrays
    const selectedState = this.stateArray.find(s => s.stateName === record.stateName || s.id === record.stateId);
    const selectedDistrict = this.districtArray.find(d => d.districtId === record.districtId || d.id === record.districtId);
    const selectedTaluka = this.talukaArray.find(t => t.talukaId === record.talukaId || t.id === record.talukaId);
    const selectedVillage = this.villageArray.find(v => v.villageId === record.villageId || v.id === record.villageId);


    // Patch form with the actual objects
    this.addrouteform.patchValue({
      state: selectedState.id || null,
      district: selectedDistrict || null,
      taluka: selectedTaluka || null,
      village: selectedVillage || null,
      area: record.areaName
    });

    console.log("Form after patch:", this.addrouteform.value);
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

    const mappedData = this.routedata.routePIdbyVillages.map((x: any, index: number) => ({
      srno: index + 1,
      stateId: x.stateId,
      stateName: x.state,
      districtId: x.districtId,
      districtName: x.district,
      talukaId: x.talukaId,
      talukaName: x.taluka,
      villageId: x.villageId,
      villageName: x.town,
      areaName: x.areas || ''
    }));

    this.dataSource.data = mappedData;
    this.FormData = [...mappedData];
    this.FormDataId = this.FormData.length;
  }



}
