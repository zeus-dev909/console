import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';

import { DepartmentsModule } from './departments/departments.module';
import { RolesComponent } from './roles/roles.component';
import { RolesModule } from './roles/roles.module';
import { UsersComponent } from './users/users.component';
import { UsersModule } from './users/users.module';

export const organize: Routes = [
  {
    path: 'roles',
    component: RolesComponent,
    data: {
      breadcrumb: '权限组'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      breadcrumb: '团队成员'
    }
  },
  { path: '', redirectTo: '/settings/organize/departments', pathMatch: 'full' }
];

@NgModule({
  imports: [WpxShareModule, WpxModule, RolesModule, DepartmentsModule, UsersModule]
})
export class OrganizeModule {}
