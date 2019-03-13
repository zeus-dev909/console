import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {EventsService} from './events.service';
import {I18nGroupOptions} from '../types/i18n-group-options';

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
  i18n;

  /**
   * Component i18n tooltips
   */
  i18nTips: any = {};

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
  breadcrumb = [];

  /**
   * Nav active array
   */
  navActive = [];

  /**
   * Control panel search object
   */
  search: { field: string, op: string, value: any }[] = [];

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
   * Production language package
   */
  static factoryLocales(packer: any): any {
    const source = {
      zh_cn: {},
      en_us: {}
    };
    for (const i in packer) {
      if (packer.hasOwnProperty(i)) {
        source.zh_cn[i] = packer[i][0];
        source.en_us[i] = packer[i][1];
      }
    }
    return source;
  }

  /**
   * Init i18n form control value
   */
  static i18nControlsValue(i18n: string, value?: any): string {
    if (!value) {
      return null;
    }
    if (value[i18n] !== undefined) {
      return value[i18n];
    } else {
      return null;
    }
  }

  /**
   * Init i18n form control validate
   */
  static i18nControlsValidate(i18n: string, validate?: any): any[] {
    if (!validate) {
      return [];
    }
    if (validate[i18n] !== undefined) {
      return validate[i18n];
    } else {
      return [];
    }
  }

  /**
   * Init i18n form control async validate
   */
  static i18nControlsAsyncValidate(i18n: string, asyncValidate?: any): any[] {
    if (!asyncValidate) {
      return [];
    }
    if (asyncValidate[i18n] !== undefined) {
      return asyncValidate[i18n];
    } else {
      return [];
    }
  }

  constructor(private config: ConfigService,
              private events: EventsService,
              private location: Location,
              private storage: LocalStorage) {
    this.static = config.staticUrl;
    this.uploads = (config.uploadsUrl) ? config.uploadsUrl : config.originUrl + '/' + config.uploadsPath;
    this.pageLimit = config.pageLimit;
    this.i18n = config.i18nDefault;
    this.i18nContain = config.i18nContain;
    this.locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'zh_cn';
  }

  /**
   * Set language pack ID
   */
  setLocale(locale: 'zh_cn' | 'en_us') {
    this.locale = locale;
    localStorage.setItem('locale', locale);
    this.events.publish('locale', locale);
    this.l = Object.assign(this.commonLanguage[this.locale], this.language[this.locale]);
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
      this.commonLanguage = BitService.factoryLocales(packer);
    } else {
      this.language = BitService.factoryLocales(packer);
      this.l = Object.assign(this.commonLanguage[this.locale], this.language[this.locale]);
    }
  }

  /**
   * Register search object
   */
  registerSearch(selector: string, ...search: { field: string, op: string, value: any }[]): Observable<any> {
    return this.storage.getItem('search:' + selector).pipe(
      map((data: any) => {
        this.search = (!data) ? search : data;
        return true;
      })
    );
  }

  /**
   * Determine whether the index exists in the search object
   */
  hasSearch(index: number): boolean {
    return this.search[index] !== undefined;
  }

  /**
   * Location back
   */
  back() {
    this.location.back();
    this.resetI18n();
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

  i18nGroup(options?: I18nGroupOptions) {
    if (options === undefined) {
      options = {};
    }
    const controls = {};
    for (const x of this.config.i18nContain) {
      controls[x] = [
        BitService.i18nControlsValue(x, options.value === undefined ? '' : options.value),
        BitService.i18nControlsValidate(x, options.validate === undefined ? '' : options.validate),
        BitService.i18nControlsAsyncValidate(x, options.asyncValidate === undefined ? '' : options.asyncValidate)
      ];
    }
    return controls;
  }

  // i18nCommonValidator(group: string) {
  //   if (!this.form || !this.form.get(group)) {
  //     return;
  //   }
  //
  //   const empty = [];
  //   const formgroup = this.form.get(group);
  //   for (const x of this.i18ns) {
  //     const value = formgroup.get(x).value;
  //     if (!value) {
  //       empty.push(x);
  //     }
  //   }
  //
  //   this.i18nTips[group] = empty;
  //   return empty;
  // }
  //
  // i18nUpdateValidity(group: string, i18n: string) {
  //   for (const x of this.i18ns) {
  //     if (x !== i18n) {
  //       this.form.get(group).get(x).updateValueAndValidity();
  //     }
  //   }
  // }
}
