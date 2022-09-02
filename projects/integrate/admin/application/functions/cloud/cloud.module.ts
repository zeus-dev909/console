import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { CloudComponent } from './cloud.component';
import { CosComponent } from './cos/cos.component';
import { PlatformComponent } from './platform/platform.component';

@NgModule({
  imports: [ShareModule],
  declarations: [CloudComponent, PlatformComponent, CosComponent],
  exports: [CloudComponent]
})
export class CloudModule {}
