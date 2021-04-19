'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  // 引入路由，这种叫路由的分组也叫路由的映射
  require('./routers/admin')(app);
  require('./routers/api')(app);
  require('./routers')(app);

};
