import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  constructor(private router: Router, private route: ActivatedRoute){}



  empdetails(){
    this.router.navigate(['emp-details'], {relativeTo: this.route});
  }

  salaryinfo(){
    this.router.navigate(['salary-info'], {relativeTo: this.route});
  }

}
