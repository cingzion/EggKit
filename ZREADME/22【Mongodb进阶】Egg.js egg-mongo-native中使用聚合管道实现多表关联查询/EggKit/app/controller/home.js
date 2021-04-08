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

  // 查询一个订单
  async oder() {
    const { ctx } = this;
    /*
      db.order.aggregate([
        {
          $lookup: {
            from: 'order_item',
            localField: 'order_id',
            foreignField: 'order_id',
            as: 'items'
          }
        },
        {
          $match: {
            'all_price': {
              $gte: 90
            }
          }
        }
      ], {
        explain: true,
      })
     */

    // 在 nodejs 查询订单
    const result = await this.app.mongo.aggregate('order', {
      pipeline: [
        {
          $lookup:
              {
                from: 'order_item',
                localField: 'order_id',
                foreignField: 'order_id',
                as: 'items',
              },
        },
        {
          $match: { all_price: { $gte: 90 } },
        },
        {
          $limit: 2,
        },

      ],
      options: {},

    });

    console.log('result: ', result);

    ctx.body = result;

  }

}

module.exports = HomeController;
