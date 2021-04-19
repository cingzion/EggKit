'use strict';

const Controller = require('egg').Controller;

class SessionsController extends Controller {
  async index() {
    const { ctx } = this;
    // 设置 session 的值
    ctx.session.userInfo = {
      name: '张三丰',
      age: 66,
    };

    await ctx.render('sessions');

  }
}

module.exports = SessionsController;
