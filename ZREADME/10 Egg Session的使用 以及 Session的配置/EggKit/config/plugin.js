'use strict';

/** @type Egg.EggPlugin */
/* module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};*/

// 配置 egg-view.ejs 模板引擎插件
exports.ejs = {
  enable: true, // 是否使用 ejs 插件
  package: 'egg-view-ejs',
};
