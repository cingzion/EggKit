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
  /**
   * 注意：地如果我们的 中间件的文件名是 admin_auth 是这样的时候，
   *      那么我们在下面加入中间件的是要把 admin_auth 改成 adminAuth 这样才能生效的，不然会报错
   *      所有的路由都会经过 adminAuth 这里
   * @type {string[]}
   */
  // config.middleware = [ 'printdate', 'auth', 'jsonp', 'compress', 'adminAuth' ];
  config.middleware = [ 'printdate', 'auth', 'jsonp', 'compress' ];
  // 给 printdate 中间件里传入的参数
  config.printdate = {
    aaa: 'aaaa',
  };

  // 给中间件传参数, 使用配置
  /**
   * 重点提示：
   *    match 和 ignore 只使用一个，不能两个一起使用
   * @type {{match: string, ignore: string, title: string}}
   */
  config.auth = {
    // match: '/news', // 通过访问指定的路由进行使用中间件，这种方式只能使用一个
    // ignore: '/news', // 如果你是 /news 这个页面我不让你匹配这个路由使用中间件
    match(ctx) { // 这种方式使用可以使用多个路由进行匹配
      /**
       *  ctx 就是一个上下文, 可以获取请求的地址
       *
       */
      const {
        request: {
          url,
        },
      } = ctx;
      console.log('ctxurl: ', ctx.request.url);
      if (url === '/shop' || url === '/news') {
        return true;
      }
      return false;

    },
    title: '这是一个验证的中间件Auth',
  };

  // 对 compress 中间件增加一些参数
  /**
   * 开启 gzip 压缩
   * @type {{threshold: number}}
   */
  config.compress = {
    // enable: false, // 通用是否开启
    threshold: 1024, // 它的默认就是1024， 它支持指定只有当有当 body 大于配置的 threshold 时才进行 gzip 压缩
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

  // 框架中间件的默认配置
  /**
   * 这是对我们前端 post 提交数据的一种限制大小
   * 提示：这里其实不需要管它，也不需要自行配置，这里只是说一下
   * @type {{jsonLimit: string}}
   */
  config.bodyParser = {
    jsonLimit: '10mb', // Default is 1mb
  };


  return {
    ...config,
    ...userConfig,
  };
};
