import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {StorageMap} from '@ngx-pwa/local-storage';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NzI18nService} from 'ng-zorro-antd';
import {ConfigService} from './config.service';
import {EventsService} from './events.service';
import {
  factoryLocales,
  getSelectorFormUrl,
  i18nControlsAsyncValidate,
  i18nControlsValidate,
  i18nControlsValue
} from '../lib.common';
import {I18nGroupOptions, I18nTooltipOptions, Search, SearchOptions} from '../lib.types';

@Injectable()
export class BitService {
  /**
   * Origin language packer
   */
  private language: any = {};

  /**
   * app.language packer
   */
  private commonLanguage: any = {};

  /**
   * Static Path
   */
  static: string;

  /**
   * Upload Path
   */
  uploads: string;

  /**
   * Language pack identifier
   */
  locale: string;

  /**
   * Language pack label
   */
  l: any = {};

  /**
   * Component i18n identifier
   */
  i18n: string;

  /**
   * Component i18n tooltips
   */
  i18nTooltip: object | I18nTooltipOptions = {};

  /**
   * Component i18n
   */
  i18nContain: any[] = [];

  /**
   * Title
   */
  title = '';

  /**
   * Breadcrumb array
   */
  breadcrumb: any[] = [];

  /**
   * default breadcrumb top level
   */
  breadcrumbTop: any = 0;

  /**
   * Nav active array
   */
  navActive = [];

  /**
   * Control panel search object
   */
  search: Search | object = {};

  /**
   * Lists data loading status
   */
  listsLoading = true;

  /**
   * Lists data page limit
   */
  pageLimit = 0;

  /**
   * Lists data totals
   */
  listsTotals = 0;

  /**
   * Lists data page index
   */
  listsPageIndex = 1;

  /**
   * All list data is selected
   */
  listsAllChecked = false;

  /**
   * All list data has indeterminate
   */
  listsIndeterminate = false;

  /**
   * Control panel mutil operate status
   */
  listsDisabledAction = true;

  /**
   * All list data selecte total
   */
  listsCheckedNumber = 0;

  /**
   * constructor
   */
  constructor(
    private config: ConfigService,
    private events: EventsService,
    private location: Location,
    private router: Router,
    private storageMap: StorageMap,
    private nzI18nService: NzI18nService,
  ) {
    this.static = config.staticUrl;
    this.uploads = (config.uploadsUrl) ? config.uploadsUrl : config.originUrl + '/' + config.uploadsPath;
    this.pageLimit = config.pageLimit;
    this.breadcrumbTop = this.config.breadcrumbTop;
    this.i18n = config.i18nDefault;
    this.i18nContain = config.i18nContain;
    storageMap.get('locale').subscribe((data: any) => {
      this.locale = data ? data : 'zh_cn';
      this.nzI18nService.setLocale(this.config.i18nBind.get(this.locale));
    });
  }

  /**
   * open routerlink with cross level
   */
  open(path: any[]) {
    const url = this.router.url;
    if (url !== '/') {
      const selector = getSelectorFormUrl(this.router.url, ['%7B', '%7D']);
      const param = url.split('/').slice(2);
      if (param.length !== 0) {
        this.storageMap.set('cross:' + selector, param[0]).subscribe(() => {
        });
      }
    }
    if (path.length !== 0) {
      const routerlink = path[0];
      const param = path.slice(1);
      this.router.navigateByUrl(`{${routerlink}}` +
        (param.length !== 0 ? '/' + param.join('/') : ''));
    }
  }

  /**
   * open use cross level
   */
  crossLevel(selector: string) {
    this.storageMap.get('cross:' + selector).subscribe(param => {
      if (!param) {
        this.router.navigateByUrl(`{${selector}}`);
      } else {
        this.storageMap.delete('cross:' + selector).subscribe(() => {
          this.router.navigateByUrl(`/{${selector}}/${param}`);
        });
      }
    });
  }

  /**
   * Location back
   */
  back() {
    this.location.back();
    this.resetI18n();
  }

  /**
   * Set language pack ID
   */
  setLocale(locale: string) {
    this.locale = locale;
    this.storageMap.set('locale', locale).subscribe(() => {
    });
    this.events.publish('locale', locale);
    this.l = Object.assign(
      this.commonLanguage[this.locale],
      this.language[this.locale]
    );
    this.nzI18nService.setLocale(this.config.i18nBind.get(this.locale));
  }

  /**
   * manual set breadcrumb
   */
  setBreadcrumb(...breadcrumb: any[]) {
    this.breadcrumb = breadcrumb;
  }

  /**
   * Equal i18n ID
   */
  equalI18n(i18n: string) {
    return this.i18n === i18n;
  }

  /**
   * Reset I18n ID
   */
  resetI18n() {
    this.i18n = this.config.i18nDefault;
  }

  /**
   * Registered language pack
   */
  registerLocales(packer: any, common = false) {
    if (common) {
      this.commonLanguage = factoryLocales(packer);
    } else {
      this.language = factoryLocales(packer);
      this.l = Object.assign(this.commonLanguage[this.locale], this.language[this.locale]);
    }
  }

  /**
   * Register search object
   */
  registerSearch(selector: string, ...search: SearchOptions[]): Observable<any> {
    return this.storageMap.get('search:' + selector).pipe(
      map((data: any) => {
        if (!data) {
          search.forEach(((value) => {
            this.search[value.field] = value;
          }));
        } else {
          this.search = data;
        }
        return true;
      })
    );
  }

  /**
   * Determine whether the index exists in the search object
   */
  hasSearch(field: string): boolean {
    return this.search.hasOwnProperty(field);
  }

  /**
   *
   */
  getSearch() {
    const search = [];
    for (const i in this.search) {
      if (this.search.hasOwnProperty(i)) {
        search.push(this.search[i]);
      }
    }
    return search;
  }

  /**
   * Refresh list data selection status
   */
  listsRefreshStatus(lists: any[]) {
    const allChecked = lists.every((value) => value.checked === true);
    const allUnchecked = lists.every((value) => !value.checked);
    this.listsAllChecked = allChecked;
    this.listsIndeterminate = !allChecked && !allUnchecked;
    this.listsDisabledAction = !(this.listsAllChecked || this.listsIndeterminate);
    this.listsCheckedNumber = lists.filter((value) => value.checked).length;
  }

  /**
   * Unified change of all list data status
   */
  listsCheckAll(event, lists: any[]) {
    lists.forEach((data) => (data.checked = event));
    this.listsRefreshStatus(lists);
  }

  /**
   * Init i18n form group
   */
  i18nGroup(options?: I18nGroupOptions) {
    const controls = {};
    if (options) {
      for (const i18n of this.config.i18nContain) {
        controls[i18n] = [
          i18nControlsValue(
            i18n,
            Reflect.has(options, 'value') ? options.value : null
          ),
          i18nControlsValidate(
            i18n,
            Reflect.has(options, 'validate') ? options.validate : []
          ),
          i18nControlsAsyncValidate(
            i18n,
            Reflect.has(options, 'asyncValidate') ? options.asyncValidate : []
          )
        ];
      }
    }
    return controls;
  }
}
