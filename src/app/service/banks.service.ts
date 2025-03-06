import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BanksService {


  private organizationurl = 'https://priyadarshaniapi.mahamining.com/MasterDropdown/GetAllOrganization';

  // https://priyadarshaniapi.mahamining.com/BankMaster/GetAll?UserId=1&pageNo=1&pageSize=10&TextSearch=&OrgId=260
  private tblisturl = 'https://priyadarshaniapi.mahamining.com/BankMaster/GetAll?UserId=1&pageNo=1&pageSize=10';

  private addbankurl = 'https://priyadarshaniapi.mahamining.com/BankMaster/AddBank';

  private deleteurl = 'https://priyadarshaniapi.mahamining.com/BankMaster/DeleteBank';

  private updateurl = 'https://priyadarshaniapi.mahamining.com/BankMaster/UpdateBank';


  constructor(private httpclient: HttpClient) { }



  updatedata(id: number, organizationId: number, bank: string): Observable<any> {
    let params = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date().toISOString(),
      "modifiedDate": new Date().toISOString(),
      "isDeleted": true,
      "id": id,
      "organizationId": organizationId,
      "bankName": bank,
      "serverId": 0,
      "timeStamp": new Date().toISOString()
    };

    console.log("org -- ", organizationId);
    console.log("API calls & params", this.updateurl, params);
    return this.httpclient.put(this.updateurl, params);


  }


  deletefn(id: number, orgId: string): Observable<any> {
    let params = {
      "id": id,
      "deletedBy": 0,
      "departmentId": 0,
      "organizationCode": orgId,
      "unitCode": "string"
    };

    console.log(this.deleteurl, params);
    return this.httpclient.delete(this.deleteurl, { body: params });
  }

  organizationlist(): Observable<any> {
    return this.httpclient.get(this.organizationurl);
  }

  bankregisterlist(orgId: string, search: string): Observable<any> {
    let params = new HttpParams()
      .set('userId', 1)
      .set('pageNo', 1)
      .set('pageSize', 10)
      .set('search', search)
      .set('orgId', orgId)

    console.log("Calling API:", this.tblisturl, params.toString());

    return this.httpclient.get(this.tblisturl, { params });
  }

  addnewbank(orgId: string, bankname: string): Observable<any> {
    let params = new HttpParams()
      .set('createdBy', 0)
      .set('modifiedBy', 0)
      .set('createdDate', new Date().toISOString())
      .set('modifiedDate', new Date().toISOString())
      .set('isDeleted', true)
      .set('id', 0)
      .set('organizationId', orgId)
      .set('bankName', bankname)
      .set('serverId', 0)
      .set('timeStamp', new Date().toISOString())

    let para = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date().toISOString(),
      "modifiedDate": new Date().toISOString(),
      "isDeleted": true,
      "id": 0,
      "organizationId": orgId,
      "bankName": bankname,
      "serverId": 0,
      "timeStamp": new Date().toISOString()
    }

    console.log(this.addbankurl, params);
    return this.httpclient.post(this.addbankurl, para);

  }

}
