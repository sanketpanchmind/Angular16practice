import { Component } from '@angular/core';

@Component({
  selector: 'app-angpractice1',
  templateUrl: './angpractice1.component.html',
  styleUrls: ['./angpractice1.component.scss']
})
export class Angpractice1Component {


  radio: boolean = true;

  changeradio(radio: boolean) {
    this.radio = radio;
  }
}
