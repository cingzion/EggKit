# Egg.js 是一个 MVC 框架
```
Egg.js 是一个 MVC 框架


view视频   视图、模板、页面的展示

controller控制器   负责处理一些业务逻辑的处理(简单业务逻辑处理)

model模型(service)    和数据打交道(查询数据库、操作数据库数据、请求数据)、(复杂的业务逻辑、以及数据操作)


更适合团队开发、业务逻辑清晰、有利于开发和维护

egg.Controller，会有下面几个属性挂在 this 上。

  this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
  this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
  this.service：应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
  this.config：应用运行时的配置项。
  this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。



```


### 一、mac 系统安装 mongodb 的方法如下

- 1、运行此命令：$ brew tap mongodb/brew
- 2、安装命令：$ brew install mongodb-community
- 3、启动服务：$ brew services start mongodb-community
- 4、运行命令：$ mongo 

## 二、Mongodb 账户权限配置
- 1、第一步创建超级管理用户
```shell
use admin // 创建超级管理员

db.createUser({
  user: 'admin',  // 用户名
  pwd: '123456',  // 密码
  roles:[{
    role: 'root',  // 角色
    db: 'admin'  // 数据库
  }]
})

```
- 2、找到 /usr/local/etc/mongodb.conf 这个配置文件
- mongod.conf
```shell
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb
net:
  #127.0.0.1默认只能本机链接
  bindIp: 127.0.0.1

#配置文件开启强制验证
security:
  authorization: enabled
```

- 3、停止服务：$ brew services stop mongodb-community

- 4、启动服务：$ brew services start mongodb-community

- 5、运行mongodb: $ mongo

- 6、当我们在输入: $ show dbs; 这时候，是没有任何的地提示，这就代表需要权限了，要使用用户名用度密码进行登录

- 7、第四步用超级管理员账户连接数据库
```shell
$ mongo admin -u 用户名 -p 密码  # 回车，就登录成功了

$ mongo 192.168.1.200:27017/test -u user -p password # 这种是使用远程 Ip 登录的
```

#### 显示有哪些用户
```shell
> show users;
{
	"_id" : "admin.admin",
	"userId" : UUID("9e681a80-af98-4bf2-a780-8c59ba72d0f8"),
	"user" : "admin", // 用户名
	"db" : "admin",
	"roles" : [
		{
			"role" : "root", // 角色
			"db" : "admin"   // 数据库
		}
	],
	"mechanisms" : [
		"SCRAM-SHA-1",
		"SCRAM-SHA-256"
	]
}
> 
```

#### 删除 admin
```shell
db.dropUser('admin');

```