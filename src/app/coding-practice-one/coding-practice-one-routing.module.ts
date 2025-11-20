import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodingPracticeOneComponent } from './coding-practice-one.component';

const routes: Routes = [{ path: '', component: CodingPracticeOneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodingPracticeOneRoutingModule { }
