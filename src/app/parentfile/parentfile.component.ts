import { Component } from '@angular/core';

@Component({
  selector: 'app-parentfile',
  templateUrl: './parentfile.component.html',
  styleUrls: ['./parentfile.component.scss']
})
export class ParentfileComponent {


  messagefromParent = "Hello from Parent!";
  messagefromChild = "";


  secmsg = "Second Message";

  receiveMessage(message: string) { // ✅ Expecting a string, not Event
    this.messagefromChild = message;
  }
}
