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

  // 清除 cookies
  async loginOut() {
    const { ctx } = this;
    // 清理 cookies
    ctx.cookies.set('username', null); // 将 cookies 的值设置为 null 就是清除 cookie

    // 清理成功后，进行跳转到 /shop 这个路径去
    ctx.redirect('/shop'); // 路由跳转

  }
}

module.exports = HomeController;
