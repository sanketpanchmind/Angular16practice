import { EmployeeServiceService } from './employee-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DepartmentListComponent } from './department-list/department-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DeptoverviewComponent } from './department-list/deptoverview/deptoverview.component';
import { ContactComponent } from './department-list/contact/contact.component';
import { EmpDetailsComponent } from './employee-list/emp-details/emp-details.component';
import { EmpSaslaryInfoComponent } from './employee-list/emp-saslary-info/emp-saslary-info.component';
import { Forms1Component } from './forms1/forms1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angpractice1Component } from './angpractice1/angpractice1.component';
import { Demoroute1Component } from './demoroute1/demoroute1.component';
import { DemotdfFormComponent } from './demotdf-form/demotdf-form.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { FormspracticetwoComponent } from './formspracticetwo/formspracticetwo.component';
import { Formpractice3Component } from './formpractice3/formpractice3.component';
import { MaterialformPracticeComponent } from './materialform-practice/materialform-practice.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatformsecondComponent } from './matformsecond/matformsecond.component';
import { MatformthreeComponent } from './matformthree/matformthree.component';
import { MatformfourComponent } from './matformfour/matformfour.component';
import { ApipracticeComponent } from './apipractice/apipractice.component';
import { MatformFiveComponent } from './matform-five/matform-five.component';
import { BankregistrationComponent } from './bankregistration/bankregistration.component';
import { AddbankComponent } from './bankregistration/addbank/addbank.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BankregisterComponent } from './bankregister/bankregister.component';
import { AddbanksComponent } from './bankregister/addbanks/addbanks.component';
import { UiUpdateComponent } from './ui-update/ui-update.component';
import { ParentfileComponent } from './parentfile/parentfile.component';
import { ChildfileComponent } from './parentfile/childfile/childfile.component';
import { BankFilterComponent } from './bank-filter/bank-filter.component';
import { AddBankComponent } from './bank-filter/add-bank/add-bank.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductComponent } from './product/product.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DynamicSearchbarComponent } from './dynamic-searchbar/dynamic-searchbar.component';
import { RenderTranslationComponent } from './render-translation/render-translation.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AssetListComponent } from './asset-list/asset-list.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';


export function httpTranslateLoaderFactory(http: HttpClient) {
  // export HttpLoaderFactory function that allows NGX-Translate to dynamically load translation files from a server or 
  //local folder and make them available for translation.
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DepartmentListComponent,
    EmployeeListComponent,
    DeptoverviewComponent,
    ContactComponent,
    EmpDetailsComponent,
    EmpSaslaryInfoComponent,
    Forms1Component,
    Angpractice1Component,
    Demoroute1Component,
    DemotdfFormComponent,
    ReactiveformComponent,
    FormspracticetwoComponent,
    Formpractice3Component,
    MaterialformPracticeComponent,
    MatformsecondComponent,
    MatformthreeComponent,
    MatformfourComponent,
    ApipracticeComponent,
    MatformFiveComponent,
    BankregistrationComponent,
    AddbankComponent,
    BankregisterComponent,
    AddbanksComponent,
    UiUpdateComponent,
    ParentfileComponent,
    ChildfileComponent,
    BankFilterComponent,
    AddBankComponent,
    ProductComponent,
    DynamicSearchbarComponent,
    RenderTranslationComponent,
    AssetListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule, MatSnackBarModule, MatCardModule, MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatDialogModule, MatIconModule, MatTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
