'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index() {

    const { ctx } = this;

    ctx.body = '后台商品管理列表';

  }

  async add() {
    const { ctx } = this;
    ctx.body = '后台增加商品';
  }

  async edit() {
    const { ctx } = this;

    ctx.body = '后台商品编辑';
  }
}
module.exports = ProductController;
