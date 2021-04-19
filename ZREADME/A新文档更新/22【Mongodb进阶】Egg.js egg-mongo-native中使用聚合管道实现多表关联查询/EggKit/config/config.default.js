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

  // add your middleware config here 增加配置中间件
  config.middleware = [ 'auth' ];

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


  // 手动配置静态资源目录
  config.static = {
    prefix: '/assets/', // 自定义伪目录
    dir: path.join(appInfo.baseDir, 'app/assets'), // 静态资源存放的位置
  };


  // 配置 mongo 数据库
  /**
   * db.createUser({user:'eggadmin',pwd:'123456',roles:[{role:'dbOwner',db:'eggcms'}]})
   */
  config.mongo = {
    client: {
      host: '127.0.0.1',
      port: '27017',
      name: 'eggcms',
      user: 'eggadmin',
      password: '123456',
      options: {},
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
