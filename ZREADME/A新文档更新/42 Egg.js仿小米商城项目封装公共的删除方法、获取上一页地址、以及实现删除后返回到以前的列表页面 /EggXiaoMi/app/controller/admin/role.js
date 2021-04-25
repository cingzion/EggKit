'use strict';
/**
 * 角色控制器
 */

const BaseController = require('./base');

// RoleController 继承 base.js 里的 BaseController 方法
class RoleController extends BaseController {
  // 角色列表
  async index() {
    const { ctx } = this;

    // 查询数据库
    const result = await ctx.model.Role.find({});

    console.log('查询数据库:', result);

    // ctx.body = '角色列表';
    await ctx.render('admin/role/index', {
      list: result,
    });
  }

  // 角色添加
  async add() {
    const { ctx } = this;

    // ctx.body = '角色添加';
    await ctx.render('admin/role/add');
  }

  // 提交添加
  async doAdd() {
    const { ctx } = this;
    // 获取 post 传过来的数据
    console.log(ctx.request.body);

    // 保存到数据库中, 实例化
    const role = new ctx.model.Role({
      title: ctx.request.body.title, // 标题
      description: ctx.request.body.description, // 描述
    });

    await role.save(); // 注意：保存数据

    await this.success('/admin/role', '增加角色成功');

  }

  // 角色编辑
  async edit() {
    const { ctx } = this;

    // 获取查询的 id 值
    const id = ctx.query.id;
    console.log('id:', id);

    // 通过 id 去查询数据库
    const result = await ctx.model.Role.find({ _id: id });
    // ctx.body = '角色编辑';
    await ctx.render('admin/role/edit', {
      list: result[0],
    });
  }

  // 提交添加
  async doEdit() {
    const { ctx } = this;
    // 更新数据
    console.log(ctx.request.body);
    /*
    {
      _csrf: 'EIwEODwa-OoP-k7hliWHEGqzPmP1IT9cC4Vc',
      _id: '608190fb5b29751f3a3169ef',
      title: '网站编辑111',
      description: ' 网站编辑 111'
    }

     */

    // const _id = ctx.request.body._id;
    // const title = ctx.request.body.title;
    // const description = ctx.request.body.description;

    const {
      _id,
      title,
      description,
    } = ctx.request.body;


    // 更新数据库
    const result = await ctx.model.Role.updateOne({ _id }, {
      title,
      description,
    });

    // 判断
    if (result) {
      await this.success('/admin/role', '编辑角色成功');
    } else {
      await this.error('/admin/role', '编辑角色失败');
    }

  }

  // 角色删除
  async delete() {
    const { ctx } = this;

    ctx.body = '角色删除';
  }

}

module.exports = RoleController;
