import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  public _url: string = "/assets/data/employees.json";

  constructor(private http:HttpClient) { }

  // getEmployees(){
  //   return[
  //     {"id":1, "name":"Sanket","age":26},
  //     {"id":2, "name":"Ramesh","age":22},
  //     {"id":3, "name":"Sanjay","age":21}
  //   ];
  // }


  getEmployees() : Observable<IEmployees[]> {
    return this.http.get<IEmployees[]>(this._url);
  }

  // errorHandler(error: HttpErrorResponse){
  //   return Observable.throw(error.message || "Server err");
  // }
}

export interface IEmployees{
  id:number;
  name:string;
  age:number;
}