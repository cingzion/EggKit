'use strict';

const Controller = require('egg').Controller;

class JsonpController extends Controller {
  async index() {
    const { ctx } = this;

    /**
     * 1、在浏览器地址上输入：http://127.0.0.1:7001/jsonp?callback=xxx
     * 2、使用了 jsonp 之后，就回返回如下数据
     *   ;xxx({"name":"这是一个json的页面"});
     *
     *   以上就是应用了 jsonp
     */

    ctx.body = {
      name: '这是一个json的页面',
    };
  }
}

module.exports = JsonpController;
