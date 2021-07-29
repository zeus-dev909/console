import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, TemplateRef } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Resource, resource } from '@common/data';
import { BreadcrumbOption } from 'ng-zorro-antd/breadcrumb';
import { BitConfig } from 'ngx-bit';

@Injectable()
export class AppService {
  /**
   * 内容节点
   */
  readonly content: AsyncSubject<ElementRef> = new AsyncSubject();
  /**
   * 标题
   */
  title: BehaviorSubject<string> = new BehaviorSubject<string>('');
  /**
   * 面包屑
   */
  breadcrumb: BreadcrumbOption[] = [];
  /**
   * 页头操作版块
   */
  extra?: TemplateRef<any>;
  /**
   * 页头底部版块
   */
  footer?: TemplateRef<any>;
  /**
   * 刷新导航目录状态
   */
  readonly refreshMenu = new Subject();
  /**
   * 鉴权地址
   */
  private authURL: string;

  constructor(private http: HttpClient, private config: BitConfig) {
    this.authURL = `${config.baseUrl}auth`;
  }

  resetHeaderPage(): void {
    this.title.next('');
    this.extra = undefined;
    this.breadcrumb = [];
    this.footer = undefined;
  }

  /**
   * 登录
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authURL, {
      username,
      password
    });
  }

  /**
   * 验证鉴权状态
   */
  verify(): Observable<any> {
    return this.http.get(this.authURL);
  }

  /**
   * 登出
   */
  logout(): Observable<boolean> {
    return this.http.delete(this.authURL).pipe(map((v: any) => !v.error));
  }

  /**
   * 获取资源数据
   */
  resource(): Observable<any> {
    return of(resource).pipe(
      map(data => {
        const resource: Record<string, Resource> = {};
        const navs: Record<string, any>[] = [];
        for (const x of data) {
          resource[x.id] = x;
          if (!x.nav) {
            continue;
          }
          if (x.pid === 0) {
            x.url = [x.fragment];
            navs.push(x);
          } else {
            if (resource.hasOwnProperty(x.pid)) {
              if (!x.hasOwnProperty('url')) {
                x.url = [...resource[x.pid].url];
              }
              x.url.push(x.fragment);
              if (!resource[x.pid].hasOwnProperty('children')) {
                resource[x.pid].children = [];
              }
              resource[x.pid].children.push(x);
            }
          }
        }
        return { resource, navs };
      })
    );
  }

  /**
   * 通知刷新导航目录
   */
  refreshMenuStart(): void {
    this.refreshMenu.next(1);
  }
}
