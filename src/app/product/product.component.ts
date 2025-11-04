import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { MasterService } from '../service/master.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  filterform: FormGroup | any;
  addproductform: FormGroup | any;
  organizationlistArray: any[] = [];
  productcategorylistArray: any[] = [];
  selectedItem: string = 'All';
  tblArray: any[] =[];
  orglist: string = '';
  filteredOrganizationList: any[] =[];

  constructor(private fb: FormBuilder, private http: HttpClient, private masterService: MasterService) { }

  ngOnInit(): void {
    this.createfilterform();
    this.createproductform();
    this.getorganizationlist();
    this.getproductcategorylist();
    
    this.filterform.get('organizationlist').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.searchorg(query as string))
    ).subscribe((filteredResults: any[]) => {
      this.filteredOrganizationList = filteredResults; // Use a separate list for search results
    });
  }

  searchorg(query: string) {
    if (!query) {
      return of(this.organizationlistArray); // Show full list if query is empty
    }
  
    return of(
      this.organizationlistArray.filter(item => 
        item.organizationName.toLowerCase().includes(query.toLowerCase()) // Access correct property
      )
    );
  }

  createfilterform() {
    this.filterform = this.fb.group({
      producttype: new FormControl(),
      productlist: new FormControl('All'),
      organizationlist: new FormControl(),
      search: new FormControl(),
    })
  }

  //   https://demoassetapi.hitechdairy.in/Product/GetAllProductsList?
  // OrganizationId=279&ProductType=Inventory&ProductCategory=&PageNumber=1&PageSize=10&SearchText=
  submitfilterform() {
    console.log(this.filterform.value);

    let obj = this.filterform.value;

    const params = {
      OrganizationId: obj?.organizationlist,
      ProductType: obj?.producttype,
      ProductCategory: obj?.productlist === 'All' ? '' : obj?.productlist,
      PageNumber: 1,
      PageSize: 10,
      SearchText: obj?.search || '',
    }
    console.log("params",params, typeof(params));

    this.masterService.filterproduct(params).subscribe({
      next: (res: any) =>{
        console.log("filtered data ts file - ", res);
        this.tblArray = res;
      },
      error: (error: any) =>{
        console.log(error);
      }
    })

    // this.http.get(`https://demoassetapi.hitechdairy.in/Product/GetAllProductsList?OrganizationId=${params.OrganizationId}&ProductType=${params.ProductType || ''}&ProductCategory=${params.ProductCategory || ''}&PageNumber=${params.PageNumber}&PageSize=${params.PageSize}&SearchText=${params.SearchText || ''}`).subscribe({
    //   next: (res: any) => {
    //     console.log("after filter data ts file - ", res.responseData);
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   }
    // })

  }

  onSelectionChange( ) {
    const selectedValue = this.filterform.get('selectedItem')?.value;
    console.log('Selected Value:', selectedValue);
  }

  createproductform() {
    this.addproductform = this.fb.group({
      producttype: new FormControl(),
      organizationlist: new FormControl(),
      productlist: new FormControl(),
      productname: new FormControl(),
      hsnsac: new FormControl(),
      can_be_sold: new FormControl(),
      can_be_purchased: new FormControl(),
      trackingmethod: new FormControl(),
      imgupload: new FormControl(),
    })
  }

  get f() {
    return this.addproductform.controls;
  }

  getorganizationlist() {
    this.masterService.getAllOrganization().subscribe({
      next: (res: any) => {
        console.log(res.responseData);
        this.organizationlistArray = res.responseData;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getproductcategorylist() {
    this.masterService.productcategory().subscribe({
      next: (res: any) => {
        console.log("prod category list", res);
        this.productcategorylistArray = res;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  addproduct() {
    console.log(this.addproductform.value);
    let obj = this.addproductform.value
    // this.addproductform.get('producttype')?.value
    const params = {
      productType: obj?.producttype,
      organizationId: obj?.organizationlist,
      productCategory: obj?.productlist,
      productName: obj?.productname,
      hsnSacCode: obj?.hsnsac,
      canBeSold: obj?.can_be_sold || false,
      canBePurchased: obj?.can_be_purchased || false,
      trackingMethod: obj?.trackingmethod ? obj?.trackingmethod : '',
      image: obj?.imgupload,
      createdBy: 0,
      modifiedBy: 0,
      id: 0
    }
    console.log("add params", params);

    this.masterService.createproduct(params).subscribe({
      next: (res: any) => {
        console.log("form data to api - ", res);
        this.clear();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  clear() {
    this.addproductform.reset();
  }
}
