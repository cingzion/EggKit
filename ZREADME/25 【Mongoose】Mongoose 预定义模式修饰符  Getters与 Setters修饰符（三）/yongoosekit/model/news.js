// 操作 新闻 数据表
const mongoose = require('./db');

// 对表的映射
const NewsSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true, // 定义 mongoose 模式修饰符，去掉前后空格符
    },
    author: String,
    pic: String,
    content: String,
    status: {
        type: Number,
        default: 1,
    }
});


module.exports = mongoose.model('News', NewsSchema, 'news');
