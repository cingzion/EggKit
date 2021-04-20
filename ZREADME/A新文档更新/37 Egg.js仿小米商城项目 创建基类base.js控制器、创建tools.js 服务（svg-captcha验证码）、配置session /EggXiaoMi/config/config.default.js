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
  /**
   * 配置中间件
   * @type {string[]}
   */
  config.middleware = [ 'adminauth' ];
  config.adminauth = {
    match: '/admin', // 代表，只有后台才会使用中间件，其它都不会使用的
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 配置 session
  config.session = {
    key: 'SESSION_ID', // 自定义 session id名称
    maxAge: 864000, // 有效时间
    httpOnly: true, // session 的的 cookies 只有服务器端才能访问
    encrypt: true, // 对 session 进行加密
    renew: true, // 延长会话周期的有效期，比如：会话是 10s 钟，用户又到 9s 了，然又会给它增加一个 10s 的周期
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
    prefix: '/public/', // 配置静态目录
    dir: path.join(appInfo.baseDir, 'app/public'), // 静态资源存放的位置
  };


  return {
    ...config,
    ...userConfig,
  };
};
