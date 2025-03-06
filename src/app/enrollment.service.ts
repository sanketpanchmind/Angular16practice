import { User } from './forms1/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  public _url='';

  constructor(private _http: HttpClient) { }


  enroll(user: User){
   return this._http.post<any>(this._url,user);
  }
}
