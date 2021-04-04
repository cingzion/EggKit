'use strict';

const Controller = require('egg').Controller;

class ShowController extends Controller {
  async index() {
    const { ctx } = this;

    // 获取 cookies 的信息
    const userInfo = ctx.cookies.get('username', {
      encrypt: true, // 获取的时候对 cookies 进行解密
    });


    // 获取中文的 cookies 的信息
    const zh = ctx.cookies.get('zh', {
      encrypt: true, // 获取的时候对 cookies 进行解密, 就可以获取中文 cookies 数据了
    });
    // 报错信息 AssertionError in  argument value is invalid (code: ERR_ASSERTION)


    // 获取对象中的 cookies 的信息
    const resInfo = JSON.parse(ctx.cookies.get('resInfo', {
      encrypt: true,
    }));

    console.log('resInfo: ', resInfo);

    await ctx.render('show', {
      title: '这是一个 Shop 的页面',
      userName: userInfo,
      zhInfo: zh,
      resInfo,
    });
  }

}

module.exports = ShowController;
