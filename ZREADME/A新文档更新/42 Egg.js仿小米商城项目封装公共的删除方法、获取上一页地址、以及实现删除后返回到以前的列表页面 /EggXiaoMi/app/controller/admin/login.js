'use strict';

/**
 * 登录控制器
 */

const BaseController = require('./base');


// LoginController 继承 base.js 里的 BaseController 方法
class LoginController extends BaseController {
  // 登录
  async index() {
    const { ctx } = this;

    await ctx.render('admin/login');
  }

  // 执行登录的方法 POST 方法
  async doLogin() {

    // 登录流程
    /**
     * 注意：
     *    1、需要在前端页面用 JS 验证用户输入的信息是否正确
     *
     *    2、后台获取数据以后判断数据格式是否正确
     *
     *
     *
     *
     *
     *
     * 1、获取表单的数据
     *
     * 2、判断验证码是否正确
     *
     *    验证码正确
     *       1、要对表单面的密码进行 md5 加密    md5模块 yarn add md5
     *                                      1、安装  yarn add md5
     *                                      2、引入 md5， const md5 = require('md5')
     *                                      3、使用 md5(str); str 就是自定义的字符器
     *
     *       2、在用户表 (集合) 中查询当前用户是否存在   (mongoose 操作 mongodb 数据库)
     *           1、安装 yarn add egg-mongoose
     *           2、在 plugin.js 配置 egg-mongoose 数据库
     *              // plugin.js
     *              exports.mongoose = {
     *                  enable: true,
     *                  package: 'egg-mongoose'
     *              }
     *
     *          3、配置数据库连接地址 config.default.js
     *            // 配置 mongoose 连接 mongodb 数据库
     *                config.mongoose = {
     *                  client: {
     *                    url: 'mongodb://127.0.0.1/eggxiaomi',
     *                    options: {
     *
     *                    },
     *                  },
     *               };
     *
     *         4、创建操作数据库 model, admin.js
     *
     *
     *       3、如果数据库有此用户 (登录成功)：保存用户信息    跳转到后台管理系统
     *
     *       4、如果数据库有此用户 (登录失败)：跳转到登录页面
     *
     *
     *   验证码错误：跳转到登录页面，提示验证码错误
     *
     *
     *
     *
     */

    const name = this.ctx.request.body.username;// 表单提交过来的用户名
    const pws = await this.service.tools.md5(this.ctx.request.body.password); // 表单提交过来的密码  21232f297a57a5a743894a0e4a801fc3
    const code = this.ctx.request.body.verify;// 表单提交过来的验证码

    console.log('pws: ', pws);


    // 判断
    if (code.toUpperCase() === this.ctx.session.code.toUpperCase()) { // 大小写转换 toUpperCase
      // 成功
      const result = await this.ctx.model.Admin.find({ username: name, password: pws }); // 查询数据库
      console.log('========:', result);
      // 判断数据库长度，是否存在有数据
      if (result.length > 0) { // 登录成功, 进行设置 session
        this.ctx.session.userinfo = result[0]; // 1、保存用户信息
        await this.ctx.redirect('/admin/manager');// 2、跳转到用户中心
      } else {
        await this.error('/admin/login', '用户名或者密码不对');
      }


    } else {
      // 失败: 注意以下是 异步的方法，一定要加 await
      await this.error('/admin/login', '验证码错误');
    }

  }

  // 退出登录
  async loginOut() {
    const { ctx } = this;
    ctx.session.userinfo = null;
    // 调用 BaseController 里的 success 成功的方法
    await ctx.redirect('/admin/login');
  }
}

module.exports = LoginController;
