import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getAllOrganization() {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'MasterDropdown/GetAllOrganization', false, false, false, 'priyadarshaniService');

      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { obj.next(res) } else { obj.error(res) } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  bankmastergetAll(orgId: number, textSearch?: string) {
    return new Observable((obj) => {
      const params: any = {
        UserId: 1,
        OrgId: orgId,
        pageNo: 1,
        pageSize: 10,
      };

      // Only add TextSearch if it has a valid value
      if (textSearch && textSearch.trim() !== '') {
        params.TextSearch = textSearch;
      }

      this.apiService.setHttp('GET', 'BankMaster/GetAll', false, false, params, 'priyadarshaniService');

      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { obj.next(res) } else { obj.error(res) } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  addbanks(organizationId: number, bankName: string) {
    return new Observable((observer) => {
      const currentDate = new Date().toISOString();

      const params: any = {
        createdBy: 1,
        modifiedBy: 1,
        createdDate: currentDate,
        modifiedDate: currentDate,
        isDeleted: false,
        id: 0,
        OrganizationId: organizationId,
        BankName: bankName
      };

      this.apiService.setHttp('POST', 'BankMaster/AddBank', true, params, false, 'priyadarshaniService');

      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          console.log("Full API Response:", res); // Log full response

          if (res.statusCode === 200) {
            console.log("Insert Successful:", res.responseData);
            observer.next(res);
          }
        },
        error: (error: any) => {
          console.error("API Error:", error);
          observer.error(error);
        }
      });
    });
  }

  deletebank(params: any) {

    return new Observable((obj) => {

      this.apiService.setHttp('DELETE', 'BankMaster/DeleteBank', false, params, false, 'priyadarshaniService');

      this.apiService.getHttp().subscribe({
        next: (data: any) => {
          console.log("Delete in master file", data);
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    })
  }


  edit(params: any) {
    return new Observable((obj) => {
      // Convert params to JSON string if needed
      // const jsonParams = JSON.stringify(params);

      this.apiService.setHttp('PUT', 'BankMaster/UpdateBank', true, params, false, 'priyadarshaniService');

      this.apiService.getHttp().subscribe({
        next: (data: any) => {
          console.log("data", data.responseData);
          obj.next(data.responseData);
        },
        error: (error: any) => {
          console.log(error);
          obj.error(error);
        }
      });
    });
  }




}
