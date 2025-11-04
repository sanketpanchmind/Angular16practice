import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteRegisterComponent } from './route-register.component';

const routes: Routes = [{ path: '', component: RouteRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteRegisterRoutingModule { }
