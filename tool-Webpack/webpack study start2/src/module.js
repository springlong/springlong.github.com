import "babel-polyfill";

// import后面的from命令用来指定模块文件的位置，可以是相对路径，也可以是绝对路径，目前.js后缀不可以省略。
// 如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
// 
// import导出的变量名必须与被导入模块对外接口的名称相同，如果通过import导入模块中没有导出的变量，将报错。
// 
// 一个模块可以多次被import导入，但是模块内部的代码仅会被执行一次。
// 一个模块中export的变量只能被导出一次，否则会报错。
// 
// 注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。

import {firstName, lastName, year} from '../src/profile.js';  // 导出多个变量
import {a} from '../src/profile.js';  // 导出单个变量
import {a as prop, b as test} from '../src/profile.js';  // 使用as关键字，将导入的变量重命名: oldname as newname
import * as moduleName from '../src/profile.js';  // 使用* as moduleName，将导出整个模块的内容到moduleName对象
import myModule from '../src/profile.js';  // 导出模块的默认值
import myModule2, {b} from '../src/profile.js';  // 导出模块的默认值和指定变量的组合模式

console.log('firstName', firstName);
console.log('lastName', lastName);
console.log('year', year);
console.log('a', a);
console.log('b', b);
console.log('prop', prop);
console.log('test', test);
console.log('moduleName.multiply', moduleName.multiply);
console.log('myModule', myModule);
console.log('myModule2', myModule2);

setTimeout(()=>{
	console.log('year', year);
}, 500);

// 通过import导出的变量都是静态分析的，为只读属性，对其进行赋值会报错。
// prop = {};  // 报错

// 如果导出的变量是一个变量，可以对添加、修改、删除属性
prop.a = 1;
prop.babc = 2;
delete prop.b;
console.log('prop add a value', prop);

