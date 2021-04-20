'use strict';

/** @type Egg.EggPlugin */
/* module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};*/

// 配置 nunjucks 模板引擎
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};


// 配置 ejs 模板引擎
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
