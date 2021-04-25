'use strict';

/**
 * 创建操作数据库 model 模型
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 当前的时间戳
  const d = new Date();

  const RoleSchema = new Schema({
    title: { type: String }, // 标题
    description: { type: String }, // 说明
    status: { type: Number, default: 1 }, // 状态
    add_time: {
      type: Number,
      default: d.getTime(),
    }, // 时间

  });

  return mongoose.model('Role', RoleSchema, 'role');
};

