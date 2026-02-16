import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapImplementComponent } from './map-implement.component';

const routes: Routes = [{ path: '', component: MapImplementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapImplementRoutingModule { }
