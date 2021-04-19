// 1、引入 mongoose
const mongoose = require('mongoose'); // 导入 mongoose 模块




// 2、建立链接
// mongoose.connect(' mongodb://127.0.0.1:27017/eggcms');
// 如果有密码就要使用如下方式进行 mongodb 的连接
mongoose.connect('mongodb://eggadmin:123456@localhost:27017/eggcms');

// 3、操作 users 表(集合) 定义一个 Schema Schema 里面的对象和数据库表里面的字段需要一一对应
const UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    status: Number,
});


// 4、定义数据库模型、操作数据库
/**
 * model 里面第一个参数、要注意：
 *      1、首字母要大写
 *      2、要和数据库表(集合)名称对应、这个模型会和模型名称相同的复数的数据库表建立连接:如通过下面 方法创建模型，那么这个模型将会操作 users 这个集合
 *
 *
 */
// const User = mongoose.model('Eggcms', UserSchema, ); // 默认会操作 eggcms 表
const User = mongoose.model('Eggcms', UserSchema, 'eggcms'); // 默认会操作第三个参数配置的表  eggcms 表

// 5、查询 users 表的数据
/*User.find({}, function(err, doc) {
    if(err) {
        console.log('错误：', err);
        return;
    }
    console.log("doc: ", doc);
})*/



// 6、 增加数据
// 6.1 实例化 Model 通过实例化 Eggcms  Model 创建增加的数据
/*const u = new User({
    name: '麻子',
    age: 20,
    status: 1
});*/

// 6.2 实例.save()
/*u.save(function (err) {
    if(err) {
        console.log(err);
        return;
    }
    console.log('成功')
}); // 执行增加操作*/


// 7、更新数据





