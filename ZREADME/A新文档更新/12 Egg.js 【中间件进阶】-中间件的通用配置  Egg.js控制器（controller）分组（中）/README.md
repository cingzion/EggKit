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


### 12 Egg.js 【中间件进阶】-中间件的通用配置  Egg.js控制器（controller）分组（中）

#### 中间件通过配置
- config/config.default.js
```js
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
```