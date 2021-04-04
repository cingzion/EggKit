'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    // this.ctx.status=301;      //把重定向改为301

    // this.ctx.redirect('/shop');   //默认是临时重定向 302

    await this.ctx.render('news');
  }
}

module.exports = NewsController;
