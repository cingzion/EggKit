'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    await ctx.render('home', {
      title: '你好! 我是Egg!!!',
    })
    
    // ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
