import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CenterComponent } from '@center/center.component';
import { HeaderModule } from '@common/header/header.module';
import { AppShareModule } from '@share';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)
      },
      { path: '', redirectTo: '/center/profile', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [AppShareModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [CenterComponent]
})
export class CenterModule {}