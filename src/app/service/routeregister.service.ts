import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteregisterService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  private orgurl = 'https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllOrganization';

  // https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllUnit?OrganizationId=279&UserId=1
  private uniturl = 'https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllUnit';

  private routetype = 'https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllRouteType';

  private routelist = 'https://demo-api-hitech.hitechdairy.in/Route/GetAll?UserId=1&pageNo=1&pageSize=10';

  private stateurl = 'https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllState';

  // https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllDistricts?StateId=12
  private districturl = 'https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllDistricts';

  // https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllTaluka?DistrictId=12
  private talukaurl = 'https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllTaluka';

  // https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllVillages?TalukaId=12
  private villageurl = 'https://demo-api-hitech.hitechdairy.in/MasterDropdown/GetAllVillages';

  private addrouteurl = 'https://demo-api-hitech.hitechdairy.in/Route/AddRoute';

  private updaterouteurl = 'https://demo-api-hitech.hitechdairy.in/Route/UpdateRoute';

  private deleteurl = 'https://demo-api-hitech.hitechdairy.in/Route/DeleteRoute';


  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  statusMessage(statusMessage: string, status: number) {
    this.snackbar.open(statusMessage, 'close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: status === 0 ? ['snackbar-success'] : ['snackbar-error']
    })
  }

  getOrganization(): Observable<any> {
    return this.http.get(this.orgurl + `?UserId=1`);
  }

  getUnits(orgId: number): Observable<any> {
    return this.http.get(this.uniturl + `?OrganizationId=${orgId}&UserId=1`);
  }

  getRouteType(): Observable<any> {
    return this.http.get(this.routetype);
  }

  // https://demo-api-hitech.hitechdairy.in/Route/GetAll?UserId=1&pageNo=1&pageSize=10&RouteTypeId=0&TextSearch=&OrgId=279&UnitId=0
  getRouteLists(orgId: number, unitId: number, routetypeId: number, textsearch: string): Observable<any> {
    localStorage.setItem('token', 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMSIsImV4cCI6MTc2MjI2ODMzNiwiaXNzIjoiaHR0cHM6Ly9kZW1vLWFwaS1oaXRlY2guaGl0ZWNoZGFpcnkuaW4vIiwiYXVkIjoiaHR0cHM6Ly9kZW1vLWFwaS1oaXRlY2guaGl0ZWNoZGFpcnkuaW4vIn0.L6uJBU6FcCRQrxHEK01Qr8WbwonGMDA1AXVG26GyRz8');
    const token = localStorage.getItem('token'); // or sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.routelist + `&RouteTypeId=${routetypeId}&TextSearch=${textsearch}&OrgId=${orgId}&UnitId=${unitId}`, { headers });
  }

  getstatelists(): Observable<any> {
    return this.http.get(this.stateurl);
  }

  getdistrictlists(stateId: number): Observable<any> {
    return this.http.get(this.districturl + `?StateId=${stateId}`);
  }
  gettalukalists(districtId: number): Observable<any> {
    return this.http.get(this.talukaurl + `?DistrictId=${districtId}`);
  }

  getVillagelists(talukaId: number): Observable<any> {
    return this.http.get(this.villageurl + `?talukaId=${talukaId}`);
  }

  addroute(data: any): Observable<any> {
    return this.http.post(this.addrouteurl, data);
  }

  updateroute(data: any): Observable<any> {
    return this.http.put(this.updaterouteurl, data);
  }

  deleteroute(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // or wherever you store it
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const body = { deletedBy: 1, id };
    return this.http.delete(`${this.deleteurl}`, { headers, body });
  }
}
