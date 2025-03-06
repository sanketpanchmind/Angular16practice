import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demoroute1',
  templateUrl: './demoroute1.component.html',
  styleUrls: ['./demoroute1.component.scss']
})
export class Demoroute1Component {

  /**
   *
   */
  constructor(private router: Router) {


  }

  back() {
    this.router.navigate(['../angpractice']);
  }
}
