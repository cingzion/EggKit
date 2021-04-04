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


### 09 Egg Cookie的使用、 Cookie的配置 、设置中文Cookie 

#### 1、设置 cookies
```js
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // 在首页设置一个 cookies 值
    /**
     * cookie：
     * 1、可以实现同一个浏览器访问同一个域的时候，不同页面之间的数据共享
     *
     * 2、可以实现数据的持久化(也就是关闭浏览器重新撕开以后数据还存在)
     *
     *
     * cookies.set(key, value, options);
     *  key 第一个参数代表设置 cookies 的名称
     *  value 第二个参代表设置 cookies 的值
     *  options 第三个参代表设置 cookies 过期时间，加密，是否允许前端操作 cookies
     *
     *
     * 默认情况 cookies 当浏览器关闭以后就会自动销毁
     * this.ctx.cookies.set('username', 'zhangsan')
     *
     *
     * 注意：默认情况下面 egg.js 里面的 cookies 没法设置中文
     */
    this.ctx.cookies.set('username', 'zhansan', {
      maxAge: 1000 * 3600 * 24, // cookie 存储一天， 设置过期时间后关闭浏览器重新打开 cookie 还存在
      httpOnly: true, // 设置 true, 允许在浏览中 js 可以操作 cookies
      signed: true, // 对 cookies 进行签名，防止用户修改 cookie
      encrypt: true, // 对 cookies 进行加密，获取的时候，需要进行解密
    });


    // 注意：默认情况下面 egg.js 里面的 cookies 没法设置中文
    /**
     * 如果在获取中文的 cookies 的时候报错，就需要设置第三个参数
     *
     * 如果 cookies 加密以后就可以设置 中文cookie ( encrypt: true)
     *
     */
    ctx.cookies.set('zh', '张三', {
      maxAge: 1000 * 3600 * 24, // cookie 存储一天， 设置过期时间后关闭浏览器重新打开 cookie 还存在
      httpOnly: true, // 设置 true, 允许在浏览中 js 可以操作 cookies
      signed: true, // 对 cookies 进行签名，防止用户修改 cookie
      encrypt: true, // 对 cookies 进行加密，获取的时候，需要进行解密, 如果 cookies 加密以后就可以设置 中文cookie ( encrypt: true)
    });


    // 在 cookies 里设置对象
    const obj = JSON.stringify({ name: '张三', age: 18 });

    ctx.cookies.set('resInfo', obj, {
      maxAge: 1000 * 3600 * 24,
      httpOnly: true,
      signed: true,
      encrypt: true,
    });


    // 注意这里是异步的，一定要在前面加  await
    await ctx.render('home', {
      title: '这是一个首页',
    });
  }
}

module.exports = HomeController;

```

#### 2、获取 cookies
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

    await ctx.render('show', {
      title: '这是一个 Shop 的页面',
      userName: userInfo,
      zhInfo: zh,
      resInfo,
    });
  }
}

module.exports = ShowController;

```


#### 3、清除 cookie
- 清除 cookies 有两种方式
    - 第一种： this.ctx.cookies.set('name', null); // 将值设置为 null
    - 第二种： this.ctx.cookies.set('name', {}, {maxAge: 0}); 或者设置 maxAge 过期时间为 0
    ```js
    
    // 清除 cookies
      async loginOut() {
        const { ctx } = this;
        // 清理 cookies
        ctx.cookies.set('username', null); // 将 cookies 的值设置为 null 就是清除 cookie
    
        // 清理成功后，进行跳转到 /shop 这个路径去
        ctx.redirect('/shop'); // 路由跳转
    
      }
      
    ```   

#### 4、html 模板获取
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
</body>
</html>
```