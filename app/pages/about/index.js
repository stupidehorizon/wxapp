Page({

  data: {
    userInfo: {},
  },

  onLoad: function() {
    this.loadData();
  },
  
  loadData() {
    this.getUserInfo((data) => {
      this.setData({
        userInfo: data,
      });
    });
  },

  /**
   * 获取用户信息
   * @param {*Function} callback 
   */
  getUserInfo(callback) {
    wx.login({
      success: () => {
        wx.getUserInfo({
          success: (res) => {
            callback && callback(res.userInfo);
          },
          fail: () => {
            const data = {
              nickName: 'Cube Developer',
              avatarUrl: '../../../assets/images/common/user@default.png',
            };
            callback && callback(data);
          },
        });
      },
    });
  },
});
