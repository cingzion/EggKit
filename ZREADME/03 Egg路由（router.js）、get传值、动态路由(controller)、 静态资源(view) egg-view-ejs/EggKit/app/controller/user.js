'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;

    await ctx.render('user.html', {
      title: '这是一个用户页面',
    });
  }
}

module.exports = UserController;
