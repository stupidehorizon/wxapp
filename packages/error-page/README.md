# 错误页面

## 使用指南

- 在 app.wxss 中导入 packages 的所有样式

```css
@import "path/packages/index.wxss";
```

- 在页面中导入组件的模板和脚本

```html
<import src="../../../packages/error-page/index.wxml" />

<template is="error-page" data="{{ error:errorData }}"></template>
```

```js
import { ErrorPage } from 'path/packages/index';

// 在 Page 中导入 ErrorPage 里面声明的方法
Page(Object.assign({},
  ErrorPage,
  {
    // ...
  }
));
```

## 参数说明

```js
{
  flag: Boolean,    // true
  code: Number,     // 404
  message: String,  // NotFound
}
```

## 代码演示

- 在页面中直接调用 this.showErrorPage 即可

```js
this.showErrorPage({
  flag: true,
  code: 500,
  message: 'Server Error',
});
```
