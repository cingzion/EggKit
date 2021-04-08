/**
 * 模块化封装
 */

// 引入 mongoose 模块
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://eggadmin:123456@localhost:27017/eggcms',
    {useUnifiedTopology: true },
    (err) => {
        if(err) {
            console.log('连接数据库失败');
            return false;
        }

        console.log('连接数据库成功')
    }
);

module.exports = mongoose;
