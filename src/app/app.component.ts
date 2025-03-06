import { EmployeeServiceService } from './employee-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular16practice';

  public codinglang = "Angular";

  public employees:any = [];

  /**
   *
   */
  constructor(private _employeeservice : EmployeeServiceService) {
    
  }

  ngOnInit(){
     this._employeeservice.getEmployees().subscribe(data => this.employees = data);
  }



}
