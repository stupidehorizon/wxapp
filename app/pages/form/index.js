import { api, config, Request, Common } from '../../../utils/index';
import { Toast, Upload } from '../../../packages/index';

const http =  new Request();
const common =  new Common();
const { url, carriers, channels } = config;

Page(Object.assign({},
  Toast,
  Upload,
  {
    data: {
      rules: {
        require: true,
        minLength: 1,
      },
      upload: {
        max: 6,
        data: [],
        uploadName: 'file',
        uploadUrl: `${api.upload}`,
        sourceUrl: `${url.base}${url.source}`,
      },
      captchaData: {},
      carrierIndex: 0,
      channelIndex: 0,
      channelData: channels,
      carrierData: carriers,
    },

    onLoad: function() {
      this.getCaptcha();
    },

    formSubmit(e) {
      let data = e.detail.value;
      let validates = {
        content: {
          name: '内容',
          value: data.content,
          rules: {
            minLength : 5,
          },
        },
        attachments: {
          name: '图片',
          value: this.data.upload.data,
          rules: {},
        },
        captcha: {
          name: '验证码',
          value: data.captcha,
          rules: {
            minLength : 4,
          },
        },
      }
      const checkResult = this.goCheck(validates);
      if (checkResult) {
        data = {
          ...data,
          matchToken: this.data.captchaData.matchToken,
          attachments: this.data.upload.data,
        };
        const params = {
          url: api.report,
          type: 'POST',
          data,
          sCallback: (res) => {
            if (res.data !== 'success') {
              this.showToast(res.message || '创建失败,请重试');
            }else {
              wx.showModal({
                title: '创建成功',
                content: res.message || '创建成功',
                showCancel: false,
                confirmText: "我知道了",
                success: function (res) {
                  if (res.confirm) {
                    wx.reLaunch({
                      url: '/app/pages/list/index',
                    });
                  }
                },
              });
            }
          },
          eCallback: (err) => {
            this.showToast(err.message || '创建失败,请重试');
          },
        };
        http.request(params);
      }
    },

    goCheck(data) {
      let flag = true;
      for (let item in data) {
        item = data[item];
        const validate = Object.assign({}, this.data.rules, item.rules);
        const value = item.value;
        if (value instanceof Array) {
          if(value.length < validate.minLength){
            flag =  false;
            this.showToast(`${item.name}不能为空`);
          }
        }else {
          if(!value.trim()){
            flag =  false;
            this.showToast(`${item.name}不能为空`);
          }
          if(value.length < validate.minLength){
            flag =  false;
            this.showToast(`${item.name}不少于 ${validate.minLength} 个字符`);
          }
        }
      }
      return flag;
    },

    getCaptcha() {
      const params = {
        url: api.captcha,
        sCallback: (res) => {
          const { captcha , matchToken } = res.data;
          this.setData({
            captchaData: {
              captcha,
              matchToken,
            },
          });
        },
        eCallback: (err) => {
          this.showToast(err.message || '获取验证码失败,请重试');
        },
      };
      http.request(params);
    },
    
    changeCarrier(e) {
      this.setData({
        carrierIndex: e.detail.value,
      });
    },

    changeChannel(e) {
      this.setData({
        channelIndex: e.detail.value,
      });
    },

    uploadSuccessCallback(res) {
      const resData = JSON.parse(res);
      let imageData = [];
      if (resData instanceof Object) {
        resData.data.map((item) => {
          if (item.url) {
            imageData.push(item.url);
          }
        });
        if (imageData.length === 0) {
          return this.showToast('上传图片失败,请重试');
        }
        this.setData({
          'upload.data': this.data.upload.data.concat(imageData),
        });
      }
    },

    uploadErrorCallback(err) {
      this.showToast(err.message || '上传图片失败,请重试');
    },
  }
));
