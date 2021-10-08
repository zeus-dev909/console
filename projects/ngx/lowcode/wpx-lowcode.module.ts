import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WpxLayoutModule } from '@weplanx/ngx/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';

import { WpxPageComponent } from './wpx-page/wpx-page.component';
import { WpxPageSerivce } from './wpx-page/wpx-page.serivce';
import { WpxSchemaComponent } from './wpx-schema/wpx-schema.component';
import { WpxSchemaService } from './wpx-schema/wpx-schema.service';
import { WpxTemplateComponent } from './wpx-template/wpx-template.component';
import { WpxTemplateService } from './wpx-template/wpx-template.service';

@NgModule({
  imports: [
    CommonModule,
    WpxLayoutModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzSpaceModule,
    NzInputModule,
    NzToolTipModule,
    FormsModule,
    NzTreeModule,
    NzTreeViewModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule,
    NzDropDownModule,
    DragDropModule
  ],
  declarations: [WpxSchemaComponent, WpxPageComponent, WpxTemplateComponent],
  exports: [WpxSchemaComponent, WpxPageComponent, WpxTemplateComponent],
  providers: [WpxSchemaService, WpxPageSerivce, WpxTemplateService]
})
export class WpxLowcodeModule {}
