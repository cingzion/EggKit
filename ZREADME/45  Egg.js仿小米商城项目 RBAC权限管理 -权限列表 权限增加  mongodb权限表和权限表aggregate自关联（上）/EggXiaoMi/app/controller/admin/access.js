'use strict';

/**
 * 权限控制器
 */

const BaseController = require('./base');

// AccessController 继承 base.js 里的 BaseController 方法
class AccessController extends BaseController {
  // 权限列表
  async index() {
    const { ctx } = this;

    // ctx.body = '权限列表';

    // 显示全部数据-查询数据库
    // const result = await ctx.model.Access.find({});
    // console.log('result: ', result);

    // 1、在 Access 表中找出， module_id=0的数据        管理员管理    权限管理


    // 2、让 Access 表和 Access 表关联    条件：找出 Access 表中 module_id等于_id的数据
    
    const result = await ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',  // 关联 access 数据表
          localField: '_id',
          foreignField: 'module_id',
          as: 'items'
        }
      },
      {
        $match: { // 查找数据
          module_id: '0',
        }
      }
    ]);
    console.log('result: ', result);

    await ctx.render('admin/access/index', {
      list: result,
    });
  }

  // 权限增加
  async add() {
    const { ctx } = this;

    // 获取模块列表
    const result = await ctx.model.Access.find({ module_id: '0' });

    // ctx.body = '权限增加';
    await ctx.render('admin/access/add', {
      moduleList: result,
    });
  }
  // 保存权限增加
  async doAdd() {
    const { ctx } = this;

    // 获取表单传过来的数据
    const addResult = ctx.request.body;
    const module_id = addResult.module_id;

    // 如果菜单或者操作
    if (module_id) {
      addResult.module_id = this.app.mongoose.Types.ObjectId(module_id); // 调用  mongoose 里面的方法把字符串转换成 ObjectId
    }

    // 保存数据到数据库中
    const access = new ctx.model.Access(addResult);
    access.save();

    await this.success('/admin/access', '增加权限成功');
  }

  // 权限编辑
  async edit() {
    const { ctx } = this;

    // ctx.body = '权限编辑';
    await ctx.render('admin/access/edit');
  }

  // 权限删除
  async delete() {
    const { ctx } = this;

    ctx.body = '权限删除';
  }
}

module.exports = AccessController;
