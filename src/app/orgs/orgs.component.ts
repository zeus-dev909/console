import { Component } from '@angular/core';

@Component({
  selector: 'app-orgs',
  template: `
    <nz-layout class="main">
      <app-toolbar></app-toolbar>
      <nz-layout>
        <app-header>
          <ul nz-menu nzMode="horizontal">
            <li nz-menu-item nzMatchRouter [routerLink]="['/orgs', 'roles']">
              <span nz-icon nzType="partition"></span>
              权限组
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/orgs', 'users']">
              <span nz-icon nzType="team"></span>
              团队成员
            </li>
          </ul>
        </app-header>
        <nz-layout class="frame">
          <nz-layout style="overflow: auto">
            <nz-content>
              <router-outlet></router-outlet>
            </nz-content>
          </nz-layout>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class OrgsComponent {}