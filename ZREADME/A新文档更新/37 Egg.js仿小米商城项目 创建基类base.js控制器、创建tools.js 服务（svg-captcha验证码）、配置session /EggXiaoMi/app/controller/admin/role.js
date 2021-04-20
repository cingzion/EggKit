'use strict';
/**
 * 角色控制器
 */

const BaseController = require('./base');

// RoleController 继承 base.js 里的 BaseController 方法
class RoleController extends BaseController {
  // 角色列表
  async index() {
    const { ctx } = this;

    // ctx.body = '角色列表';
    await ctx.render('admin/role/index');
  }

  // 角色添加
  async add() {
    const { ctx } = this;

    // ctx.body = '角色添加';
    await ctx.render('admin/role/add');
  }

  // 角色编辑
  async edit() {
    const { ctx } = this;

    // ctx.body = '角色编辑';
    await ctx.render('admin/role/edit');
  }

  // 角色删除
  async delete() {
    const { ctx } = this;

    ctx.body = '角色删除';
  }

}

module.exports = RoleController;
