import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/common';
import { WpxHeaderModule } from '@weplanx/components/header';
import { WpxNavModule } from '@weplanx/components/nav';

import { audit, AuditModule } from './audit/audit.module';
import { CenterComponent } from './center.component';
import { CenterService } from './center.service';
import { mine, MineModule } from './mine/mine.module';
import { profile, ProfileModule } from './profile/profile.module';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'mine',
        children: mine
      },
      {
        path: 'profile',
        children: profile
      },
      {
        path: 'audit',
        children: audit
      },
      { path: '', redirectTo: '/center/mine/workbench', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    WpxModule,
    WpxShareModule,
    WpxHeaderModule,
    WpxNavModule,
    MineModule,
    ProfileModule,
    AuditModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CenterComponent],
  providers: [CenterService]
})
export class CenterModule {}
