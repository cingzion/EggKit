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


### 10 Egg Session的使用 以及 Session的配置

- session 是一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而 session 保存在服务器上。

### session 配置
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

```

#### 设置 session
- app/controller/sessions.js
```js
'use strict';

const Controller = require('egg').Controller;

class SessionsController extends Controller {
  async index() {
    const { ctx } = this;
    // 设置 session 的值
    ctx.session.userInfo = {
      name: '张三丰',
      age: 66,
    };

    await ctx.render('sessions');

  }
}

module.exports = SessionsController;

```

#### 获取 session 
- app/controller/shop.js
```js

'use strict';

const Controller = require('egg').Controller;

class ShowController extends Controller {
  async index() {
    const { ctx } = this;

    // 获取 cookies 的信息
    const userInfo = ctx.cookies.get('username', {
      encrypt: true, // 获取的时候对 cookies 进行解密
    });


    // 获取中文的 cookies 的信息
    const zh = ctx.cookies.get('zh', {
      encrypt: true, // 获取的时候对 cookies 进行解密, 就可以获取中文 cookies 数据了
    });
    // 报错信息 AssertionError in  argument value is invalid (code: ERR_ASSERTION)


    // 获取对象中的 cookies 的信息
    const resInfo = JSON.parse(ctx.cookies.get('resInfo', {
      encrypt: true,
    }));

    console.log('resInfo: ', resInfo);


    // 获取 session
    const getSession = ctx.session.userInfo;

    await ctx.render('show', {
      title: '这是一个 Shop 的页面',
      userName: userInfo,
      zhInfo: zh,
      resInfo,
      getSession,
    });
  }

}

module.exports = ShowController;

```

#### 路由配置
- app/router.js
```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/loginOut', controller.home.loginOut);
  router.get('/news', controller.news.index);
  router.get('/shop', controller.shop.index);
  router.get('/sessions', controller.sessions.index);
};

```

#### Html 页面获取 session
- app/vies/show.html
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>news</title>
</head>
<body>
    <h1><%= title %></h1>
    <h3>show用户名： <%= userName %></h3>
    <h3>中文的用户名： <%= zhInfo %></h3>
    <div>
        <p>用户名：<%= resInfo.name %></p>
        <p>年  龄：<%= resInfo.age %></p>
    </div>


    <div>
        <h3>获取session:</h3>
        <p>用户名：<%= getSession.name %></p>
        <p>年  龄：<%= getSession.age %></p>
    </div>

</body>
</html>

```