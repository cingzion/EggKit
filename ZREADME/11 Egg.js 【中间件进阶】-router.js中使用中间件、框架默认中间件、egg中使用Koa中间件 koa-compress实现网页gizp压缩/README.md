# Egg.js 是一个 MVC 框架
```
Egg.js 是一个 MVC 框架


view视频   视图、模板、页面的展示

controller控制器   负责处理一些业务逻辑的处理(简单业务逻辑处理)

model模型(service)    和数据打交道(查询数据库、操作数据库数据、请求数据)、(复杂的业务逻辑、以及数据操作)


更适合团队开发、业务逻辑清晰、有利于开发和维护

egg.Controller，会有下面几个属性挂在 this 上。

  this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
  this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
  this.service：应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
  this.config：应用运行时的配置项。
  this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。



```


### 11 Egg.js 【中间件进阶】-router.js中使用中间件、框架默认中间件、egg中使用Koa中间件 koa-compress实现网页gizp压缩

#### 1、在路由中使用中间件
- 中间件：app/middleware/user.js
```js
'use strict';

module.exports = (option, app) => {
  return async (ctx, next) => {
    // 实现中间件的功能
    console.log('打印日期：', new Date());

    console.log('打印中间件传参数：', option);
    await next();
  };
};

```

#### 2、在路由中使用中间件如下
- app/router.js
```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 在路由中获取中间件
  /**
   * 这里传了参数
   */
  const user = app.middleware.user({ title: 'this is router.js中间件' });
  router.get('/', user, controller.home.index); // 路由中使用中间件
};
```


#### 在 Eegg.js中使用 koa-jsonp 中间件
- 1、安装中间件：yarn add koa-jsonp
- 2、在 middleware 目录下面创建一个自定义的文件名: jsonp.js
- 3、打开 jsonp.js 进行导入使用
```js
'use strict';

// 配置 koa 的 jsonp 中间件
// 第一种写法 推荐这种写法
// module.exports = require('koa-jsonp');
// 第二种写法
const jsonp = require('koa-jsonp');
module.exports = jsonp;

```
- 4、在 config 目录下配置 jsonp.js 的中间件
- config/config.default.js
```js

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
  config.middleware = [ 'printdate', 'auth', 'jsonp' ];
  // 给 printdate 中间件里传入的参数
  config.printdate = {
    aaa: 'aaaa',
  };

  // 给中间件传参数
  config.auth = {
    title: '这是一个验证的中间件Auth',
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

```

#### 更详情的说明
- app/controller/jsonp.js
```js
'use strict';

// 配置 koa 的 jsonp 中间件
/**
 * Egg.js 的中间件生态基于 koa
 *
 * 1、安装 yarn add koa-jsonp
 *
 * 2、在 middleware 文件夹下面新建一个 jsonp.js
 *
 * 3、在 jsonp.js 中引入 koa-jsonp 并且通过 module.exports 暴露
 *    module.exports = require('koa-jsonp')
 *
 * 4、在 config.default.js 中配置 jsonp 中间件
 *    config.middleware = ['jsonp'];
 *
 * @type {*|{}}
 */


// 第一种写法 推荐这种写法
module.exports = require('koa-jsonp');
// 第二种写法
// const jsonp = require('koa-jsonp');
// module.exports = jsonp;

```



#### 开启页面的压缩，提高网站页面访问速度及性能
- 1、安装 yarn add koa-compress
- 2、在 middleware 目录下创建一个 compress.js 文件
- 3、使用中间件
```js
'use strict';
// 配置 Kon -compress 中间件,
/**
 * 在 Egg.js 中使用 koa-compress 开启压缩
 * @type {function(*=): function(*, *): Promise<undefined>}
 */
module.exports = require('koa-compress');
```
- 4、配置中件间
- config/config.default.js
```js

config.middleware = [ 'printdate', 'auth', 'jsonp', 'compress' ];


// 对 compress 中间件增加一些参数
/**
 * 开启 gzip 压缩
 * @type {{threshold: number}}
 */
config.compress = {
    threshold: 1024, // 它的默认就是1024， 它支持指定只有当有当 body 大于配置的 threshold 时才进行 gzip 压缩
};

```


#### 非标准的中间件的配置
- app/middleware/compress.js
```js

// koa中的非标准的中间件配置
/*
const Middleware = require('some-koa-moddleware');
app.use(Middleware(options.compiler, options.xxx));
*/

// egg.js 中非标准的中间件配置
/*
const Middleware = require('some-koa-moddleware');
module.exports = (option, app) => {
  return Middleware(options.compiler, options.xxx);
};
*/
```

