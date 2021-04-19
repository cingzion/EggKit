'use strict';

/** @type Egg.EggPlugin */
/* 
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
}; 
*/


// 配置 egg-view.ejs 模板引擎插件
exports.ejs = {
  enable: true, // 是否使用 egg-view-ejs 插件
  package: 'egg-view-ejs', // egg-view-ejs 包
};

// 配置 egg-mysql 数据库插件
exports.mysql = {
  enable: true, // 是否使用 egg-mysql 插件
  package: 'egg-mysql', // egg-mysql 包
};
