const FocusModel = require('./model/focus');

const focus = new FocusModel({
    title: '   我是一个国际新闻888 ',
    pic: 'http://www.xxx.com/x.png',
    redirect: 'https://www.xxxx.com',
});

focus.save((err) => {
    if(err) {
        console.log(err);
        return false;
    }

    FocusModel.find({}, (err, docs) => {
        if(err) {
            console.log("err:", err);
            return false;
        }
        console.log("docs:", docs);
    })
})