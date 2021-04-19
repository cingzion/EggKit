'use strict';


const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx, app } = this;

    // 数据库的操作

    // TODO: 1、查找
    // const result = await app.mongo.find('eggcms', { query: { name: '这是一个eggcms数据库' } });
    // console.log('数据库查找：', result); // 数据库查找： [ { _id: 606b47b496e12121965d6403, name: '这是一个eggcms数据库' } ]


    // TODO: 2、增加
    /* await app.mongo.insertOne('eggcms', {
      doc: {
        name: '赵六',
        age: 25,
        sex: 1,
      },
    });*/
    /* const res = await app.mongo.insertOne('eggcms', {
      doc: {
        name: '王五',
        age: 20,
        sex: 1,
      },
    });

    console.log('增加：', res);
    //  ops: [ { name: '王五', age: 20, sex: 1, _id: 606be65f52b8e631b62bb1fd } ],
    */

    // TODO: 3、更新数据
    /* const res = await app.mongo.findOneAndUpdate('eggcms', {
      filter: { name: '王五' },
      update: {
        $set: {
          name: '王二麻子',
          age: 30,
        },
      },
    });
    console.log('更新数据：', res);

    更新数据： {
      lastErrorObject: { n: 1 },
      value: { _id: 606be65f52b8e631b62bb1fd, name: '王五', age: 20, sex: 1 },
      ok: 1
    }*/

    // TODO: 4、删除数据
    /* const res = await app.mongo.findOneAndDelete('eggcms', {
      filter: {
        name: '这是一个eggcms数据库',
      },
    });

    console.log('删除数据：', res);

    删除数据： {
      lastErrorObject: { n: 1 },
      value: { _id: 606b47b496e12121965d6403, name: '这是一个eggcms数据库' },
      ok: 1
    }*/

    // TODO: 5、查证指定id的数据，删除指定 _id指定的数据
    const res = await app.mongo.find('eggcms', { query: { _id: app.getObjectID('606be93dbb03463317c49af4') } });
    console.log('res', res);
    // res [ { _id: 606be93dbb03463317c49af4, name: '王五', age: 20, sex: 1 } ]


    ctx.body = '新闻页面';
  }
}

module.exports = NewsController;
