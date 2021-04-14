const UserInfoModel = require('./model/userInfo');

const userInfo = new UserInfoModel({
    name: 'zhansanxxx',
    sn: '123345667',
    age: 29,
});


userInfo.save()