'use strict'

// 引入路径模块
const path = require('path');


// 返回一个 path 的最后一部分（即文件名）
// path.basename(path, [ext])
// path <string>
// ext <string> 可选的文件扩展名
console.log('\npath.basename(path, [ext])');
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));  // 返回: 'quux.html'
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html')); // 返回: 'quux'



// 返回一个 path 的目录名
// path.dirname(path)
// path <string>
console.log('\npath.dirname(path)');
console.log(path.dirname('/foo/bar/baz/asdf/quux'));  // 返回: '/foo/bar/baz/asdf'




// 返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束
// path.extname(path)
// path <string>
console.log('\npath.extname(path)');
console.log(path.extname('index.html')); // 返回: '.html'
console.log(path.extname('index.coffee.md')); // 返回: '.md'
console.log(path.extname('index.')); // 返回: '.'
console.log(path.extname('index')); // 返回: ''
console.log(path.extname('.index')); // 返回: ''




// 从一个对象返回一个路径字符串
// path.format(pathObject)
// pathObject <Object>
// root <string> 根目录，不会补全路径分隔符
// dir <string> 文件路径，会补全路径分隔符（包含根目录在内）
// base <string> 文件名称+扩展名(如file.txt)
// name <string> 文件名称(如file)
// ext <string> 扩展名(如.txt)
console.log('\npath.format(pathObject)');

// 如果提供了 `dir`、`root` 和 `base`，则返回 `${dir}${path.sep}${base}`。
// `root` 会被忽略。
console.log(path.format({
  root: '\\ignored',
  dir: '\\home\\user\\dir',
  base: 'file.txt'
})); // 返回: '\home\user\dir\file.txt'

// 如果没有指定 `dir`，则 `root` 会被使用。
// 如果只提供了 `root` 或 `dir` 等于 `root`，则平台的分隔符不会被包含。
// `ext` 会被忽略。
console.log(path.format({
  root: '\\home\\user\\dir',
  base: 'file.txt',
  ext: 'ignored'
})); // 返回: '\file.txt'

// 如果没有指定 `base`，则 `name` + `ext` 会被使用。
console.log(path.format({
  root: '\\home\\user\\dir',
  name: 'file',
  ext: '.txt'
})); // 返回: '\file.txt'

// 建议组合：
console.log(path.format({
	dir: '\\home\\user\\dir',
	base: 'file.txt'
}));  // 返回 \home\user\dir\file.txt
console.log(path.format({
	dir: '\\home\\user\\dir',
	name: 'file',
	ext: 'txt'
}));  // 返回 \home\user\dir\file.txt




// 判定 path 是否为一个绝对路径。
// path.isAbsolute(path)
console.log('\npath.isAbsolute(pathObject)');
console.log(path.isAbsolute(process.cwd()));  // true
console.log(path.isAbsolute('c:/foo/'));  // true
console.log(path.isAbsolute('foo/bar'));  // false
console.log(path.isAbsolute('./foo'));  // false




// 用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
// path.join([...paths])
// ...paths <string> 一个路径片段的序列
// 返回: <string>
console.log('\npath.join([...paths])');
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')); // 返回: '/foo/bar/baz/asdf'
// console.log(path.join('foo', {}, 'bar')); // 抛出 'TypeError: Path must be a string. Received {}'




 



// 规范化给定的 path，并解析 '..' 和 '.' 片段
// path.normalize(path)
// path <string>
// 返回: <string>
console.log('\npath.normalize(path)');
console.log(path.normalize('/foo/bar//baz/asdf/quux/..')); // 返回: ' \foo\bar\baz\asdf'




 


// 返回一个对象，对象的属性表示 path 的元素
// path.parse(path)
// path <string>
// 返回: <Object>
console.log('\npath.parse(path)');
console.log(path.parse('D:/home/user/dir/file.txt'));





 


// 返回从 from 到 to 的相对路径（基于当前工作目录）
//  如果 from 和 to 各自解析到同一路径（调用 path.resolve()），则返回一个长度为零的字符串。
//  如果 from 或 to 传入了一个长度为零的字符串，则当前工作目录会被用于代替长度为零的字符串。
// from <string>
// to <string>
// 返回: <string>
console.log('\npath.relative(from, to)');
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));



 


// 把一个路径或路径片段的序列解析为一个绝对路径。
// path.resolve([...paths])
// ...paths <string> 一个路径或路径片段的序列
// 返回: <string>
console.log('\npath.resolve([...paths])');
console.log(path.resolve('/foo/bar', './baz'));
console.log(path.resolve('/foo', '/bar', 'baz'));
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));




 

// 提供了平台特定的路径片段分隔符：
// path.sep
console.log('\npath.sep');
console.log(path.sep);





 
