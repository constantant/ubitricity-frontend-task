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
            component: MemberFormComponent,
            data: {
              isAddForm: true
            }
          },
          {
            path: ':memberId',
            component: MemberComponent
          },
          {
            path: ':memberId/edit',
            component: MemberFormComponent
          }
        ]
      }
    ]
  }
];
