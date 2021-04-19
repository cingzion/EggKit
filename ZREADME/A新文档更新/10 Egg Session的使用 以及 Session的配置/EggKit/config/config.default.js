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
  // config.middleware = [ 'printdate', 'forbidip' ];
  config.middleware = [ 'printdate', 'auth' ];
  // 给 printdate 中间件里传入的参数
  config.printdate = {
    aaa: 'aaaa',
  };

  // 要屏蔽的中间件 ip 如下
  config.forbidip = {
    forbidips: [
      '127.0.0.1',
      '192.168.8.102',
    ],
  };


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

  // 配置 session
  /**
   * session 的配置和 cookies 是一样的，
   * 可以使用 cookie 里面面的配置
   *
   *
   * renew: true, 如果 在 maxAge: 1000 * 30 * 60, // 设置30分钟，为过期时间的时候
   * 我们在 30分钟内操作，就不会过期 ，如果超过了 30 分钟后，就会过期，要过重新登录，这个
   * 主要是用于用户登录使用
   * @type {{maxAge: number, key: string}}
   */
  config.session = {
    key: 'SESSION_ID', // 设置 session cookie 里面的key
    maxAge: 1000 * 30 * 60, // 设置30分钟，为过期时间
    httpOnly: true, // 是否允许 js 操作 session  是 true / 否 false
    encrypt: true, // 是否加密，一般我们为加密的方式
    renew: true, // 延长会话有效期， 如果 renew 等于 true, 那么每次刷新页面的时候  session 都会被延期
  };


  return {
    ...config,
    ...userConfig,
  };
};
