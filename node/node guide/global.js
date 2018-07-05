'use strict';

// JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。
// 在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
// 在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。
// 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。


// __filename 表示当前正在执行的脚本的文件名
console.log('__filename:', __filename);

// __dirname 表示当前正在执行的脚本的文件路径（不含文件名）
console.log('__dirname:', __dirname);

// 其它诸如JavaScript中常见的：
// setTimeout
// clearTimeout
// setInterval
// clearInterval
// setImmediate
// clearImmediate
// console


// 模块相关的
// module
// exports
// require
