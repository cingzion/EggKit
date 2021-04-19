'use strict';
// 配置 Kon -compress 中间件,
/**
 * 在 Egg.js 中使用 koa-compress 开启压缩
 * @type {function(*=): function(*, *): Promise<undefined>}
 */
module.exports = require('koa-compress');

// koa中的非标准的中间件配置
/*
const Middleware = require('some-koa-moddleware');
app.use(Middleware(options.compiler, options.xxx));
*/

// egg.js 中非标准的中间件配置
/*
const Middleware = require('some-koa-moddleware');
module.exports = (option, app) => {
  return Middleware(options.compiler, options.xxx);
};
*/

