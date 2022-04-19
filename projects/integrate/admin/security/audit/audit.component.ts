import { Component, OnInit } from '@angular/core';

import { AuditService } from './audit.service';
import { LoginLog } from './types';

@Component({
  selector: 'wpx-admin-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit {
  data: any[] = [];
  searchText: string = '';
  expands: Set<string> = new Set<string>();

  constructor(private audit: AuditService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.audit.logs<LoginLog>('login_logs', {}).subscribe(v => {
      this.data = [...v];
    });
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expands.add(id);
    } else {
      this.expands.delete(id);
    }
  }
}
