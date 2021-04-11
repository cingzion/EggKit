// 性能测试
/**
 * 不必须担心这些问题，人家底层做了优化了
 */

// 检测程序代码块的执行时间
console.time('user');
const UserModel = require('./model/user');
console.timeEnd('user');
// user: 253.286ms

console.time('news');
const NewsModel = require('./model/news');
console.timeEnd('news');
// news: 1.224ms

