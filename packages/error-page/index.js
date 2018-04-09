export const ErrorPage = {
  showErrorPage(errorData={flag:true, code: 404, message: 'Not Found'}) {
    this.setData({
      errorData: {
        flag: errorData.flag,
        code: errorData.code,
        message: errorData.message,
      }
    });
  },
};
