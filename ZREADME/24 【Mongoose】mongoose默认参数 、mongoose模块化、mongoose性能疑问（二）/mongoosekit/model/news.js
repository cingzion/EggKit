// 操作 新闻 数据表
const mongoose = require('./db');

// 对表的映射
const NewsSchema = mongoose.Schema({
    title: String,
    author: String,
    pic: String,
    content: String,
    status: {
        type: Number,
        default: 1,
    }
});


module.exports = mongoose.model('News', NewsSchema, 'news');
