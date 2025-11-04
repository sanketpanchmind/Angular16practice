import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenkey = 'logintoken';

  constructor(private route: Router) { }

  setToken(token: string){
    localStorage.setItem(this.tokenkey, token);
    console.log('Token set in localStorage:', token); 
  }

  getToken(){
    return localStorage.getItem(this.tokenkey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(){
    localStorage.removeItem(this.tokenkey);
    this.route.navigate(['/login']);
  }
}
