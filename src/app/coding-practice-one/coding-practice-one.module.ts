import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodingPracticeOneRoutingModule } from './coding-practice-one-routing.module';
import { CodingPracticeOneComponent } from './coding-practice-one.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CodingPracticeOneComponent
  ],
  imports: [
    CommonModule,
    CodingPracticeOneRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CodingPracticeOneModule { }
