'use strict';
/**
 * 角色控制器
 */

const Controller = require('egg').Controller;

class RoleController extends Controller {
  // 角色列表
  async index() {
    const { ctx } = this;

    ctx.body = '角色列表';
  }

  // 角色添加
  async add() {
    const { ctx } = this;

    ctx.body = '角色添加';
  }

  // 角色编辑
  async edit() {
    const { ctx } = this;

    ctx.body = '角色编辑';
  }

  // 角色删除
  async delete() {
    const { ctx } = this;

    ctx.body = '角色删除';
  }

}

module.exports = RoleController;
