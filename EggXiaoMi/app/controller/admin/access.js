'use strict';

/**
 * 权限控制器
 */

const Controller = require('egg').Controller;

class AccessController extends Controller {
  // 权限列表
  async index() {
    const { ctx } = this;

    // ctx.body = '权限列表';

    await ctx.render('user', {
      title: '权限列表',
    });
  }

  // 权限增加
  async add() {
    const { ctx } = this;

    ctx.body = '权限增加';
  }

  // 权限编辑
  async edit() {
    const { ctx } = this;

    ctx.body = '权限编辑';
  }

  // 权限删除
  async delete() {
    const { ctx } = this;

    ctx.body = '权限删除';
  }
}

module.exports = AccessController;
