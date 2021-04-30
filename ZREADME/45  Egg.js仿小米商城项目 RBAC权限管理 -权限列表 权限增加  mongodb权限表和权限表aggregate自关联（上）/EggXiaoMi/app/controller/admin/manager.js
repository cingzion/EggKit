'use strict';
/**
 * 管理员控制器
 */
const BaseController = require('./base');

// ManagerController 继承 base.js 里的 BaseController 方法
class ManagerController extends BaseController {
  // 管理员面列表
  async index() {
    const { ctx } = this;

    // 查询管理员表并管理角色表
    const result = await ctx.model.Admin.aggregate([{
      $lookup: { //
        from: 'role', // 这就是 admin 和 role 表关联，这里的 role 就是角色表
        localField: 'role_id', // admin 里表的角色 role_id 和 role角色表的role_id关联
        foreignField: '_id', // 这里的角色表的 id
        as: 'role', // 生成一个表 返回
      },
    }]);

    // ctx.body = '管理员面列表';
    await ctx.render('admin/manager/index', {
      list: result,
    });
  }

  // 管理员增加
  async add() {
    const { ctx } = this;

    // ctx.body = '管理员增加';
    // 获取查询数据库的角色
    const roleResult = await ctx.model.Role.find();

    await ctx.render('admin/manager/add', {
      roleResult,
    });
  }

  // 提交管理员数据保存
  async doAdd() {
    const { ctx } = this;

    const addRequest = ctx.request.body;
    addRequest.password = await this.service.tools.md5(addRequest.password);
    /*
    {
      _csrf: 'Dat8glX7-2aveFHLLH9-SWCeTACp2xfBFy2E',
      username: 'zhangsan',
      password: '123456',
      mobile: '18888888888',
      email: '18888888888@163.com',
      role_id: '60839dacf6e88512ba7a0029'
    }

     */
    // 查询数据库的用户
    const addResultData = await ctx.model.Admin.find({ username: addRequest.username });
    // 判断用户是否存在，存在就不增加，不存在就增加
    if (addResultData.length > 0) {
      await this.error('/admin/manager/add', '此管理员已经存在');
    } else {
      const admin = await ctx.model.Admin(addRequest);
      admin.save();
      await this.success('/admin/manager', '增加用户成功');
    }


  }

  // 管理员编辑
  async edit() {
    const { ctx } = this;

    // 获取编辑的数据
    const id = ctx.request.query.id;

    // 查询数据库
    const adminResult = await ctx.model.Admin.find({ _id: id });


    // 获取查询数据库的角色
    const roleResult = await ctx.model.Role.find();

    // ctx.body = '管理员编辑';
    await ctx.render('admin/manager/edit', {
      adminResult: adminResult[0],
      roleResult,
    });
  }

  // 提交管理员数据保存
  async doEdit() {
    const { ctx } = this;
    console.log('===: ', ctx.request.body);

    const id = ctx.request.body.id;
    let password = ctx.request.body.password;
    const mobile = ctx.request.body.mobile;
    const email = ctx.request.body.email;
    const role_id = ctx.request.body.role_id;
    /*
    ===:  {
        _csrf: 'UES2O3KA-4gmI_3rUSOjFVbTXID8M546h-1w',
        _id: '60854233edb2281149244751',
        username: 'xiaomin',
        password: '123456',
        mobile: '18888888888',
        email: '18888888888@163.com',
        role_id: ''

    }

     */

    if (password) {
      // 如果密码存在，就修改
      password = await this.service.tools.md5(password);
      await ctx.model.Admin.updateOne({ _id: id }, {
        password,
        mobile,
        email,
        role_id,
      });
    } else {
      // 如果不存在，就不修改
      await ctx.model.Admin.updateOne({ _id: id }, {
        mobile,
        email,
        role_id,
      });
    }

    await this.success('/admin/manager', '修改用户信息成功');


  }
}

module.exports = ManagerController;
