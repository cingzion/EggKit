'use strict';

/**
 * 创建操作数据库 model 模型
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 当前的时间戳
  const d = new Date();

  const AdminSchema = new Schema({
    username: { type: String }, // 用户名
    password: { type: String }, // 密码
    mobile: { type: String }, // 手机号
    email: { type: String }, // 邮箱
    status: { type: Number, default: 1 }, // 状态
    role_id: { type: Schema.Types.ObjectId }, // 角色 id
    add_time: {
      type: Number,
      default: d.getTime(),
    }, // 时间
    is_super: { type: Number, default: 0 }, // 是不是超级管理员，1 表示超级管理员

  });

  return mongoose.model('Admin', AdminSchema, 'admin');
};

