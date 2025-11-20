import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-coding-practice-one',
  templateUrl: './coding-practice-one.component.html',
  styleUrls: ['./coding-practice-one.component.scss']
})
export class CodingPracticeOneComponent {

  todolistform!: NgForm;
  orignialStringOne: string = '';
  secondString: string = '';
  tasksname: string = '';
  todoListArray: any[] = [];
  todoListObj = {
    srno: 1,
    taskName: ''
  };

  constructor(private forms: FormsModule) {

  }

  ngOnInit() {

  }

  checkPlaindrome() {
    let removedSpecialCharStr = this.orignialStringOne.replace(/[^a-zA-Z0-9\s]/g, '');
    console.log("new string - ", removedSpecialCharStr);

    let removedSpacesStr = removedSpecialCharStr.split(' ').join('');
    console.log("without space - ", removedSpacesStr);

    let reverseStr = removedSpacesStr.split('').reverse().join('');
    console.log("both string - ", this.orignialStringOne, reverseStr);

    if (this.orignialStringOne === reverseStr) {
      console.log("Yes plaindrome");
    }
    else {
      console.log("not plaindrome")
    }
  }

  reverseEachString() {
    let subStr = this.secondString.split(' ').map(word => word.split('').reverse().join('')).join(' ');
    console.log("each word reversed - ", subStr);
  }

  addTasksName() {
    console.log("task name - ", this.tasksname);
    this.todoListArray.push(this.tasksname);
    console.log("todo lsit array - ", this.todoListArray);
    this.tasksname = '';
  }

  edit(index: number, newTaskName: string){
    console.log("Edit list - ", index, newTaskName);
    this.todolistform.form.patchValue({
      srno: index,
      tasksname: newTaskName
    });
  }
  delete(i:number){
    console.log("delete list - ", i);
    this.todoListArray.splice(i,1)
  }
}
