// 在新闻表里添加
const NewsModel = require('./model/news');


// 实例化模型
const news = new NewsModel({
    title: ' 我是一个国际新闻222    ',
    author: '张三222',
    pic: 'www.xxx.com/x.png', // 保存的时候，要加上 http
});
news.content = '我是一个内容222',

news.save((err) => {
    if(err) {
        console.log(err);
        return false;
    }
    
    // 查找我们增加成功的数据
    NewsModel.find({}, (err, docs) => {
        if(err) {
            console.log(er);
            return false;
        }
        console.log("docs:", docs);
    })
});