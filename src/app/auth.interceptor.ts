import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MasterService } from './service/master.service';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private masterService: MasterService, private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('logintoken');

    let authReq = request;

    if(token){
      authReq = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
        return throwError(() => error);
      })
    )
    return next.handle(request);
  }
}
