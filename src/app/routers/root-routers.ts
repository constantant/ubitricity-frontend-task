import { Routes } from '@angular/router';
import { CompanyComponent } from '../company/company.component';
import { DepartmentComponent } from '../department/department.component';
import { MemberComponent } from '../member/member.component';
import { MemberFormComponent } from '../member-form/member-form.component';

export const rootRoutes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: ':departmentId',
        component: DepartmentComponent,
        children: [
          {
            path: 'add-member',
            component: MemberFormComponent
          },
          {
            path: ':memberId',
            component: MemberComponent,
            children: [
              {
                path: 'edit',
                component: MemberFormComponent
              }
            ]
          }
        ]
      }
    ]
  }
];
