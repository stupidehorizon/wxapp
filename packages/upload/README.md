# 图片上传

## 使用指南

- 在 app.wxss 中导入 packages 的所有样式

```css
@import "path/packages/index.wxss";
```

- 在页面中导入组件的模板和脚本

```html
<import src="path/packages/upload/index.wxml" />

<template is="upload" data="{{ upload:upload }}"></template>
```

```js
import { Upload } from 'path/packages/index';

// 在 Page 中导入 Upload 里面声明的方法
Page(Object.assign({},
  Upload,
  {
    data: {
      upload: {
        max: 6,
        data: [],
        uploadName: 'file',
        uploadUrl: `${url.upload}`,
        sourceUrl: `${url.base}${url.source}`,
      },
    },
  }
));
```

## 参数说明

```js
{
  max: Number,                  // 设置图片上传总数
  data: Array,                  // 图片集合,建议路径拼接
  uploadName: String,           // 上传图片 name,默认为 file
  uploadUrl: String,            // 上传图片地址
  sourceUrl: String,            // 图片保存地址
}
```

## 代码演示

- 在页面中初始化参数 upload 和回调函数即可

```js
uploadSuccessCallback(res) {
  const resData = JSON.parse(res);
  this.setData({
    'upload.data': this.data.upload.data.concat(resData.data),
  });
},

uploadErrorCallback(err) {
  this.showToast(err.message || '上传图片失败,请重试');
},
```
