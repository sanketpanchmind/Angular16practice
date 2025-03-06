import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent {

  /**
   *
   */
  constructor(private router: Router, private route: ActivatedRoute) {
    
  }

  overview(){
    this.router.navigate(['deptoverview'], {relativeTo: this.route});
  }

  contact(){
    this.router.navigate(['contact'], {relativeTo: this.route});
  }
}
