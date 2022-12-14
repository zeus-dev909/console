import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Manual, Page, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-pages-manual-scope',
  templateUrl: './scope.component.html'
})
export class ScopeComponent implements OnInit {
  /**
   * 页面单元 ID
   */
  @Input() id!: string;
  /**
   * 载入数据
   */
  @Input() manual!: Manual;
  /**
   * 表单
   */
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private pages: PagesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      scope: [null, [Validators.required]]
    });
    this.form.patchValue({
      scope: this.manual.scope
    });
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param value
   */
  submit(value: any): void {
    this.pages.updateManualScope(this.id, value).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}
