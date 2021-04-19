'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;

    // 获取 home 里设置的 cookies

    const userInfo = ctx.cookies.get('username', {
      encrypt: true, // 获取的时候对 cookies 进行解密
    });
    console.log('cookiesVal:', userInfo);
    await ctx.render('news', {
      title: '这是一个新闻页面',
      userName: userInfo,
    });


    /**
     * 对下是外部是重定向
     * @type {number}
     */
    // 把重定向改为 301 状态
    // ctx.status = 301; // 301 永久重定向

    // redirect 重定向，状态码是 302, 默认是临时是重定向 302
    // ctx.redirect('/'); // 跳转到首面了
  }

}

module.exports = NewsController;
