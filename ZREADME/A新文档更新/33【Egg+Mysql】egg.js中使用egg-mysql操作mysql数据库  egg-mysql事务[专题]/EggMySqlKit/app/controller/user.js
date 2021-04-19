'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { ctx, app } = this;

        // 1、获取用户表的数据, get 一次只能查询一条数据
        /* 
        const result = await app.mysql.get('user', {"id": 3});

        console.log('result', result);
        {
            "id": 3,
            "username": "lishi",
            "password": "666888999"
        } 
        */

        // 2、查询全部数据, 指定条件
        /* 
        const result = await app.mysql.select('user', {
            // where: {id: 3}, // 指定查询一条数据
            limit: 2,  // 指定查询 2 条数据
            orders: [
                ['id', 'desc']
            ]

        });

        console.log('result:', result);
        [
            RowDataPacket { id: 3, username: 'lishi', password: '666888999' },
            RowDataPacket { id: 2, username: 'zhangsan', password: 'abc888999' }
        ]
        */

        // 3、增加数据
        /* 
        const result = await app.mysql.insert('user', {
            'id': 4,
            'username': '赵四',
            'password': '223423'
        });
        */


        // 4、修改数据，根据主健修改
        /* 
        const userInfo = {
            id: 4,
            username: '小六子'
        };
        
        const result = await app.mysql.update('user', userInfo); 
        */

        // 5、修改数据，执行 sql 语句来修改数据
        // const result = await app.mysql.query('update user set username=? where password=?', ['lishi', '88888888']);


        // 6、删除数据
        /*
        const result = await app.mysql.delete('user', {
            'id': 4
        });
        */


        // 7、通过 sql 语句查询数据
        // 查询 id 等于 3
        // const result = await app.mysql.query('select * from user where id=?', [3]);
        /* 
        [
            {
              "id": 3,
              "username": "lishi",
              "password": "666888999"
            }
        ]
        */
        // 查询所有数据
        /*
        const result = await app.mysql.query('select * from user'); 
        [
            {
              "id": 1,
              "username": "admin",
              "password": "123456"
            },
            {
              "id": 2,
              "username": "zhangsan",
              "password": "abc888999"
            },
            {
              "id": 3,
              "username": "lishi",
              "password": "666888999"
            }
          ]
          */



        // 8、mysql事务，数据库事务(Database Transaction), 是指作为单个逻辑单元执行的一系列操作，要么全完的执行，要么完全不执行
        /**
         * mongodb 新版本里面也支持事务，在 mongodb 中使用事务必须创建 mongodb 副本集(主从数据库)
         * 
         * mysql 要么全完的执行，要么完全不执行
         * 
         * 
         *      例子：两个转账操作，A 给 B 转账 10 元
         *           1、需要更新 user 表，让 A 用户的 money - 10            A 总共有 5 元 (执行失败) 异常
         *           
         *           2、需要更新 user 表, 让 B 用户的 money + 10                        (执行成功)
         * 
         *      事务：
         *          如果失败执行回滚操作，如果成功执行提交操作
         *          
         */  


         // 事务的操作
         const conn = await app.mysql.beginTransaction();

         try {
            //  yield conn.insert(table, row1);
            //  yield conn.update(table, row2);
            
            // 增加数据操作
            await conn.insert('user', {username: '哈哈哈哈', password: '1234556'});

            window.xxx(); // 不存在 报错

            // 修改数据操作
            await conn.query('update user set username = ? where id = ?', ['lishi', 2]);

            await conn.commit();
         } catch (err) {
             // error, rollback
             await conn.rollback(); // rollback call won't throw err
             throw err;
         }


        ctx.body = conn;
    }
};

module.exports = UserController;