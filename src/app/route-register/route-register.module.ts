import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRegisterRoutingModule } from './route-register-routing.module';
import { RouteRegisterComponent } from './route-register.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddRouteComponent } from './add-route/add-route.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    RouteRegisterComponent,
    AddRouteComponent
  ],
  imports: [
    CommonModule,
    RouteRegisterRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule
]
})
export class RouteRegisterModule { }
