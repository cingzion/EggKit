'use strict';

const Controller = require('egg').Controller;


class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;

    // 和数据库打交道建议放在服务里面
    // 这里是查询
    const res = await app.mongo.find('eggcms', { query: { _id: app.getObjectID('606be93dbb03463317c49af4') } });
    console.log('res', res);

    // 通过id删除数据库
    const result = await app.mongo.findOneAndDelete('eggcms', {
      filter: {
        _id: app.getObjectID('606be93dbb03463317c49af4'),
      },
    });

    console.log('通过id删除数据库:', result);

    const resultObj = await ctx.service.news.getNewsList();

    console.log('result: ', resultObj);
    ctx.body = '你好Egg';
  }

}

module.exports = HomeController;
