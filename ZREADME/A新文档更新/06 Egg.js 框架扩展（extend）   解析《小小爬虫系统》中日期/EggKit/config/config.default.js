/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1616862861429_6093';

  // add your middleware config here
  config.middleware = [];


  // 配置 使用 egg-view-ejs 模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
    root: [
      path.join(appInfo.baseDir, 'app/html'),
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 自定义配置公共的 API
  /**
   * 下面定义一个接口的址
   */
  config.api = 'http://www.phonegap100.com';


  return {
    ...config,
    ...userConfig,
  };
};
