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


### 16 Egg.js 【定时任务】定时任务 、以及定时任务结合egg curl、cheerio模块实现类似360的网站监控功能（上）

#### 定时任务的几种写法
- app/schedule/spider.js
- app/schedule/watchfile.js
- 1、第一种写，推荐
```js
'use strict';
/**
 * 这里写的是一些爬虫的方法
 */

const k = 110;

// 第一种：定时任务的写法：
 module.exports = {
  schedule: {
    interval: '5s', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    // const res = await ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    // ++k;
    console.log('k: ', k);
    // console.log('cache: ', res.data);
    // ctx.app.cache = res.data;
  },
};
```
- 2、第二种写
```js
// 第二种：定时任务的写法：
module.exports = app => {
  return {
    schedule: {
      interval: '5s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      disable: true, // 配置该参数为 true 时，这个定时任务不会被启动。
    },
    async task(ctx) {
      // const res = await ctx.curl('http://www.api.com/cache', {
      //   dataType: 'json',
      // });
      // ++k;
      console.log('k: ', k);

      const list = await ctx.service.news.getNewsList();

      console.log('list:', list);
      // console.log('cache: ', res.data);
      // ctx.app.cache = res.data;
    },
  };
};
```
- 3、第三种写
```js
'use strict';

/**
 * 定时任务
 */

const Subscription = require('egg').Subscription;

// 第三种：定时任务的写法：
let i = 0;
class WatchFile extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {

    return {
      interval: '2s', // 多少秒
      type: 'all', // 指定所有的 worker(进程) 都需要执行
      disable: true, // 配置该参数为 true 时，这个定时任务不会被启动。
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  /**
   * 这个方法就是对 schedule() 这个定时任务的一个配置，
   * 每隔多少秒执行一次
   */
  async subscribe() {
    // 这里主是定时任务的执行操作
    // const { ctx } = this;
    /* const res = await ctx.curl('http://www.api.com/cache', {
      dataType: 'json',
    });*/
    // ctx.app.cache = res.data;
    ++i;
    console.log('i: ', i);

  }

}

module.exports = WatchFile;

```