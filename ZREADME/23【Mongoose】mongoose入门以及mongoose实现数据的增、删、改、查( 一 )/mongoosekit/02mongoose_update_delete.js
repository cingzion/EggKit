// 1、引入 mongoose
const mongoose = require('mongoose'); // 导入 mongoose 模块




// 2、建立链接
// mongoose.connect(' mongodb://127.0.0.1:27017/eggcms');
// 如果有密码就要使用如下方式进行 mongodb 的连接
mongoose.connect('mongodb://eggadmin:123456@localhost:27017/eggcms');

// 3、定义一个Schema
const NewsSchema = mongoose.Schema({
    title: String,
    author: String,
    pic:String,
    content: String,
    status: Number,
})

// 4、定义操作数据库的 Model
const News = mongoose.model('News', NewsSchema, 'news');

// 5、增加数据
// 通过实例化 Model 创建增加的数据
/*const NewsDate = new News({
    title: '我是一个新闻',
    author: '张三',
    content: '我是新闻的内容',
    status: 1,
});*/


// 6、保存数据
/*NewsDate.save((err) => {
    if(err) {
        console.log("error：", err)
    }
    console.log("创建成功")
});*/

// 7、修改数据
/*News.updateOne(
    {_id: '606de7b1e3711dc2bc754d6d'},
    {title: '我是一个新闻22222'},
    (err, doc) => {
        if(err) {
            return console.log("error:", err);
        }
        console.log("修改成功", doc);
    }
);*/

// 8、删除数据
News.deleteOne(
    {_id: '606de7b1e3711dc2bc754d6d'},
    (err, result) => {
        if(err) {
            return console.log("error:", err);
        }
        console.log("删除成功", result);
    }
)









