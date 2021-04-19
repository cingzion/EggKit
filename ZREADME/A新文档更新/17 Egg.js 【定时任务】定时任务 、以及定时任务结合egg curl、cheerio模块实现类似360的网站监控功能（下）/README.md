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


### 17 Egg.js 【定时任务】定时任务 、以及定时任务结合egg curl、cheerio模块实现类似360的网站监控功能（下）

#### cheerio 爬虫内容
- 服务接口 api/service/spider.js
```js
'use strict';

// 写一个爬虫任务
const Service = require('egg').Service;

class SpiderService extends Service {
  async requestUrl(url) {
    const { ctx } = this;

    const result = await ctx.curl(url);
    return result;


  }
}

module.exports = SpiderService;

```


- 爬虫内容 app/schedule/schedule.js
```js
'use strict';

const Subscription = require('egg').Subscription;
const cheerio = require('cheerio');

/**
 * cheerio 模块的使用
 * 1、安装 yarn add cheerio
 *
 * 2、导入模块 const cheerio = require('cheerio');
 *
 * 3、加载解析的内容 const $ = cheerio.load('<h2 class="title">Hello world</h2>');
 *
 * 4、用法 $('title').html(); 获取要匹配的标题的内容
 *
 * 5、获取汉子是乱码处理
 *   第一个参数是解析的内容
 *   在我们第二个参数设置 decodeEntities: false,
 *   const $ = cheerio.load('<h2 class="title">Hello world</h2>', {decodeEntities: false});
 *
 * 检测域名的一个定时任务
*/
class WatchDoMainSubscription extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '5s', // 5 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this;

    // 调用 service 里面服务的方法
    // 1、抓取网站内容
    const url = 'https://news.baidu.com/';
    const resulet = await ctx.service.spider.requestUrl(url);
    // console.log('resulet:', resulet.data.toString());

    const htmlData = resulet.data.toString();

    // 2、解析数据
    // 检测网站是否被篡改，检测网站是否挂掉
    // 判断这个 <title>百度新闻——海量中文资讯平台</title>
    const $ = cheerio.load(htmlData, { decodeEntities: false });

    // 3、获取title的内容
    const title = $('title').html();
    // console.log('title:', title);

    // 4、判断 标题是不是相等 检测网站是否被篡改，检测网站是否挂掉
    if (title !== '百度新闻——海量中文资讯平台') {
      console.log('网站挂掉了或者被修改了');
    } else {
      console.log('一切正常');
    }

    $('.hotnews a').each(function() {
      const htmlText = $(this).html();
      console.log('htmlText:', htmlText);
    });


  }
}

module.exports = WatchDoMainSubscription;

```
