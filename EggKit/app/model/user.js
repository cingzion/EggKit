'use strict';

/**
 * 操作数据库的模型
 * @param {} app 
 */

module.exports = app => {
    const mongoose = app.mongoose; // 引入建立连接的 mongoose
    const Schema = mongoose.Schema;

    // 数据库表的映射
    const UserSchema = new Schema({
        userName: {
            type: String,
            trim: true, // 去掉前后空格
        },
        password: {
            type: String,
            trim: true, // 去掉前后空格
        },
        status: {
            type: Number,
            default: 1,
        }
    });

    // 操作 user 数据的模型
    return mongoose.model('User', UserSchema, 'user');
};

