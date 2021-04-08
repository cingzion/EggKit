'use strict';


const BaseController = require('../core/base');


// 继承 core 目录下的 base.js 里面封装 BaseController 的类
class UserController extends BaseController {
  // 用户登录
  async login() {
    const { ctx } = this;
    await ctx.render('login');
  }

  // 用户注册
  async register() {
    const { ctx } = this;
    await ctx.render('register');
  }

  // 登录成功
  async doLogin() {
    const { ctx } = this;
    console.log('登录成功:', ctx.request.body);
    // ctx.body = '登录成功';
    // 登录成功并跳转
    /* await ctx.render('public/success', {
      url: '/',
    });*/

    // 这是调用 core 目录下的 base.js 里面封装的方法
    await this.success('/login'); // 跳转到首页
  }

  // 注册成功
  async doRegister() {
    const { ctx } = this;
    console.log('注册成功:', ctx.request.body);
    // 注册成功并跳转
    /* await ctx.render('public/error', {
      url: '/',
    });*/

    // 这是调用 core 目录下的 base.js 里面封装的方法
    await this.error('/register'); // 跳转到首页
  }

}
module.exports = UserController;
