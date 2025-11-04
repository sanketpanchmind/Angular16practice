import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MasterService } from '../service/master.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginform: FormGroup | any;

  constructor(private fb: FormBuilder, private route: Router, private masterService: MasterService, private authService: AuthService ){

  }
  ngOnInit(){
    this.createloginform();
  }
  createloginform(){
    this.loginform = this.fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }


  login(){
    console.log(this.loginform.value);
    let obj = this.loginform.value;

    const params: any = { 
      username: obj?.username,
      password: obj?.password
    }

    this.masterService.onLogin(params).subscribe({
      next: (res: any) =>{
        if(res.statusCode == 200){
          console.log(res.responseData);
          // localStorage.setItem('logintoken',res.accessToken);
          this.authService.setToken(res.responseData.jwtAuthResult.accessToken);
          console.log('Token stored:', localStorage.getItem('logintoken')); 
          this.route.navigateByUrl('/asset-list');
        }
        else{
          console.log(res.statusCode,res.statusMessage);
          this.route.navigateByUrl('/login');
        }
      },
      error: (error: any) => {
        console.log(error);
        this.route.navigateByUrl('/login');
      }
    })
  }

}
