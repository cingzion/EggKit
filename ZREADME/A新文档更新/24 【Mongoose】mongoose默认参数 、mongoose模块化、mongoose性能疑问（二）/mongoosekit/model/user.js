/**
 * 对用户表的操作
 */

const mongoose = require('./db');

// 以下对表的映射
const UserSchema = mongoose.Schema({
    name: Number,
    age: Number,
    status: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model('User', UserSchema, 'user');

