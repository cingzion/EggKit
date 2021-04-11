const mongoose = require('./db');

const FocusShema = mongoose.Schema({
    title: {
        type: String,
        trim: true, // 定义 mongoose 模式修饰符 去掉空格
    },
    pic: String,
    redirect: {
        type: String,
        set(params) { // 增加数据的时候对 redirect 字段进持处理
             // params 可以获取 redirect 的值，返回的数据误就是 redirect 在数据库实际保存的值
             /**
              *  1、如果用户输入的是 www.baidu.com 那我们就要
              *     在前在加上 http:// 变成 http://www.baidu.com
              * 
              *  2、如果用输入的是 http://www.baidu.com 那么就不用
              *     去处理，直接就是 http://www.baidu.com 即可
              */
             
             // 如果用户没有传入 params 我们就返回空
            if(!params) {
                return '';
            } else {
                // 查询 params 有没有  http
                if(params.indexOf('http://') !== 0 && params.indexOf('https://') !== 0){
                    console.log("=======:", params);
                    return `http://${params}`
                }

                return params;
            };
        }
    },
    status: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model('Focus', FocusShema, 'focus');