import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankregisterService {


  organizationurl = 'https://priyadarshaniapi.mahamining.com/MasterDropdown/GetAllOrganization';

  // https://priyadarshaniapi.mahamining.com/BankMaster/GetAll?UserId=1&pageNo=1&pageSize=10&TextSearch=&OrgId=260
  private tblisturl = 'https://priyadarshaniapi.mahamining.com/BankMaster/GetAll?UserId=1&pageNo=1&pageSize=10';

  private addbankurl = 'https://priyadarshaniapi.mahamining.com/BankMaster/AddBank';

  private deleteurl = 'https://priyadarshaniapi.mahamining.com/BankMaster/DeleteBank';

  private updateurl = 'https://priyadarshaniapi.mahamining.com/BankMaster/UpdateBank';

  constructor(private httpClient: HttpClient) {

  }

  updateData(id: number, orgId: number, bankname: string): Observable<any> {
    let params = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": true,
      "id": id,
      "organizationId": orgId,
      "bankName": bankname,
      "serverId": 0,
      "timeStamp": new Date(),
    };

    return this.httpClient.put(this.updateurl, params);


  }

  deletedata(id: number, orgcode: string): Observable<any> {

    let delparams = {
      "id": id,
      "deletedBy": 0,
      "departmentId": 0,
      "organizationCode": orgcode,
      "unitCode": "string"
    }
    return this.httpClient.delete(this.deleteurl, { body: delparams });
  }

  getorganizationlist(): Observable<any> {
    return this.httpClient.get<any>(this.organizationurl);
  }


  gettbldata(orgId: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('userId', 1)
      .set('orgId', orgId.toString())
      .set('pageNo', 1)
      .set('pageSize', 10)
      .set('search', search);

    console.log("Calling API:", this.tblisturl + '?' + params.toString());


    return this.httpClient.get(`${this.tblisturl} `, { params });
  }


  registernewBank(orgId: number, bankname: string): Observable<any> {

    let params = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": true,
      "id": 0,
      "organizationId": orgId,
      "bankName": bankname,
      "serverId": 0,
      "timeStamp": new Date(),
    }

    console.log("PARAMS => ", params)
    console.log(this.addbankurl, orgId, bankname);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post(this.addbankurl, params, { headers }).pipe(
      catchError((error) => {
        console.error("API Error:", error);
        return throwError(() => new Error("Failed to register bank"));
      })
    );


    // {
    //   "createdBy": 0,
    //   "modifiedBy": 0,
    //   "createdDate": "2025-02-08T12:05:14.930Z",
    //   "modifiedDate": "2025-02-08T12:05:14.930Z",
    //   "isDeleted": true,
    //   "id": 0,
    //   "organizationId": 0,
    //   "bankName": "string",
    //   "serverId": 0,
    //   "timeStamp": "2025-02-08T12:05:14.930Z"
    // }
  }

}
