'use strict';
/**
 * 权限管理的 model
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();

  const AccessSchema = new Schema({
    module_name: { type: String }, // 模块名称
    action_name: { type: String }, // 操作名称
    type: { type: Number }, // 节点类型：1、表示模块， 2、表示菜单、3、操作
    url: { type: String }, // 连接
    module_id: { // 此 module_id 和 当前的模型的 _id 关联， module_id=0 表示模块
      type: Schema.Types.Mixed, // 混合类型
    },
    sort: { // 排序
      type: Number,
      default: 100,
    },
    description: { type: String }, // 描述
    status: { // 状态
      type: Number,
      default: 1,
    },
    add_time: { // 添加时间
      type: Number,
      default: d.getTime(),
    },
  });

  return mongoose.model('Access', AccessSchema, 'access');
};
