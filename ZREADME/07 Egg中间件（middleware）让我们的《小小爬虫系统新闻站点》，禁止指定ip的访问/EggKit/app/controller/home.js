'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // 调用 extend 里面扩展的 application 的方法
    const foo = this.app.foo(999);
    console.log('foo====: ', foo);

    // 调用 extend 里面扩展的 context 上下文进的方法
    const getHost = ctx.getHost();
    console.log('getHost: ', getHost);
    // getHost:  127.0.0.1:7001

    // 调用 extend 里面扩展的 helper 的方法
    const helperData = ctx.helper.getHelperData();
    console.log('helperData: ', helperData);


    // 注意这里是异步的，一定要在前面加  await
    await ctx.render('index', {
      title: '这是一个首页',
    });
  }
}

module.exports = HomeController;
