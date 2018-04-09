# Toast 提示

## 使用指南

- 在 app.wxss 中导入 packages 的所有样式

```css
@import "path/packages/index.wxss";
```

- 在页面中导入组件的模板和脚本

```html
<import src="path/packages/toast/index.wxml" />

<template is="toast" data="{{ toast }}"></template>
```

```js
import { Toast } from 'path/packages/index';

// 在 Page 中导入 Toast 里面声明的方法
Page(Object.assign({},
  Toast,
  {
    // ...
  }
));
```

## 参数说明

```js
{
  title: String,    // toast的内容
  type: String,     // wraning,error
  timeout: Number,  // 3000毫秒
}
```

## 代码演示

- 在页面中直接调用 this.showToast 即可

```js
this.showToast('toast的内容', 'error');
```
