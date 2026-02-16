import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapImplementRoutingModule } from './map-implement-routing.module';
import { MapImplementComponent } from './map-implement.component';


@NgModule({
  declarations: [
    MapImplementComponent
  ],
  imports: [
    CommonModule,
    MapImplementRoutingModule
  ]
})
export class MapImplementModule { }
