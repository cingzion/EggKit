const express = require('express');
const app = express();

/**
 * 第一步
 * @type {*}
 */
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(httpServer, options);



// 使用 ejs 模板引擎
app.set('view engine', 'ejs');

// 使用静态目录的文件
app.use('/static', express.static(__dirname + '/public'));

// 访问路由配置
app.get('/', (req, res) => {
    // res.send('首页')
    res.render('index');
});

// 新闻路由
app.get('/news', (req, res) => {
    res.send('news');
});

/**
 * 定 socket 的代码
 */
io.on('connection', (socket) => {
    console.log('建立链接',);

    // 服务器接收客户端广播过来的数据
    socket.on('message', (data) => {
        console.log("data:", data)
        /**
         * io.emit 所有人系统广播
         *
         * socket.emit 谁发给我的信息，我就给谁广播
         */

        // 服务器给客户端发送数据
        // io.emit('message', '系统公告：欢迎大家来到聊天室！');

        // 谁发给我的信息，我就给谁广播
        // socket.emit('message', data);

        /*let msg = '';
        if(data === '1') {
            msg = '您当前的花费有 2 元';
        } else if (data === '2') {
            msg = '您当前的流量有 200 M';
        } else {
            msg = '请输入正确的信息';

        }

        socket.emit('message', msg);*/

        const msg = data.msg || null;

        // 去服务器查询数据




    })
});


/**
 * 监听端口,
 */
httpServer.listen(8000, () => {
    console.log('Express服务启动成功：http://localhost:8000')
});




