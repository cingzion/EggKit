# 04 Egg静态资源 (view)、控制器（controller） 和 数据模型Model（Service） 和配置文件（config）


### 控制器可以调用多个服务，而控制器不相互调用控制器
### 服务可以相互调用，也可以调用多个服务
### 一个服务可以被多个控制器调用，一个控制器可以调用多个服务
### 自定义一个公共的配置，可以通过服务和制作器来调用

### 控制器 controller
- EggKit/app/controller/news.js
```js
'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;

    // 调用 service 服务里的方法
    const list = await ctx.service.news.getNewsList();
    const getUserInfo = await ctx.service.user.getUserInfo();

    const getSyncUserInfo = await ctx.service.syncUser.getSyncUserInfo();


    console.log('==============', getSyncUserInfo);
    console.log('res:', list);
    await ctx.render('news', {
      title: '这是一个新闻页面',
      list,
      getUserInfo,
    });
  }
}

module.exports = NewsController;

```

- EggKit/app/controller/user.js
```js

'use strict';

/**
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


 */

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;

    // 访问自定义一个公共的配置api
    console.log(this.config.api);

    // 调用 service 的服务
    const res = await ctx.service.news.getNewsList();

    await ctx.render('user.html', {
      title: '这是一个用户页面',
      list: res,
    });
  }
}

module.exports = UserController;


```

### 服务 service
- EggKit/app/service/news.js
```js
'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;

    // 调用 service 服务里的方法
    const list = await ctx.service.news.getNewsList();
    const getUserInfo = await ctx.service.user.getUserInfo();

    const getSyncUserInfo = await ctx.service.syncUser.getSyncUserInfo();


    console.log('==============', getSyncUserInfo);
    console.log('res:', list);
    await ctx.render('news', {
      title: '这是一个新闻页面',
      list,
      getUserInfo,
    });
  }
}

module.exports = NewsController;


```  

- EggKit/app/service/user.js
```js

'use strict';

/**
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


 */

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;

    // 访问自定义一个公共的配置api
    console.log(this.config.api);

    // 调用 service 的服务
    const res = await ctx.service.news.getNewsList();

    await ctx.render('user.html', {
      title: '这是一个用户页面',
      list: res,
    });
  }
}

module.exports = UserController;


```  
- EggKit/app/service/sync_user.js
```js

'use strict';

const Service = require('egg').Service;

class Sync_userService extends Service {
  async getSyncUserInfo() {
    console.log('1111');
  }
}

module.exports = Sync_userService;


```  


### 配置
- EggKit/config/config.default.js
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

  // add your middleware config here
  config.middleware = [];


  // 对 egg-view-ejs 视图以及ejs 做一下简单配置
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

  // 自定义一个公共的配置
  /**
   * 下面定义一个接口
   */
  config.api = 'http://www.itying.com/api';


  return {
    ...config,
    ...userConfig,
  };
};

```
