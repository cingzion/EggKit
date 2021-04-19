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


### 14 Egg.js【路由进阶】路由的几种写法、路由重定向、路由分组（路由映射）

### 路由的几种写法

- 第一种是 中间件 的写法
```js
module.exports = app => {
    const { router, controller } = app;
    
    // 路由中获取中间件的写法
    const auth = app.middleware.auth({title: 'this is router.js middleware'});
    // router.get(参数1是路由，参数2是中间件，参数2是中间件, 参数3是控制器, )
    // 说明，中间件可以加载多个
    router.get('/admin/user', auth, controller.admin.user.index);
    
}
```


- 第一种是给路由启一个名字
```js
module.exports = app => {
    const { router, controller } = app;
    /**
     * router.get(
     *      'user',                     // 这是给路由起一个名字
     *      '/admin/user',              // 这是访问的路径
     *      auth,                       // 这是中间件
     *      controller.admin.user.index // 这是控制器
     * );
     */
    // 说明，中间件可以加载多个
    router.get('user', '/admin/user', auth, controller.admin.user.index);
    
}
```


#### 路由重定向

- 内部重定向
```js
// 路由内部得定向
  router.redirect(
    '/newsinfo', // 访问的路径
    '/jsonp', // 要重定向的路径
    302 // 重定向的状态码
  );

// 路由重定向
router.redirect('/user');
```
- 外部重定向
```js
this.ctx.redirect('/user');
```



#### 路由映射也叫分组