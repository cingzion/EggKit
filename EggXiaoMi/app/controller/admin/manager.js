'use strict';
/**
 * 管理员控制器
 */
const Controller = require('egg').Controller;

class ManagerController extends Controller {
  // 管理员面列表
  async index() {
    const { ctx } = this;

    // ctx.body = '管理员面列表';
    await ctx.render('admin/manager/index', {
      userName: '张三',
    });
  }

  // 管理员增加
  async add() {
    const { ctx } = this;

    ctx.body = '管理员增加';
  }

  // 管理员编辑
  async edit() {
    const { ctx } = this;

    ctx.body = '管理员编辑';
  }

}

module.exports = ManagerController;
