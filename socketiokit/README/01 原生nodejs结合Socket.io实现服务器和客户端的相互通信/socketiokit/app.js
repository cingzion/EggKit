const http = require('http');    // 引入 http
const fs = require('fs');        // 引入 fs 



// 创建一个服务
const app = http.createServer((req, res) => {
    // 加载静态页面
    fs.readFile('app.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

        res.end(data);
    });
});
const io = require('socket.io')(app); // 引入 socket.io
io.on('connection', (socket) => {
    console.log('socket.io 服务器建立连接了！');

    // 服务器获取客户端广播的数据
    /**
     * addcart 这是客户端的事件
     */
    socket.on('addcart', (data) => {
        socket.emit('to-client', `我是服务器的数据: ${JSON.stringify(data)}`);
    });

    // 服务器给客户端发送数据
    /**
     * socket.emit(); // 谁给我发的我发的信息，我广播给谁
     * 
     * io.emit();     // 群发：给所有连接服务器的客户端都广播数据
     */


    
});


// 监听端口
app.listen(3000, () => {
    console.log(`本地服务启动成功：http://localhost:3000`);
});
