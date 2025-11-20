import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodolistRoutingModule } from './todolist-routing.module';
import { TodolistComponent } from './todolist.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodolistComponent
  ],
  imports: [
    CommonModule,
    TodolistRoutingModule,
    FormsModule,
  ]
})
export class TodolistModule { }
