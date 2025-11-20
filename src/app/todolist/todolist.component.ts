import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent {


  name: string ='';
  mail: string ='';
  task: string ='';
  todoArray: any[] = [];
  srno: number = 1;

  getlist(form: NgForm){
    console.log(form.value);
    if(form.value){
      this.todoArray.push({
        srno: this.srno++,
        name: form.value.name,
        mail: form.value.mail,
        task: form.value.task
      });
      form.reset();
    }
    else{
      alert("Please fill the form...")
    }
  }

  deletelistrec(i:number){
    this.todoArray.splice(i,1);
  }
}
