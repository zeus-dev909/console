import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { WpxActivated } from '@weplanx/components';
import { WpxSettingsModule } from '@weplanx/components/settings';

import { WpxTemplateComponent } from '../../projects/components/template/wpx-template.component';
import { WpxTemplateModule } from '../../projects/components/template/wpx-template.module';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivateChild: [WpxActivated],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'center',
        loadChildren: () => import('./center/center.module').then(m => m.CenterModule)
      },
      {
        path: ':fragments',
        component: WpxTemplateComponent
      }
      // { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      // { path: '**', loadChildren: () => import('./empty/empty.module').then(m => m.EmptyModule) }
    ]
  }
];

@NgModule({
  imports: [AppShareModule, LayoutModule, WpxSettingsModule, WpxTemplateModule, RouterModule.forChild(routes)]
})
export class AppRoutingModule {}
