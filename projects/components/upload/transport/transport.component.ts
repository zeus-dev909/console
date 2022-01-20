import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

import { Transport } from '../types';
import { TransportDataSource } from './transport.data-source';

@Component({
  selector: 'wpx-upload-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class WpxUploadTransportComponent {
  @Output() readonly wpxChange: EventEmitter<Transport[]> = new EventEmitter();

  ds: TransportDataSource = new TransportDataSource();
  private readonly transports = new Map<string, Transport>();
  complete = true;
  visible = false;
  size = 0;
  done = 0;
  percent = 0;

  @ViewChild('messageRef') messageRef!: TemplateRef<any>;
  private messageId?: string;

  constructor(private message: NzMessageService) {}

  change(info: NzUploadChangeParam): void {
    if (this.complete) {
      this.start();
    }
    this.watch(info.file);
    if (this.size !== 0 && this.size === this.done) {
      this.success();
    }
  }

  private start(): void {
    this.visible = true;
    this.complete = false;
    this.size = 0;
    this.done = 0;
    this.percent = 0;
    this.transports.clear();
    this.messageId = this.message.loading(this.messageRef, { nzDuration: 0 }).messageId;
  }

  private watch(file: NzUploadFile): void {
    if (file.status === 'error') {
      this.message.error(`无法上传文件 [${file.name}]`);
      this.transports.delete(file.uid);
    }
    this.transports.set(file.uid, {
      name: file.name,
      percent: Math.floor(file.percent!),
      file: file
    });
    const list = [...this.transports.values()];
    this.size = list.length;
    this.done = list.filter(v => v.file.status === 'done').length;
    this.percent = Math.floor((this.done / list.length) * 100);
    this.ds.set(list);
  }

  private success(): void {
    this.complete = true;
    this.message.remove(this.messageId);
    this.message.success('文件上传成功');
    this.wpxChange.next([...this.transports.values()]);
  }
}
