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
  config.keys = appInfo.name + '_1618370899774_667';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  // 对 egg-view-ejs 视图以及 ejs 做简单的配置
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
    root: [
      path.join(appInfo.baseDir, 'app/html'),
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
  };

  // 对 egg-mysql 数据库连接进行配置
  config.mysql = {
    // database configuration
    client: {
      // host
      host: '127.0.0.1',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root2021',
      // database
      database: 'eggcms',  
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,

  };

  return {
    ...config,
    ...userConfig,
  };
};
