import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { rootRoutes } from './routers';
import { CompanyService } from './shared';

import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    DepartmentComponent,
    MemberComponent,
    MemberFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rootRoutes, {useHash: true}),
    ReactiveFormsModule
  ],
  providers: [ CompanyService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
