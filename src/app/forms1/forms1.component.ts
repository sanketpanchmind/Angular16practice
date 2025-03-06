import { EnrollmentService } from './../enrollment.service';
import { User } from './user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forms1',
  templateUrl: './forms1.component.html',
  styleUrls: ['./forms1.component.scss']
})
export class Forms1Component {

  /**
   *
   */
  constructor(private _enrollment: EnrollmentService) {
    
  }

  public topics = ['Angular','React','Vue'];

  userModel = new User('rob','rob@gmail.com','React',true);
  topicHasError = true;

  validatetopic(value:string){
    if(value === 'default'){
      this.topicHasError = true;
    }
    else{
      this.topicHasError = false;
    }
  }


  onSubmit(){
    // console.log(this.userModel);
    this._enrollment.enroll(this.userModel).subscribe(
      data => console.log('Success',data),
      error => console.error('Error',error)
    )
  }

}
