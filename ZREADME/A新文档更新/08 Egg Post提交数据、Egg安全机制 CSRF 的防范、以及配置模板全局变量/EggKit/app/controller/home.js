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

    console.log('访问中间件：', this);


    // 注意这里是异步的，一定要在前面加  await
    await ctx.render('index', {
      title: '这是一个首页',
      // csrf: ctx.csrf, // 可以在 middleware中间件 全局设置，安全机制，相当于， 当用户访问页面的时候生成一个密钥
    });
  }

  // 提交数据
  async add() {
    const { ctx } = this;

    // 接收前端 post 提交过来的数据
    const res = ctx.request.body;

    console.log('接收前端 post 提交过来的数据:', res);
    // {"status":200,"msg":"提交成功","data":{"username":"admin","password":"qqqq"}}


    ctx.body = {
      status: 200,
      msg: '提交成功',
      data: res,
    };

  }
}

module.exports = HomeController;
