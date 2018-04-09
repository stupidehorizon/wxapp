export const Toast = {
  showToast(title, type='warning', timeout=3000) {
    let toast = this.data.toast || {};
    clearTimeout(toast.timer);

    toast = {
      show: true,
      type,
      title,
    };
    this.setData({
      toast
    });

    let timer = setTimeout(() => {
      this.clearToast();
    }, timeout);

    this.setData({
      'toast.timer': timer,
    });
  },

  clearToast() {
    let toast = this.data.toast || {};
    clearTimeout(toast.timer);

    this.setData({
      'toast.show': false,
    });
  }
};
