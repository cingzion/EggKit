'use strict';
/**
 * 管理员控制器
 */
const BaseController = require('./base');

// ManagerController 继承 base.js 里的 BaseController 方法
class ManagerController extends BaseController {
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

    // ctx.body = '管理员增加';

    await ctx.render('admin/manager/add');
  }

  // 管理员编辑
  async edit() {
    const { ctx } = this;

    // ctx.body = '管理员编辑';
    await ctx.render('admin/manager/edit');
  }

}

module.exports = ManagerController;
