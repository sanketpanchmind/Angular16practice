import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-childfile',
  templateUrl: './childfile.component.html',
  styleUrls: ['./childfile.component.scss']
})
export class ChildfileComponent {

  @Input() childMessage: string = ""; // ✅ Parent-to-child binding
  @Output() messageevent = new EventEmitter<string>(); // ✅ Ensure it's of type string


  @Input() secondchildmessage: string = '';

  sendMessage() {
    this.messageevent.emit("Hello from Child!"); // ✅ Emits a string
  }
}
