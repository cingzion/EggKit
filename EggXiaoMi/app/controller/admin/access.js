'use strict';

/**
 * 权限控制器
 */

const BaseController = require('./base');

// AccessController 继承 base.js 里的 BaseController 方法
class AccessController extends BaseController {
  // 权限列表
  async index() {
    const { ctx } = this;

    // ctx.body = '权限列表';

    await ctx.render('admin/access/index');
  }

  // 权限增加
  async add() {
    const { ctx } = this;

    // ctx.body = '权限增加';
    await ctx.render('admin/access/add');
  }

  // 权限编辑
  async edit() {
    const { ctx } = this;

    // ctx.body = '权限编辑';
    await ctx.render('admin/access/edit');
  }

  // 权限删除
  async delete() {
    const { ctx } = this;

    ctx.body = '权限删除';
  }
}

module.exports = AccessController;