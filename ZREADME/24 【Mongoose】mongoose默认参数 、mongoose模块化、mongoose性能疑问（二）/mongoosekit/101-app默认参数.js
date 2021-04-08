// mongoose 默认参数、mongoose 模块化、mongoose 性能疑问



// mongoose 默认参数：增加数据的时候，如果不传数据会使用默认配置的数据

// 1、引入 mongoose
const mongoose = require('mongoose');


// 2、连接数据库
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

// 3、定义数据表(集合)映射，注意：字段名称必须和数据保持一致
const UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    // status: Number,
    status: {
        type: Number, // 配置类型
        default: 1, // 默认参数
    }
});

// 4、定义 Model 操作数据库
const UserModel = mongoose.model('User', UserSchema, 'user');

// 5、操作数据数据库-数据查询
/*UserModel.find({}, (err, doc) => {
    if(err) {
        console.log('查询失败', err);
        return false;
    }

    console.log('查询成功', doc)
});*/

// 6、数据的增加
const user = new UserModel({
    name: '张三666',
    age: 40,
    sex: '男',
});

user.save((err) => {
    if(err) {
        console.log(err)
    }
    console.log('增加数据成功')
})



