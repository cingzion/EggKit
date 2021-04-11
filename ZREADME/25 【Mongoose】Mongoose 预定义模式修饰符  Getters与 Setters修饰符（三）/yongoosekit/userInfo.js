const UserInfoModel = require('./model/userInfo');

const userInfo = new UserInfoModel({
    name: '张三66',
    age: 19,
});


console.log('===: ', userInfo.name);


// 保存数据
/* const userInfo = new UserInfoModel({
    name: '张三66',
    age: 19,
});

userInfo.save(err => {
    if(err) {
        console.log('err:', err);
        return false;
    }

    UserInfoModel.find({}, (err, docs) => {
        if(err) {
            console.log('err: ', err);
            return false;
        }
        
        console.log('docs: ', docs);
    })
}) */