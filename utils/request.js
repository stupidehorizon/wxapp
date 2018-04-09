import { config } from './config/index';

const { url, HTTPCODE } = config;

export default class RestClient {
  constructor() {
    this.baseUrl = url.base;
  }

  /**
   * 请求
   * @param {*object} params 
   */
  request(params = {}) {
    if (!params.type) {
      params.type = 'GET';
    }

    wx.request({
      url: `${this.baseUrl}${params.url}`,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json; charset=utf-8',
      },
      success: (res) => {
        if (res.statusCode.toString().startsWith(HTTPCODE.SUCCESS)) {
          params.sCallback && params.sCallback(res.data);
        } else {
          params.eCallback && params.eCallback(res);
        }
      },
      fail: (err) => {
        params.eCallback && params.eCallback(err);
      }
    })
  }

  /**
   * 上传图片
   * @param {*object} params 
   */
  uploadFile(params = {}) {
    wx.uploadFile({
      url: `${this.baseUrl}${params.url}`,
      name: params.name,
      filePath: params.filePath,
      header: {
        'content-type': 'multipart/form-data'
      },
      success: (res) => {
        if (res.statusCode.toString().startsWith(HTTPCODE.SUCCESS)) {
          params.sCallback && params.sCallback(res.data);
        } else {
          params.eCallback && params.eCallback(res);
        }
      },
      fail: (err) => {
        params.eCallback && params.eCallback(err);
      }
    })
  }
}