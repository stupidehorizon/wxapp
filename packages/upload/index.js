import { Request, Common } from '../../utils/index';

const http =  new Request();
const common =  new Common();

export const Upload = {
  uploadImage() {
    wx.chooseImage({
      success: (res) => {
        wx.showLoading({
          mask: true,
          title: '上传中',
        });

        const params = {
          url: this.data.upload.uploadUrl,
          name: this.data.upload.uploadName || 'file',
          filePath: res.tempFilePaths[0],
          sCallback: (res) => {
            if (this.uploadSuccessCallback) {
              this.uploadSuccessCallback(res);
            } else {
              console.warn('页面缺少 uploadSuccessCallback 回调函数');
            }
            wx.hideLoading();
          },
          eCallback: (err) => {
            if (this.uploadErrorCallback) {
              this.uploadErrorCallback(err);
            } else {
              console.warn('页面缺少 uploadErrorCallback 回调函数');
            }
            wx.hideLoading();
          },
        };
        
        http.uploadFile(params);
      }
    })
  },
  
  deleteImage(e) {
    const index = common.getDataSet(e, 'index');
    let imageData = Object.assign([], this.data.upload.data);
    imageData.splice(index, 1);
    
    this.setData({
      'upload.data': imageData
    });
  },

};
