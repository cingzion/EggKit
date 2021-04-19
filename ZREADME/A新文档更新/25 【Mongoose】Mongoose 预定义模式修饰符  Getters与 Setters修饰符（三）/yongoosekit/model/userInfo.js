const mongoose = require('./db');

const UserInfoSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true, // 定义 mongoose 模式修饰符 去掉前后空格
        get(params) { //  不建议使用
            return `AC001-${params}`;

        }
    },
    age: Number,
    status: {
        type: Number,
        default: 1
    }
});


module.exports = mongoose.model('UserInfo', UserInfoSchema, 'userinfo')
