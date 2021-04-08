'use strict';

// 配置 egg-view.ejs 模板引擎插件
exports.ejs = {
  enable: true, // 是否使用 ejs 插件
  package: 'egg-view-ejs', // 使用的插件名
};

// 配置 egg-mongo-native mongodb数据库插件
exports.mongo = {
  enable: true, // 是否使用 egg-mongo-native 插件
  package: 'egg-mongo-native', // 使用的插件名
};
