# Cube 微信小程序开发平台

> 基于 cube 的微信小程序快速开发平台

## 目录结构

* [简介](#简介)
* [项目目录结构](#项目目录结构)
* [快速开始](#快速开始)
* [前端页面](#前端页面)
* [后端 Api](#后端-api)
* [贡献者](#贡献者)
  * [首席维护](#首席维护)
  * [核心开发](#核心开发)


## 简介

Cube Admin 微信小程序开发平台，旨在基于 Cube 平台，实现一种快速的小程序开发指南和规范．有关于更多的小程序开发知识请参见 [官方文档]．

## 项目目录结构

```
wxapp                          根目录
├── app
│   └── pages　　　　　　　　　　　前端页面
│       ├── form               表单页面
│       │   ├── index.js       页面逻辑
│       │   ├── index.json　　　页面配置
│       │   ├── index.wxml　　　页面模板
│       │   └── index.wxss　　　页面样式
│       └── list　　　　　　　　　list 页面
|
├── app.js　　　　　　　　　　　　 全局入口 js
├── app.json　　　　　　　　　　　 小程序的全局配置
├── app.wxss　　　　　　　　　　　 全局样式
├── assets　　　　　　　　　　　　 静态文件目录
│   └── images                 图片文件
|
├── packages　　　　　　　　　　　 公共组件
│   ├── common
│   ├── index.js               公共组件入口
|   ├── error-page             错误页面
│   └── toast　　　　　　　　　　　消息提示组件
|
└── utils　　　　　　　　　　　　  工具配置目录
    ├── api.js                 api 配置
    ├── common.js　　　　　　　　 常用方法
    ├── config　　　　　　　　　　 配置目录
    │   ├── config-common.js
    │   ├── config-development.js　　生产环境配置
    │   ├── config-production.js　　 正式环境配置
    │   └── index.js
    ├── index.js　　　　　　　　工具配置文件入口
    └── request.js　　　　　　 请求方法的封装
```

## 快速开始

* **新建项目**

  打开微信开发平台，点击右上角项目，选择新建项目，然后选择项目目录为 `wxapp` 目录．就可以开始愉快的开发了（你需要申请自己的 AppID）;

* **项目开发**

  * 启动后端服务：打开 Cube Admin server 目录，执行  `yarn start` 命令来启动后端服务；
  * api 配置：开发过程中需要的 api 都可以在 `utils/api.js` 文件里面配置；
  * 后端文件位置：后端文件位于 Cube Admin `server/src/wxapp` 目录下面．

* **项目发布**

  开发完成后，点击微信开发平台右上角上传按钮，即可完成上传；注意：上传之前确定将 app 切换到正式模式(将　`utils/config/index.js` 里的 `debug` 设为 `false`)．
  上传后并没有发布，还需要在微信小程序管理后台进行审核等操作后才可以正式发布．

## 前端页面

* **文件位置**

  前端页面都写在 `pages` 目录下面，并确保每个页面一个文件夹，每个页面文件拥有相同的文件名；

* **文件概述**

  * index.js

    页面脚本逻辑文件，一个服务仅仅只有界面展示是不够的，还需要和用户做交互：响应用户的点击、获取用户的位置等等。在小程序里边，我们就通过编写 JS 脚本文件来处理用户的操作．

  * index.wxml

    页面模板文件， WXML 充当的就是类似 HTML 的角色。同时提供了许多自己定的标签和类似 ejs 的模板语法．

  * index.wxss

    页面样式文件，WXSS 具有 CSS 大部分的特性，小程序在 WXSS 也做了一些扩充和修改。局部页面样式 `index.wxss` 仅对当前页面生效。如果你想定义全局样式需要在 `app.wxss` 里定义；

  * index.json

    每个页面的配置文件，可以配置页面顶部标题，颜色,是否允许下拉刷新等等．

* **项目配置**

  每个页面路径都需要在 `app.json` 的 `pages` 数组写出，这是为了让微信客户端知道当前你的小程序页面定义在哪个目录。

## 后端 Api

> 微信小程序发布后相当于只是发布了我们的前端页面，所以我们还需要在后端启动我们的 api 服务．

* **api 配置**

  * 在 `utils/api.js` 里配置 api 地址，方便进行修改；
  * 在 `utils/config/config-development.js` 和 `config-production.js`里指定开发和线上环境的后端服务器地址；

* **新增 api**

  在 `server/src/wxapp` 下新增后端 api 服务；

* **环境切换**

  通过将 `utils/config/index.js` 里的 `debug` 设为 `true` 或　`false` 来快速切换开发环境和线上环境服务器地址．

## 贡献者

### 首席维护

 [曹磊](https://gitlab.intra.knownsec.com/caol) <caol@knownsec.com>

  <a href="https://gitlab.intra.knownsec.com/caol" target="_blank"><img style="border-radius:50%" src="https://gitlab.intra.knownsec.com/uploads/-/system/user/avatar/466/avatar.png"></a>

### 核心开发

* [曹磊](https://gitlab.intra.knownsec.com/caol) <caol@knownsec.com>
* [张恒](https://gitlab.intra.knownsec.com/zhangh5) <zhangh5@knownsec.com>
* [谢鑫](https://gitlab.intra.knownsec.com/xiex2) <xiex2@knownsec.com>

[官方文档]:https://mp.weixin.qq.com/debug/wxadoc/dev/quickstart/basic/getting-started.html