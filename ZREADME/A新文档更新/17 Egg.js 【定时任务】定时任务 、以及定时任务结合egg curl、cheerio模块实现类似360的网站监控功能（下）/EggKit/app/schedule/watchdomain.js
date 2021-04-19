'use strict';

const Subscription = require('egg').Subscription;
const cheerio = require('cheerio');

/**
 * cheerio 模块的使用
 * 1、安装 yarn add cheerio
 *
 * 2、导入模块 const cheerio = require('cheerio');
 *
 * 3、加载解析的内容 const $ = cheerio.load('<h2 class="title">Hello world</h2>');
 *
 * 4、用法 $('title').html(); 获取要匹配的标题的内容
 *
 * 5、获取汉子是乱码处理
 *   第一个参数是解析的内容
 *   在我们第二个参数设置 decodeEntities: false,
 *   const $ = cheerio.load('<h2 class="title">Hello world</h2>', {decodeEntities: false});
 *
 * 检测域名的一个定时任务
*/
class WatchDoMainSubscription extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '5s', // 5 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this;

    // 调用 service 里面服务的方法
    // 1、抓取网站内容
    const url = 'https://news.baidu.com/';
    const resulet = await ctx.service.spider.requestUrl(url);
    // console.log('resulet:', resulet.data.toString());

    const htmlData = resulet.data.toString();

    // 2、解析数据
    // 检测网站是否被篡改，检测网站是否挂掉
    // 判断这个 <title>百度新闻——海量中文资讯平台</title>
    const $ = cheerio.load(htmlData, { decodeEntities: false });

    // 3、获取title的内容
    const title = $('title').html();
    // console.log('title:', title);

    // 4、判断 标题是不是相等 检测网站是否被篡改，检测网站是否挂掉
    if (title !== '百度新闻——海量中文资讯平台') {
      console.log('网站挂掉了或者被修改了');
    } else {
      console.log('一切正常');
    }

    $('.hotnews a').each(function() {
      const htmlText = $(this).html();
      console.log('htmlText:', htmlText);
    });


  }
}

module.exports = WatchDoMainSubscription;
