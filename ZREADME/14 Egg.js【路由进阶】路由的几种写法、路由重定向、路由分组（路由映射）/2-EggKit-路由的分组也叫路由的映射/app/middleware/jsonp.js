'use strict';

// 配置 koa 的 jsonp 中间件
/**
 * Egg.js 的中间件生态基于 koa
 *
 * 1、安装 yarn add koa-jsonp
 *
 * 2、在 middleware 文件夹下面新建一个 jsonp.js
 *
 * 3、在 jsonp.js 中引入 koa-jsonp 并且通过 module.exports 暴露
 *    module.exports = require('koa-jsonp')
 *
 * 4、在 config.default.js 中配置 jsonp 中间件
 *    config.middleware = ['jsonp'];
 *
 * @type {*|{}}
 */


// 第一种写法 推荐这种写法
module.exports = require('koa-jsonp');
// 第二种写法
// const jsonp = require('koa-jsonp');
// module.exports = jsonp;
