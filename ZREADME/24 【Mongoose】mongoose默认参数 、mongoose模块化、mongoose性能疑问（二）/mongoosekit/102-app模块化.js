// 引用用户操作的模块
const UserModel = require('./model/user');
const NewsModel = require('./model/news');


// 查询用户数据
UserModel.find({}, (err, docs) => {
    if(err) {
        console.log("查询用户失败！", err);
    }
    console.log("查询用户成功!", docs);
});

// 增加用户数据
const user = new UserModel({
    name: '小军',
    age: 18,
    status: 1
});
user.save((err) => {
    if(err) {
        console.log('增加用户数据失败！');
    }
    console.log('增加用户数据成功！');
});


// 增加新闻数据
const news = new NewsModel({
    title: '2021.6.1儿童节活动',
    author: '王五',
    pic: 26,
    content: '我们学校要求每个家长，都必须人要参加，希望大家都能来，谢谢',
    status: 1
});
news.save((err) => {
    if(err) {
        console.log('增加新闻数据失败！');
    }
    console.log('增加新闻数据成功！');
});

// 查询新闻
NewsModel.find({}, (err, docs) => {
    if(err) {
        console.log("查询新闻失败！", err);
    }
    console.log("查询新闻成功!", docs);
});