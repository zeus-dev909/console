import { Config, Data } from './types';

export class Video {
  /**
   * Editor.js API
   */
  private api: any;
  /**
   * 配置
   * @private
   */
  private config: Config;
  /**
   * 视频 DOM
   * @private
   */
  private video?: HTMLVideoElement;
  /**
   * 数据
   */
  data: Data;

  static get toolbox(): any {
    return {
      title: 'Video',
      icon: '<svg t="1644568855492" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8724" width="64" height="64"><path d="M224.426667 369.92C216.405333 404.693333 213.333333 450.474667 213.333333 512c0 61.525333 3.072 107.306667 11.093334 142.08 7.850667 33.962667 19.712 54.570667 35.626666 68.778667 16.384 14.634667 41.472 26.453333 83.029334 34.218666 41.728 7.808 96.426667 10.922667 168.917333 10.922667 72.490667 0 127.146667-3.114667 168.917333-10.922667 41.557333-7.808 66.645333-19.584 83.029334-34.218666 15.914667-14.208 27.776-34.816 35.626666-68.778667 8.021333-34.773333 11.093333-80.554667 11.093334-142.08 0-61.525333-3.072-107.306667-11.093334-142.08-7.850667-33.962667-19.712-54.570667-35.626666-68.778667-16.384-14.634667-41.472-26.453333-83.029334-34.218666C639.146667 259.114667 584.490667 256 512 256c-72.490667 0-127.146667 3.114667-168.917333 10.922667-41.557333 7.808-66.645333 19.584-83.029334 34.218666-15.914667 14.208-27.776 34.816-35.626666 68.778667z m102.954666-186.88C377.088 173.781333 438.186667 170.666667 512 170.666667s134.912 3.072 184.618667 12.373333c49.877333 9.386667 91.818667 25.6 124.16 54.485333 32.853333 29.354667 51.498667 67.84 61.952 113.237334 10.24 44.544 13.269333 98.304 13.269333 161.237333s-2.986667 116.693333-13.269333 161.28c-10.453333 45.354667-29.056 83.84-61.909334 113.194667-32.384 28.928-74.325333 45.141333-124.202666 54.485333-49.706667 9.258667-110.805333 12.373333-184.618667 12.373333s-134.912-3.072-184.618667-12.373333c-49.877333-9.386667-91.818667-25.6-124.16-54.485333-32.853333-29.354667-51.498667-67.84-61.952-113.237334C131.029333 628.693333 128 574.933333 128 512s2.986667-116.693333 13.269333-161.28c10.453333-45.354667 29.056-83.84 61.909334-113.194667 32.384-28.928 74.325333-45.141333 124.202666-54.442666z m175.104 260.138667a21.333333 21.333333 0 0 0-33.152 17.749333v102.144a21.333333 21.333333 0 0 0 33.152 17.749333l76.629334-51.072a21.333333 21.333333 0 0 0 0-35.498666l-76.629334-51.072zM384 460.928c0-85.205333 94.933333-136.021333 165.845333-88.746667l76.629334 51.072c63.317333 42.24 63.317333 135.253333 0 177.493334l-76.629334 51.072C478.933333 699.093333 384 648.277333 384 563.072v-102.144z" p-id="8725"></path></svg>'
    };
  }

  constructor({ data, api, config }: any) {
    this.data = {
      assets: data.assets || '',
      url: data.url || ''
    };
    this.api = api;
    this.config = config;
  }

  /**
   * 渲染
   */
  render(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add(this.api.styles.block, 'cdx-media');
    const btn = document.createElement('button');
    btn.classList.add('cdx-button');
    btn.innerText = '请选择视频';
    btn.onclick = () => {
      this.setVideo();
    };
    wrapper.append(btn);
    this.video = document.createElement('video');
    this.video.controls = true;

    if (this.data.url) {
      this.video!.src = `${this.data.assets}/${this.data.url}`;
      wrapper!.appendChild(this.video!);
      btn.remove();
    } else {
      this.video.onloadstart = () => {
        wrapper!.appendChild(this.video!);
        btn.remove();
        this.config.change();
      };
      this.setVideo();
    }

    return wrapper;
  }

  /**
   * 保存数据
   */
  save(): Data {
    return this.data;
  }

  /**
   * 设置视频
   * @private
   */
  private setVideo(): void {
    this.config.resolve(data => {
      this.data = data;
      this.video!.src = `${data.assets}/${data.url}`;
    });
  }
}
