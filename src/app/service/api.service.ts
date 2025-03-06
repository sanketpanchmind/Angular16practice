import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpObj: any = {
    type: '',
    url: '',
    options: Object
  }

  constructor(private http: HttpClient) { }

  getBaseurl(url: string) {
    switch (url) {
      case 'priyadarshaniService': return environment.priyadarshaniService; break;
      default: return ''; break;
    }
  }


  getHttp(): any {
    !this.httpObj.options.body && (delete this.httpObj.options.body)
    !this.httpObj.options.params && (delete this.httpObj.options.params)
    return this.http.request(this.httpObj.type, this.httpObj.url, this.httpObj.options);
  }

  setHttp(type: string, url: string, isHeader: Boolean, obj: any, params: any, baseUrl: any, isBlob?: any) {
    this.httpObj.type = type;
    this.httpObj.url = this.getBaseurl(baseUrl) + url;
    if (isHeader) {
      let tempObj: any = {
      };
      this.httpObj.options.headers = new HttpHeaders(tempObj);
    }

    if (isBlob) {
      this.httpObj.options.responseType = 'blob'
    }

    obj !== false ? this.httpObj.options.body = obj : this.httpObj.options.body = false;
    params !== false ? this.httpObj.options.params = params : this.httpObj.options.params = false;
  }
















}
