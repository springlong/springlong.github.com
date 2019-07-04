'use strict'

// 引入操作系统函数
// https://nodejs.org/api/os.html
// https://www.npmjs.com/package/os
const os = require('os');  



// 操作系统名
console.log('操作系统名type : ' + os.type());

// 操作系统名
console.log('操作系统名platform : ' + os.platform());

// 系统内存总量
console.log('系统内存总量total memory : ' + os.totalmem() + " bytes.");

// 操作系统空闲内存量
console.log('操作系统空闲内存量free memory : ' + os.freemem() + " bytes.");


