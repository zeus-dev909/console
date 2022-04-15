import { Pipe, PipeTransform } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Pipe({ name: 'OpenState' })
export class OpenStatePipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  transform(id: string, current?: string): boolean {
    if (!current) {
      return false;
    }
    return this.wpx.pages[current]['path']!.includes(id);
  }
}