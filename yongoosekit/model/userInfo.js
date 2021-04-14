const mongoose = require('./db');

const UserInfoSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true, // 定义 mongoose 模式修饰符 去掉前后空格
    },
    sn: {
        tyope: String,
        index: true, // 增加索引
    },
    age: Number,
    status: {
        type: Number,
        default: 1
    }
});


module.exports = mongoose.model('UserInfo', UserInfoSchema, 'userinfo')
 