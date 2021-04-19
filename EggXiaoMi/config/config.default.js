/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618823366384_4948';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 配置 ejs 及 nunjucks 模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
      '.nj': 'nunjucks',
    },
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'app/html'),
    ].join(','),
  };

  // 配置静态文件目录
  config.static = {
    prefix: '/assets/', // 配置静态目录
    dir: path.join(appInfo.baseDir, 'app/assets'), // 静态资源存放的位置
  };


  return {
    ...config,
    ...userConfig,
  };
};
