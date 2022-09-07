import { NgModule } from '@angular/core';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxTableModule } from '@weplanx/ng/table';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { FormComponent } from './form/form.component';
import { PagesComponent } from './pages/pages.component';
import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';

@NgModule({
  imports: [WpxModule, WpxShareModule, WpxTableModule, NzTransferModule, NzTreeModule],
  declarations: [RolesComponent, FormComponent, PagesComponent],
  providers: [RolesService]
})
export class RolesModule {}