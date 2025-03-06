import { Angpractice1Component } from './angpractice1/angpractice1.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DeptoverviewComponent } from './department-list/deptoverview/deptoverview.component';
import { ContactComponent } from './department-list/contact/contact.component';

import { EmpDetailsComponent } from './employee-list/emp-details/emp-details.component';
import { EmpSaslaryInfoComponent } from './employee-list/emp-saslary-info/emp-saslary-info.component';
import { Forms1Component } from './forms1/forms1.component';
import { Demoroute1Component } from './demoroute1/demoroute1.component';
import { DemotdfFormComponent } from './demotdf-form/demotdf-form.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { FormspracticetwoComponent } from './formspracticetwo/formspracticetwo.component';
import { Formpractice3Component } from './formpractice3/formpractice3.component';
import { MaterialformPracticeComponent } from './materialform-practice/materialform-practice.component';
import { MatformsecondComponent } from './matformsecond/matformsecond.component';
import { MatformthreeComponent } from './matformthree/matformthree.component';
import { MatformfourComponent } from './matformfour/matformfour.component';
import { ApipracticeComponent } from './apipractice/apipractice.component';
import { MatformFiveComponent } from './matform-five/matform-five.component';
import { BankregistrationComponent } from './bankregistration/bankregistration.component';
import { BankregisterComponent } from './bankregister/bankregister.component';
import { UiUpdateComponent } from './ui-update/ui-update.component';
import { ParentfileComponent } from './parentfile/parentfile.component';
import { ChildfileComponent } from './parentfile/childfile/childfile.component';
import { BankFilterComponent } from './bank-filter/bank-filter.component';


const routes: Routes = [
  {
    path: 'departments', component: DepartmentListComponent,
    children: [
      { path: "deptoverview", component: DeptoverviewComponent },
      { path: "contact", component: ContactComponent }
    ]
  },
  {
    path: 'employees', component: EmployeeListComponent,
    children: [
      { path: "emp-details", component: EmpDetailsComponent },
      { path: "salary-info", component: EmpSaslaryInfoComponent }
    ]
  },

  { path: 'forms1', component: Forms1Component },
  { path: 'angpractice', component: Angpractice1Component },
  { path: 'demoroute1', component: Demoroute1Component },

  { path: 'tdfForm', component: DemotdfFormComponent },

  { path: 'rxjs', component: ReactiveformComponent },


  { path: 'formpractice2', component: FormspracticetwoComponent },
  { path: 'form3', component: Formpractice3Component },

  { path: 'materialform', component: MaterialformPracticeComponent },

  { path: 'matform2', component: MatformsecondComponent },
  { path: 'mat3', component: MatformthreeComponent },
  { path: 'mat4', component: MatformfourComponent },

  { path: 'apipractice', component: ApipracticeComponent },

  { path: 'mat5', component: MatformFiveComponent },

  { path: 'bankregister', component: BankregistrationComponent },
  { path: 'bk2', component: BankregisterComponent },
  { path: 'ui-update', component: UiUpdateComponent },

  { path: 'parent', component: ParentfileComponent },
  { path: 'child', component: ChildfileComponent },
  { path: 'bank-filter', component: BankFilterComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
