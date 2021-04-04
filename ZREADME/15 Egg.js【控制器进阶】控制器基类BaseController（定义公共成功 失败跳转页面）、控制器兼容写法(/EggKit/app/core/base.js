'use strict';

/**
 * 创建一个基类来继承
 *
 * 以下是封装一些方法
 */

const Controller = require('egg').Controller;

class BaseController extends Controller {
  // 获取用户的方法
  async getUserInfo() {
    return {
      name: '张三',
      age: 20,
    };
  }

  // 成功
  async success(redirectUrl) {
    const { ctx } = this;
    await ctx.render('public/success', {
      redirectUrl, // 成功跳转的地址
    });
  }

  // 失败
  async error(redirectUrl) {
    const { ctx } = this;
    await ctx.render('public/error', {
      redirectUrl, // 失败跳转的地址
    });
  }
}

module.exports = BaseController;
