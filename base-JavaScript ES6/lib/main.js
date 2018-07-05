'use strict';

// ============================================================================
// ============================================================================
// 变量声明
//
// let 块级作用域变量声明
// const 常量声明，对象声明也建议使用const，表示其引用地址不变

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _this = this;

var _templateObject = _taggedTemplateLiteral(['Hello ', ' world ', ''], ['Hello ', ' world ', '']),
    _templateObject2 = _taggedTemplateLiteral(['Hi\n', '!'], ['Hi\\n', '!']);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

false && function () {

	// let声明不存在变量的提升，虽然后面有声明age，但是这里将报错
	try {
		console.log(age);
	} catch (err) {
		console.log(err);
	}

	var age = 18;

	// let 不允许在相同作用域内，重复声明同一个变量
	// let age = 21;

	if (true) {
		// ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
		// 这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
		// age = 26;
		var _age = 20;
	}

	if (true) {
		var _age2 = 21;
	}

	// let声明用于for循环
	// 注意：该语句特性通过Babel编译后，只是简单讲let替换为var，无法实现预期中arr[i] = i的赋值
	var arr = [];
	for (var i = 0, len = 10; i < 10; i++) {
		arr[i] = i; // 这里的i在每次循环提中都不同，属于私有域，实则是从循环声明的语句块中传递过来的
	}
	console.log('arr:', arr);
	// console.log(i);   // VM349:7 Uncaught ReferenceError: i is not defined

	// 上面的循环声明在ES5中相当于
	// var arr = [];
	// for(var i = 0, len = 10; i < 10; i++) {
	// 	(function(i) {
	// 		arr[i] = i;
	// 	})(i);
	// }


	function test1(name) {
		var num = 1;
		console.log(this);
	}

	var test2 = function test2(name) {
		var num = 2;
		console.log(_this);
	};

	// ============================================================================
	// 在块级作用域下进行函数声明，在Node.js和支持ES6的浏览器环境下，运行结果将不同。
	// 考虑到环境导致的差异太大，应该避免在块级作用域下使用函数声明。如果确实需要，请使用函数表达式。

	// 块级作用域的函数声明类似于var，存在变量的提升问题
	function f() {
		console.log('I am outside!');
	}

	(function () {

		if (false) {
			// 重复声明一次函数f
			var _f = function _f() {
				console.log('I am inside!');
			};
		}

		// 在支持ES6的浏览器中：存在变量提升，在该区块当中，重复声明的f函数在没有被执行之前，f的值为undefined，而不是上一级作用域下的函数声明！
		// 在Node.js中，不存在变量提升问题，f引用的上一级作用域的下的函数声明！
		f();
	})();

	// ==============================================================================
	// const用于对象

	var foo = {};

	// 为 foo 添加一个属性，可以成功
	foo.prop = 123;
	console.log(foo.prop);

	// 将 foo 指向另一个对象，就会报错
	// foo = {}; // TypeError: "foo" is read-only

	var a = [];
	a.push('Hello'); // 可执行
	a.length = 0; // 可执行
	// a = ['Dave'];    // 报错
}();

// ============================================================================
// ============================================================================

// 顶层对象的属性问题
// 在浏览器环境下，顶层对象是window对象，在ES5之中，顶层对象的属性与全局变量是等价的
// ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；
// 另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
// 也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
//
// 注意，Babel解析只是将let const替换为var，无法实现let和const的关于顶层对象的特性
// 所以还是需要避免

// window.a = 1;
// var b = 2;
// let c = 3;
// const d = 4;
// function e(){};

// console.log(window.a);   // 1
// console.log(window.b);   // 2
// console.log(window.c);   // undefined
// console.log(window.d);   // undefined
// console.log(window.e);   // function e(){}


// ============================================================================
// ============================================================================
// 变量的解构赋值

false && function () {

	// 交换变量的值
	var x = 1;
	var y = 2;


	// 从函数返回多个值-返回数组
	var _ref = [y, x];
	x = _ref[0];
	y = _ref[1];
	function example() {
		return [1, 2, 3];
	}

	var _example = example(),
	    _example2 = _slicedToArray(_example, 3),
	    a = _example2[0],
	    b = _example2[1],
	    c = _example2[2];

	// 从函数返回多个值-返回对象


	function exampleObj() {
		return {
			foo: 1,
			bar: 2
		};
	}

	var _exampleObj = exampleObj(),
	    foo = _exampleObj.foo,
	    bar = _exampleObj.bar;

	// 函数参数的定义
	// 参数是一组有次序的值


	function f(_ref2) {
		var _ref3 = _slicedToArray(_ref2, 3),
		    x = _ref3[0],
		    y = _ref3[1],
		    z = _ref3[2];

		console.log(x, y, z);
	}
	f([1, 2, 3]);

	// 参数是一组无次序的值
	function f2(_ref4) {
		var a = _ref4.a,
		    b = _ref4.b,
		    c = _ref4.c;

		console.log(a, b, c);
	}
	f2({ a: 1, b: 2, c: 3 });

	// 提取 JSON 数据
	var jsonDatas = {
		id: 42,
		status: 'OK',
		data: [867, 5309]
	};
	var id = jsonDatas.id,
	    status = jsonDatas.status,
	    numbers = jsonDatas.data;

	// 函数参数的默认值

	function testFun(id, _ref5) {
		var _ref5$name = _ref5.name,
		    name = _ref5$name === undefined ? 'test a name' : _ref5$name,
		    _ref5$age = _ref5.age,
		    age = _ref5$age === undefined ? 18 : _ref5$age,
		    _ref5$fun = _ref5.fun,
		    fun = _ref5$fun === undefined ? function () {} : _ref5$fun;

		console.log(id, name, age, fun);
	}
	testFun('id', { name: 'yangtuan', age: 26, fun: null });
}();

// ============================================================================
// ============================================================================
// 字符串的扩展
//
// ES6增加了可以识别 Unicode 编号大于0xFFFF的字符的相关扩展
// String.prototype.codePointAt();
// String.prototype.fromCharCode();
// String.prototype.at();
// String.prototype.normalize();
//
// ES6增加字符查找相关方法，新版Firefox、Chrome支持
// String.prototype.startsWith()
// String.prototype.endsWith()
// String.prototype.includes()
// String.prototype.repeat()
//
// ES2017增加填充字符相关方法，暂无浏览器支持
// String.prototype.padStart()
// String.prototype.padEnd()
//
// ES6引入模板字符串，通过``进行书写，使用${变量名}使用变量

false && function () {

	// 字符表示法
	console.log('\z');
	console.log('\x7A');
	console.log('z');
	console.log('z'); // 新增
	console.log('\uD842\uDFB7');

	// ES6增加了可以识别 Unicode 编号大于0xFFFF的字符的相关扩展
	// String.prototype.codePointAt();
	// String.prototype.fromCharCode();
	// String.prototype.at();
	// String.prototype.normalize();

	// ES6增加，新版Firefox、Chrome支持
	// String.prototype.startsWith()
	// String.prototype.endsWith()
	// String.prototype.includes()
	// String.prototype.repeat()
	console.log('abcd1234'.startsWith('abcd'));
	console.log('abcd1234'.endsWith('1234'));
	console.log('abcd1234'.includes('d1'));
	console.log('abc'.repeat(3));

	// ES2017增加，暂无浏览器支持
	// String.prototype.padStart()
	// String.prototype.padEnd()
	try {
		console.log('abc'.padStart(10));
		console.log('abc'.padStart(10, 'x'));
		console.log('abc'.padStart(10, '123'));
		console.log('abc'.padEnd(10, 'x'));
		console.log('abc'.padEnd(10, '123'));
	} catch (e) {
		console.error('String.prototype.padStart() no support!');
		console.error('String.prototype.padEnd() no support!');
	}

	// ES6引入模板字符串，通过``进行书写，使用${变量名}使用变量
	var name = 'yangtuan';
	var age = '26';
	var sex = 'male';
	console.log('\n\t\t<ul>\n\t\t\t<li>' + name + '</li>\n\t\t\t<li>' + age + '</li>\n\t\t\t<li>' + sex + '</li>\n\t\t\t<li>' + (32 + 26 + 11) + '</li>\n\t\t</ul>\n\t');

	// 模板字符串允许嵌套
	var datas = [{ first: 'Jane', last: 'Bond' }, { first: 'Lars', last: 'croft' }];
	console.log('\n\t\t<table>\n\t\t\t' + datas.map(function (item) {
		return '\n\t\t\t\t<tr>\n\t\t\t\t\t<td>' + item.first + '</td>\n\t\t\t\t\t<td>' + item.last + '</td>\n\t\t\t\t</tr>\n\t\t\t';
	}).join('') + '\n\t\t</table>\n\t');

	// 标签模板
	var a = 5;
	var b = 10;

	tag(_templateObject, a + b, a * b);

	// 等同于
	// tag(['Hello ', ' world ', ''], 15, 50);

	function tag(letters) {

		console.log(arguments);

		var result = '';
		var i = 0;

		while (i < letters.length) {
			result += letters[i++];
			if (arguments.length > i) {
				result += arguments[i];
			}
		}

		console.log(result);
	}

	// String.raw()
	// 用来充当模板字符串的处理函数
	console.log(String.raw(_templateObject2, 2 + 3));
}();

// ============================================================================
// ============================================================================
// 正则的扩展
//
// 增加了y修饰符，叫做粘连（sticky）修饰符
// ES6 的正则对象多了sticky属性，表示是否设置了y修饰符
// ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符
// ES2018引入s修饰符，使得.可以匹配任意单个字符，暂无浏览器支持
// 现有支持的先行断言(?=)和先行否定断言(?!)
// ES2018引入后行断言(?<=)和后行否定断言(?<!)，暂无浏览器支持
// 组匹配和具名组匹配，具名组匹配为ES2018引入的概念，具名匹配，暂无浏览器支持，Node.js v9.4.0也不支持

false && function () {

	// ES6增加了y修饰符，叫做粘连（sticky）修饰符
	// 与全局修饰符g类似，也是全局匹配。不同之处在于，g修饰符只要剩余位置中存在匹配就行
	// 而y修饰符确保匹配必须从剩余的第一个位置开始
	var s = 'aaa_aa_a';
	var r1 = /a+/g;
	var r2 = new RegExp('a+', 'y');
	var r3 = new RegExp('a+_', 'y');

	console.log(r1.exec(s)); // 'aaa'
	console.log(r1.exec(s)); // 'aa'

	console.log(r2.exec(s)); // 'aaa'
	console.log(r2.exec(s)); // null

	console.log(r3.exec(s)); // 'aaa_'
	console.log(r3.exec(s)); // 'aa_'

	// y修饰符同样遵守lastIndex属性，但是要求必须在lastIndex指定的位置发现匹配。
	var reg1 = new RegExp('a', 'y');
	reg1.lastIndex = 0;
	console.log(reg1.exec('xaya')); // null
	reg1.lastIndex = 1;
	console.log(reg1.exec('xaya')); // 'a'

	// 实际上，y修饰符号隐含了头部匹配的标志^。
	// y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。
	var reg2 = new RegExp('a', 'gy');
	console.log('aaxa'.replace(reg2, '-')); // '--xa'

	// 单单一个y修饰符对match方法，只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配。
	console.log('a1a2a3'.match(new RegExp('a\\d', 'y'))); // ["a1"]
	console.log('a1a2a3'.match(new RegExp('a\\d', 'gy'))); // ["a1", "a2", "a3"]

	// ES6 的正则对象多了sticky属性，表示是否设置了y修饰符。
	var reg3 = new RegExp('hello\\d', 'y');
	console.log(reg3.sticky); // true

	// ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。
	// ES5 的 source 属性
	// 返回正则表达式的正文
	console.log(/abc/ig.source); // "abc"

	// ES6 的 flags 属性
	// 返回正则表达式的修饰符
	console.log(/abc/ig.flags); // 'gi'

	// ES2018引入s修饰符，使得.可以匹配任意单个字符，暂无浏览器支持
	// 之前的.无法匹配换行符(\n)、回车符(\r)等行终止符
	// console.log(/foo.bar/.test('foo\nbar'));  // false
	// console.log(/foo.bar/s.test('foo\nbar')); // true
	// console.log(/foo.bar/s.dotAll);  // true

	// 现有支持的先行断言(?=)和先行否定断言(?!)
	// ES2018引入后行断言(?<=)和后行否定断言(?<!)
	// console.log(/[a-z]+/ig.exec('a1bc'));  // 'a'
	// console.log(/[a-z]+(?=\d+)/ig.exec('a1bc'));  // 'a'
	// console.log(/[a-z]+(?!\d+)/ig.exec('a1bc'));  // 'bc'
	// console.log(/(?<=\d+)[a-z]+/ig.exec('a1bc')); // 'bc'
	// console.log(/(?<!\d+)[a-z]+/ig.exec('a1bc')); // 'a'

	// // 组匹配和具名组匹配，具名组匹配为ES2018引入的概念
	// const reg4 = /(\d{4})-(\d{2})-(\d{2})/;
	// const matchObj4 = reg4.exec('2018-01-31');
	// console.log(matchObj4);

	// // 具名匹配，暂无浏览器支持，Node.js v9.4.0也不支持
	// const reg5 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
	// const matchObj5 = reg5.exec('2018-01-31');
	// console.log(matchObj5);

	// // String.prototype.matchAll 提案
	// // 将符合正则匹配的字符串一次性取出
	// console.log('a1b2c3d4e5'.match(/[a-z]\d/g));
	// console.log('a1b2c3d4e5'.matchAll(/[a-z]\d/g));
}();

// ============================================================================
// ============================================================================
// 数值的扩展
//
// Number.isFinite()
// Number.isNaN()
// Number.parseInt()
// Number.parseFloat()
// Number.isInteger()
// Number.EPSILON

false && function () {

	// ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。

	// Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
	console.log(Number.isFinite(15)); // true
	console.log(Number.isFinite(NaN)); // false
	console.log(Number.isFinite(Infinity)); // false
	console.log(Number.isFinite(-Infinity)); // false

	// Number.isNaN()用来检查一个值是否为NaN。
	// 如果参数类型不是数值，Number.isNaN一律返回false。
	console.log(Number.isNaN(NaN)); // true
	console.log(Number.isNaN(15)); // false
	console.log(Number.isNaN('15')); // false

	// 它们与传统的全局方法isFinite()和isNaN()的区别在于，
	// 传统方法先调用Number()将非数值的值转为数值，再进行判断，
	// 而这两个新方法只对数值有效，
	// Number.isFinite()对于非数值一律返回false,
	// Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。


	// ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
	// 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

	// ES5的写法
	console.log(parseInt('12.34#')); // 12
	console.log(parseFloat('12.34#')); // 12.34

	// ES6的写法
	console.log(Number.parseInt('12.34#')); // 12
	console.log(Number.parseFloat('12.34#')); // 12.34

	// Number.isInteger()用来判断一个数值是否为整数。
	// JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
	// 如果参数不是数值，Number.isInteger返回false。
	console.log(Number.isInteger(25)); // true
	console.log(Number.isInteger(25.1)); // false
	console.log(Number.isInteger(25.0)); // true
	console.log(Number.isInteger('25')); // false

	// ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
	// 对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。
	// Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。
	// 引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。
	console.log(0.1 + 0.2);
	console.log(0.1 + 0.2 - 0.3);
	console.log(Number.EPSILON);
}();

// ============================================================================
// ============================================================================
// 函数的扩展
//
// 参数的默认值 function (x, y = 2) {}
//
// rest参数 function (...values) {}
// （1）函数的length属性，不包含rest参数
//
// 函数的参数声明会形成一个单独的作用域
//
// 函数的name属性
//
// 箭头函数 var fun1 = (arg1, arg2) => { };
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
//
// 双冒号运算符提案，即函数绑定this运算符，用来取代 call/apply/bind 调用
//
// ES5 Function.prototype.bind()
// chrome 7+,firefox 4+,IE 9+, Safari 5.1+
//
// ES2017允许函数的最后一个参数有尾逗号，暂无浏览器支持

false && function () {

	// ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
	function log(x) {
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'World';

		console.log(x, y);
	}
	log('Hello '); // 'Hello World'


	// 与解构赋值一起使用
	function m1() {
		var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref6$x = _ref6.x,
		    x = _ref6$x === undefined ? 0 : _ref6$x,
		    _ref6$y = _ref6.y,
		    y = _ref6$y === undefined ? 0 : _ref6$y;

		console.log([x, y]);
	}

	function m2() {
		var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
		    x = _ref7.x,
		    y = _ref7.y;

		console.log([x, y]);
	}

	m1(); // [0, 0]
	m1({ x: 3 }); // [3, 0]

	m2(); // [0, 0]
	m2({ y: 3 }); // [undefined, 3]


	// 默认值参数的位置，应当是函数的尾参数
	function f() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
		var y = arguments[1];

		console.log([x, y]);
	}
	f(); // [1, undefined]
	f(2); // [2, undefined]
	// f(, 1); // 报错
	f(1, 2); // [1, 2]


	// length属性的值为函数参数的个数-指定了默认值的参数个数
	console.log(function () {}.length); // 0
	console.log(function (a, b) {}.length); // 2
	console.log(function (a) {
		var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	}.length); // 1


	// 函数参数声明会形成一个单独的作用域

	(function () {

		var x = 1;

		// 在参数声明作用域下，存在x声明，所以参数y的默认值等于参数x，而不是外层作用域的x
		function f(x) {
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;

			console.log('作用域：', y);
		}

		f(2); // 2
	})();

	(function () {

		var x = 1;

		// 在参数声明作用域下，没有声明x，所以参数y的值等于外层作用域的x
		function f() {
			var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : x;
			return function () {
				var x = 2;
				console.log('作用域：', y);
			}();
		}

		f(1); // 1
	})();

	(function () {

		// 在参数声明作用域下，没有声明x，所以参数y的值指向外层作用域，但是外层并没有声明x，所以报错
		function f() {
			var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : x;
			return function () {
				var x = 2;
				console.log('作用域：', y);
			}();
		}

		// f();  // 报错
	})();

	// rest参数
	// ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，
	// 这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

	function add() {

		var sum = 0;

		for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
			values[_key] = arguments[_key];
		}

		values.forEach(function (val) {
			sum += val;
		});

		return sum;
	}
	console.log(add(1, 2, 3, 4, 5, 6, 7)); // 28

	// 函数的length属性，不包含rest参数
	console.log(add.length); // 0


	// name属性，返回函数的函数名
	// 这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准。
	console.log(add.name);

	// 箭头函数，单个参数可以省略括号
	// 单行语句可以省略return
	var testFun1 = function testFun1(num) {
		return num + 1;
	};
	// 相当于：
	// function testFun1(num) {
	// 	return num + 1;
	// }
	console.log(testFun1(3));

	// 箭头函数，无参数时使用括号
	// 函数体存在多行语句，使用 {}
	var testFun2 = function testFun2() {
		var x = 3;
		return x + 1;
	};
	// 相当于：
	// function testFun() {
	// 	let x = 3;
	// 	alert(x + 1);
	// }
	console.log(testFun2());

	// ES5 Function.prototype.bind()
	// chrome 7+,firefox 4+,IE 9+, Safari 5.1+
	var fun = function fun() {
		console.log(this);
	};
	var fun2 = fun.bind({ a: 1, b: 2 });

	// 双冒号运算符提案，即函数绑定this运算符，用来取代call/apply/bind调用
	// const obj = {a:1, b:2};
	// const fun = function() {
	// 	console.log(arguments);
	// 	console.log(this);
	// };
	// obj::fun();


	// ES2017允许函数的最后一个参数有尾逗号，暂无浏览器支持
	// Node.js v9.4.0支持
	// function testFun(a, b,) {
	// 	console.log(a, b);
	// }
	// testFun(1, 2);
}();

// ============================================================================
// ============================================================================
// 数组的扩展
//
// 扩展运算符(...)，好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列
// （1）扩展运算符-替代函数的apply方法
// （2）扩展运算符-复制数组
// Array.form()，用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象。
// Array.of()用于将一组值，转换为数组
// Array.prototype.copyWithin(target, start = 0, end = this.length)
// Array.prototype.find(function(val, index, arr){})
// Array.prototype.findIndex(function(val, index, arr){})
// Array.prototype.fill(val, start, end)
// Array.prototype.keys()
// Array.prototype.values()
// Array.prototype.entries()
// Array.prototype.includes()
// ES5 Array.isArray

false && function () {

	// 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
	// 暂无浏览器支持，Node.js支持
	// console.log(...[1, 2, 3]);  // 1 2 3

	// // 扩展运算符-替代函数的apply方法
	// function fun1(x, y, z) {
	// 	console.log(x, y, z);
	// }
	// let args = [10, 9, 8];

	// // ES6写法
	// fun1(...args);

	// // ES5写法
	// fun1.apply(null, args);

	// // 扩展运算符-复制数组
	// const arr1 = [1, 2];

	// // ES6写法
	// const copy1 = [...arr1];

	// // ES5写法
	// const copy1_1 = arr1.concat();


	// Array.form()，用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象。
	var arrayLike = {
		'0': 'a',
		'1': 'b',
		'2': 'c',
		'length': 3
	};

	// ES5写法
	console.log([].slice.call(arrayLike));

	// ES6写法
	console.log(Array.from(arrayLike));

	// Array.form()第二个参数用于对数据进行处理后返回
	console.log(Array.from(arrayLike, function (val) {
		return val + 1;
	}));

	// Array.of()用于将一组值，转换为数组
	console.log(Array.of()); // []
	console.log(Array.of(3)); // [3]
	console.log(Array.of(3, 11, 8)); // [3, 11, 8]


	// Array.prototype.copyWithin(target, start = 0, end = this.length)
	// 数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
	// target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
	// start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
	// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
	console.log([1, 2, 3, 4, 5].copyWithin(0, 3)); // [4, 5, 3, 4, 5]
	console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)); // [4, 2, 3, 4, 5]


	// Array.prototype.find(function(val, index, arr){})
	// 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
	console.log([1, 2, 3, 4, 5].find(function (val, index, arr) {
		return val > 3;
	})); // 4

	// Array.prototype.findIndex(function(val, index, arr){})
	// 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
	console.log([1, 2, 3, 4, 5].findIndex(function (val, index, arr) {
		return val > 3;
	})); // 3


	// Array.prototype.fill(val, start, end)
	// 数组实例的fill方法使用指定值对数组进行填充
	console.log(['a', 'b', 'c'].fill(7)); // [7, 7, 7]
	console.log(['a', 'b', 'c'].fill(7, 1, 2)); // [7, 7, 7]

	// Array.prototype.keys()
	// 返回一个遍历器对象，keys()是对键名的遍历
	// 新版浏览器支持
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = ['a', 'b', 'c'].keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var key = _step.value;

			console.log(key);
		}

		// Array.prototype.values()
		// 返回一个遍历器对象，values()是对键值的遍历
		// 暂无浏览器支持，Node.js v9.4.0也不支持
		// for (let val of ['a', 'b', 'c'].values()) {
		// 	console.log(val);
		// }

		// Array.prototype.entries()
		// 返回一个遍历器对象，entries()是对键值对的遍历
		// 新版浏览器支持
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = ['a', 'b', 'c'].entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var _ref8 = _step2.value;

			var _ref9 = _slicedToArray(_ref8, 2);

			var _key2 = _ref9[0];
			var val = _ref9[1];

			console.log(_key2, val);
		}

		// Array.prototype.includes()
		// 返回一个布尔值，表示某个数组是否包含给定的值
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	console.log([1, 2, 3].includes(2)); // true
	console.log([1, 2, 3].includes(4)); // false

	// Array.isArray
	// Chrome 5+,Firefox 4+,IE 9+,Safari 5+
	console.log(Array.isArray([1, 2, 3])); // true
	console.log(Array.isArray({ foo: 123 })); // false
	console.log(Array.isArray('foobar')); // false
	console.log(Array.isArray(undefined)); // false
}();

// ============================================================================
// ============================================================================
// 对象的扩展
// 属性的简洁表示法
// 属性名表达式
// ES6 Object.is()
// ES6 Object.assign(target, ...sources)
// 对象属性的可枚举性
// ES5 Object.getOwnPropertyDescriptor(obj, prop)
// ES2017 Object.getOwnPropertyDescriptors(obj)
// __proto__属性
// ES6 Object.setPrototypeOf(obj, prototype)
// ES5 Object.getPrototypeOf(object)
// super关键字
// ES5 Object.keys()
// ES2017 Object.values()
// ES2017 Object.entries()
// 对象的扩展运算符（...）
// ES5 Object.defineProperty(obj, prop, descriptor)
// ES5 Object.getOwnPropertyNames(obj)
// ES5 obj.hasOwnProperty(prop)
// ES5 Object.create(proto[, propertiesObject])

false && function () {
	var _obj, _obj2;

	// 属性的简洁表示法
	var foo = 'bar';
	var baz = { foo: foo };
	// 等同于
	// const baz = {foo: foo};
	console.log(baz); // {foo: 'bar'}

	function f(x, y) {
		return { x: x, y: y };
	}
	// 等同于
	// function f(x, y) {
	// 	return {x: x, y: y};
	// }
	console.log(f(1, 2)); // {x: 1, y: 2}

	var birth = '1992-08-03';
	var Person = {
		name: '张三',
		// 等同于
		// birth: birth
		birth: birth,
		// 等同于
		// hello: function(){ }
		hello: function hello() {
			console.log('我的名字是', this.name);
		}
	};
	Person.hello();

	// 属性名表达式

	// ES5写法
	var obj = {
		foo: 'a',
		baz: 'b',
		hello: function hello() {
			console.log('yes!');
		}
	};
	obj['a' + 'bc'] = 'c';
	console.log(obj);

	// ES6写法
	var obj2 = (_obj = {
		foo: 'a',
		baz: 'b'
	}, _defineProperty(_obj, 'a' + 'bc', 'c'), _defineProperty(_obj, 'h' + 'ello', function () {
		console.log('yes!');
	}), _obj);
	console.log(obj2);

	// ES6 Object.is()
	// 比较两个值是否相等
	// Chrome 30+/Firefox 22+
	console.log(Object.is('abc', 'abc')); // true
	console.log(Object.is({}, {})); // false
	console.log(Object.is(+0, -0)); // false
	console.log(Object.is(NaN, NaN)); // true


	// ES6 Object.assign(target, ...sources)
	// 将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
	// Chrome 45+/Firefox 34+

	// 浅拷贝
	// Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
	var oo1 = { a: { a1: 1 } };
	var copy1 = Object.assign({}, oo1);
	console.log(copy1);
	oo1.a.a1 = 11;
	console.log(copy1.a.a1);

	// 同名属性的替换
	// 对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
	var target = { a: { a1: '1', a2: '2' } };
	var source = { a: { a3: 'a1' } };
	console.log(Object.assign(target, source));

	// 数组的处理
	// Object.assign可以用来处理数组，但是会把数组视为对象，即按照索引进行替换
	console.log(Object.assign([1, 2, 3], [4, 5]));

	// 对象属性的可枚举性
	// ES6 规定，所有 Class 的原型的方法都是不可枚举的。
	//
	// ES5 Object.getOwnPropertyDescriptor(obj, prop) 方法返回指定对象上一个自有属性对应的属性描述符。自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性。
	// Chrome 5+/Firefox 4+/IE8+/Opera 12+/Safari 5+
	//
	// value
	// 		该属性的值(仅针对数据属性描述符有效)
	// writable
	// 		当且仅当属性的值可以被改变时为true。(仅针对数据属性描述有效)
	// get
	// 		获取该属性的访问器函数（getter）。如果没有访问器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
	// set
	// 		获取该属性的设置器函数（setter）。 如果没有设置器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
	// configurable
	// 		当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
	// enumerable
	// 		当且仅当指定对象的属性可以被枚举出时，为 true。
	//
	// 描述对象的enumerable属性，称为"可枚举性"，如果该属性为false，就表示某些操作会忽略当前属性。
	// 目前，有四个操作会忽略enumerable为false的属性。
	// for...in循环：只遍历对象自身的和继承的可枚举的属性。（ ES5）
	// Object.keys()：返回对象自身的所有可枚举的属性的键名。（ ES5）
	// JSON.stringify()：只串行化对象自身的可枚举的属性。（ ES5）
	// Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。（ ES6）

	var obj3 = { foo: 123 };
	console.log(Object.getOwnPropertyDescriptor(obj3, 'foo'));

	console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable); // false
	console.log(Object.getOwnPropertyDescriptor([], 'length').enumerable); // false


	// ES2017 Object.getOwnPropertyDescriptors(obj)
	// 返回指定对象所有自身属性（非继承属性）的描述对象。
	var obj4 = {
		foo: 123,
		get bar() {
			return 'abc';
		}
	};
	console.log(Object.getOwnPropertyDescriptors(obj4));

	// __proto__属性
	// __proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。目前，所有浏览器（包括 IE11）都部署了这个属性。
	// 该属性没有写入 ES6 的正文，而是写入了附录，原因是__proto__前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。

	// ES6 Object.setPrototypeOf(obj, prototype)
	// 用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
	// Chrome 34+/Firefox 31+/IE11+
	//
	var proto = {};
	var obj5 = { x: 10 };
	Object.setPrototypeOf(obj5, proto);

	proto.y = 20;
	proto.z = 40;

	console.log(obj5.__proto__);

	console.log(obj5); // {x: 10}
	console.log(obj5.x); // 10
	console.log(obj5.y); // 20
	console.log(obj5.z); // 40


	// ES5 Object.getPrototypeOf(object)
	// 该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
	// 如果参数不是对象，会被自动转为对象。
	// Chrome 5+/Firefox 3.5+/IE9+/Safari 5+
	console.log(Object.getPrototypeOf(obj5));
	console.log(Object.getPrototypeOf(1));

	// Object.getPrototypeOf(Object)  不是  Object.prototype
	// JavaScript中的 Object 是构造函数（创建对象的包装器）。

	// Object.getPrototypeOf( Object )是把Object这一构造函数看作对象，
	// 返回的当然是函数对象的原型，也就是 Function.prototype。
	console.log(Object.getPrototypeOf(Object)); // ƒ () { [native code] }
	console.log(Object.getPrototypeOf(Function)); // ƒ () { [native code] }

	// 正确的方法是，Object.prototype是构造出来的对象的原型。
	var obj6 = new Object();
	console.log(Object.prototype === Object.getPrototypeOf(obj6)); // true
	console.log(Object.prototype === Object.getPrototypeOf({})); // true


	// super关键字
	// this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
	var proto2 = {
		foo: 'hello'
	};

	var obj7 = _obj2 = {
		find: function find() {
			return _get(_obj2.__proto__ || Object.getPrototypeOf(_obj2), 'foo', this);
		}
	};

	console.log(obj7.find()); // undefined
	Object.setPrototypeOf(obj7, proto2);
	console.log(obj7.find()); // 'hello'

	// super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
	// 第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。
	// JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。
	//
	// const obj8 = {
	// 	foo: super.abc
	// };
	// const obj9 = {
	// 	foo: () => super.abc
	// };
	// const obj10 = {
	// 	foo: function() {
	// 		return super.abc;
	// 	}
	// };

	// ES5 Object.keys()
	// ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
	// 数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。
	// Chrome 5+/Firefox 4+/IE9+/Safari 5+
	var obj11 = {
		foo: 'abr',
		baz: 42
	};
	console.log(Object.keys(obj11)); // ['foo', 'baz']


	// ES2017 Object.values()
	// 该方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
	// Chrome 54+/Firefox 47+/Safari 10.1+
	console.log(Object.values(obj11));

	// ES2017 Object.entries()
	// 该方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
	// Chrome 54+/Firefox 47+/Safari 10.1+
	console.log(Object.entries(obj11));

	// 对象的扩展运算符（...）
	// 用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
	// 暂无浏览器支持，Node.js v9.4.0支持
	// const obj12 = {a: 1, b: 2};
	// const obj13 = {...obj12};
	// obj12.a = 11;
	// obj12.b = 22;
	// console.log(obj13);


	// ES5 Object.defineProperty(obj, prop, descriptor)
	// 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
	// Chrome 5+,Firefox 4+,IE9+,Safari 5.1+
	var obj13 = { a: 1, b: 2 };

	Object.defineProperty(obj13, "key", {
		enumerable: false, // 是否可以在for...in循环和Object.keys()中被枚举
		configurable: false, // 是否可以被删除
		writable: false, // 是佛可读写
		value: "static" // 属性的值
	});

	for (var name in obj13) {
		console.log(name);
	}
	console.log(obj13.key);

	// ES5 Object.getOwnPropertyNames(obj)
	// 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
	// Chrome 5+,Firefox 4+,IE9+,Safari 5.1+
	var proto3 = { a: 1, b: 2 };
	var obj14 = { 0: "a", 1: "b", 2: "c" };
	Object.setPrototypeOf(obj14, proto3);
	Object.defineProperty(obj14, "key", {
		enumerable: false, // 是否可以在for...in循环和Object.keys()中被枚举
		configurable: false, // 是否可以被删除
		writable: false, // 是佛可读写
		value: "static" // 属性的值
	});
	console.log(Object.getOwnPropertyNames(obj14)); // ['0', '1', '2', 'key']
	console.log(obj14.a, obj14.b); // 1 2


	// ES5 obj.hasOwnProperty(prop)
	// 返回一个布尔值，指示对象自身属性中是否具有指定的属性
	// 所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
	// 无浏览器兼容性
	console.log(obj14.hasOwnProperty('0')); // true
	console.log(obj14.hasOwnProperty('a')); // false
	console.log(obj14.hasOwnProperty('key')); // true


	// ES5 Object.create(proto[, propertiesObject])
	// 使用指定的原型对象及其属性去创建一个新的对象，新对象将继承该原型对象。
	// Chrome 5+,Firefox 4+,IE 9+,Safari 5+

	// 父类
	function Shape() {
		this.x = 0;
		this.y = 0;
	}

	// 父类的方法
	Shape.prototype.move = function (x, y) {
		this.x += x;
		this.y += y;
		console.log('Shape moved');
	};

	// 子类
	function Rectangle() {
		Shape.call(this); // 调用父类构造函数
	}

	// 子类继承父类
	console.log(Object.create(Shape.prototype));

	Rectangle.prototype = Object.create(Shape.prototype);
	Rectangle.prototype.constructor = Rectangle;

	// 因为使用“.prototype =...”后,constructor会改变为“=...”的那个
	// constructor，所以要重新指定.constructor 为自身。

	console.log(Rectangle.prototype);
}();

// ============================================================================
// ============================================================================
// Symbol数据类型
// ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
// 它是 JavaScript 语言的第七种数据类型，
// 前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

false && function () {

	var s = Symbol();
	console.log(typeof s === 'undefined' ? 'undefined' : _typeof(s)); // 'symbol'

	var s1 = Symbol('foo');
	var s2 = Symbol('bar');

	console.log(s1); // Symbol(foo)
	console.log(s2); // Symbol(bar)

	console.log(s1.toString()); // "Symbol(foo)"
	console.log(s2.toString()); // "Symbol(bar)"

	// Symbol 值不能与其他类型的值进行运算，会报错。

	// 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
	var mySymbol = Symbol();

	var obj1 = {};
	obj1[mySymbol] = 'test1';

	var obj2 = _defineProperty({}, mySymbol, 'test2');

	var obj3 = {};
	Object.defineProperty(obj3, mySymbol, { value: 'test3' });

	// Symbol 值作为对象属性名时，不能用点运算符。
	console.log(obj1.mySymbol); // undefined
	console.log(obj1[mySymbol]); // test1
	console.log(obj1['mySymbol']); // undefined


	// 常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证下面的switch语句会按设计的方式工作。
	var COLOR_RED = Symbol();
	var COLOR_GREEN = Symbol();

	function getComplement(color) {
		switch (color) {
			case COLOR_RED:
				return COLOR_GREEN;
			case COLOR_GREEN:
				return COLOR_RED;
			default:
				throw new Error('Undefined color');
		}
	}
}();

// ============================================================================
// ============================================================================
// Set和Map数据结构
//
// ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Chrome 38+,Firefox 25+,IE11+,Safari 7.1+
// ES6 的 WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，WeakSet的成员只能是对象，且对象都是弱引用，不计入垃圾回收机制。Chrome 38+, Firefox 34+, Safari 9+
//
// ES6 提供了 Map 数据结构ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Chrome 38+,Firefox 37+,IE11+,Safari 9+
// WeakMap结构与Map结构类似，也是用于生成键值对的集合。但是WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名，并且键名所指向的对象，不计入垃圾回收机制。Chrome 38+,Firefox 37+,IE11+,Safari 9+

false && function () {

	// 通过.add()方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。
	var s = new Set();
	[2, 3, 4, 5, 4, 3, 2, 2].forEach(function (val) {
		return s.add(val);
	});
	console.log(s);

	// Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
	var s2 = new Set([1, 2, 3, 4, 4, 5, 4, 3, 2, 1]);
	console.log(s2);

	// .size属性表示 Set 结构的长度
	console.log('size:', s2.size);

	// 四个操作方法
	// add(value)：添加某个值，返回 Set 结构本身。
	// delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
	// has(value)：返回一个布尔值，表示该值是否为Set的成员。
	// clear()：清除所有成员，没有返回值。

	s2.add('a').add('b').add('c');
	console.log(s2);

	s2.delete(1);
	s2.delete('a');
	console.log(s2);

	console.log(s2.has(4));
	console.log(s2.has('4'));

	s2.clear();
	console.log(s2);

	// Array.form方法可以将Set结构转换为数组
	var items = new Set([1, 2, 3, 4, 5]);
	var arr = Array.from(items);
	console.log(arr);

	// 数组去重
	console.log(Array.from(new Set([1, 2, 3, 3, 2, 1])));

	// Set 结构的实例有四个遍历方法，可以用于遍历成员。
	// keys()：返回键名的遍历器
	// values()：返回键值的遍历器
	// entries()：返回键值对的遍历器
	// forEach()：使用回调函数遍历每个成员
	// 需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

	var set = new Set(['red', 'green', 'blue', 1, 2, 3]);

	// 键名即键值
	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = set.keys()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var item = _step3.value;

			console.log(item);
		}

		// 键值
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = set.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var _item = _step4.value;

			console.log(_item);
		}

		// [键名,键值]
	} catch (err) {
		_didIteratorError4 = true;
		_iteratorError4 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion4 && _iterator4.return) {
				_iterator4.return();
			}
		} finally {
			if (_didIteratorError4) {
				throw _iteratorError4;
			}
		}
	}

	var _iteratorNormalCompletion5 = true;
	var _didIteratorError5 = false;
	var _iteratorError5 = undefined;

	try {
		for (var _iterator5 = set.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
			var _item2 = _step5.value;

			console.log(_item2);
		}

		// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
	} catch (err) {
		_didIteratorError5 = true;
		_iteratorError5 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion5 && _iterator5.return) {
				_iterator5.return();
			}
		} finally {
			if (_didIteratorError5) {
				throw _iteratorError5;
			}
		}
	}

	var _iteratorNormalCompletion6 = true;
	var _didIteratorError6 = false;
	var _iteratorError6 = undefined;

	try {
		for (var _iterator6 = set[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
			var _item3 = _step6.value;

			console.log(_item3);
		}

		// forEach遍历
	} catch (err) {
		_didIteratorError6 = true;
		_iteratorError6 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion6 && _iterator6.return) {
				_iterator6.return();
			}
		} finally {
			if (_didIteratorError6) {
				throw _iteratorError6;
			}
		}
	}

	set.forEach(function (name, value, obj) {
		console.log(name, value, obj);
	});

	// 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。
	var set2 = new Set(['a', 'b', 'c']);
	var arr2 = [].concat(_toConsumableArray(set2));
	console.log(arr2);

	// 数组去重
	console.log([].concat(_toConsumableArray(new Set([1, 2, 3, 3, 2, 1]))));

	// 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
	var a = new Set([1, 2, 3]);
	var b = new Set([4, 3, 2]);

	// 并集
	var union = new Set([].concat(_toConsumableArray(a), _toConsumableArray(b)));
	console.log(union);

	// 交集
	var intersect = new Set([].concat(_toConsumableArray(a)).filter(function (x) {
		return b.has(x);
	}));
	console.log(intersect);

	// 差集
	var difference = new Set([].concat(_toConsumableArray(a)).filter(function (x) {
		return !b.has(x);
	}));
	console.log(difference);

	// WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，WeakSet的成员只能是对象，且对象都是弱引用，不计入垃圾回收机制。
	var ws = new WeakSet([[1, 2], [3, 4]]);
	console.log(ws);

	// WeakSet 结构有以下三个方法。
	// WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
	// WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
	// WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。


	// ES6 提供了 Map 数据结构ES6 提供了 Map 数据结构。
	// 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
	// 也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
	// 如果你需要“键值对”的数据结构，Map 比 Object 更合适。

	// 无参数创建一个Map数据
	var map1 = new Map();
	var o = { p: 'test a message' };

	// 设置成员
	map1.set(o, 'content');
	map1.set('abc', 'content2');
	map1.set('abc', 'content2-new value');

	// 获取成员
	console.log(map1.get(o));
	console.log(map1.get('abc'));
	console.log(map1.get('somename'));

	// 判断是否存在某个成员
	console.log(map1.has(o));

	// 删除某个成员
	console.log(map1.delete(o));

	// 判断是否存在某个成员
	console.log(map1.has(o));

	// 获取成员数量
	console.log(map1.size);

	// 清空对象
	console.log(map1.clear());

	// 输出对象
	console.log(map1);

	// Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
	var map2 = new Map([['name', '张三'], ['title', 'Author']]);

	console.log(map2);

	// Map 结构原生提供三个遍历器生成函数和一个遍历方法。
	// keys()：返回键名的遍历器。
	// values()：返回键值的遍历器。
	// entries()：返回所有成员的遍历器。
	// forEach()：遍历 Map 的所有成员。
	// 需要特别注意的是，Map 的遍历顺序就是插入顺序。

	var _iteratorNormalCompletion7 = true;
	var _didIteratorError7 = false;
	var _iteratorError7 = undefined;

	try {
		for (var _iterator7 = map2.keys()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
			var key = _step7.value;

			console.log(key);
		}
	} catch (err) {
		_didIteratorError7 = true;
		_iteratorError7 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion7 && _iterator7.return) {
				_iterator7.return();
			}
		} finally {
			if (_didIteratorError7) {
				throw _iteratorError7;
			}
		}
	}

	console.log([].concat(_toConsumableArray(map2.keys())));

	var _iteratorNormalCompletion8 = true;
	var _didIteratorError8 = false;
	var _iteratorError8 = undefined;

	try {
		for (var _iterator8 = map2.values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
			var value = _step8.value;

			console.log(value);
		}
	} catch (err) {
		_didIteratorError8 = true;
		_iteratorError8 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion8 && _iterator8.return) {
				_iterator8.return();
			}
		} finally {
			if (_didIteratorError8) {
				throw _iteratorError8;
			}
		}
	}

	console.log([].concat(_toConsumableArray(map2.values())));

	var _iteratorNormalCompletion9 = true;
	var _didIteratorError9 = false;
	var _iteratorError9 = undefined;

	try {
		for (var _iterator9 = map2.entries()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
			var _ref10 = _step9.value;

			var _ref11 = _slicedToArray(_ref10, 2);

			var _key3 = _ref11[0];
			var _value = _ref11[1];

			console.log(_key3, _value);
		}
	} catch (err) {
		_didIteratorError9 = true;
		_iteratorError9 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion9 && _iterator9.return) {
				_iterator9.return();
			}
		} finally {
			if (_didIteratorError9) {
				throw _iteratorError9;
			}
		}
	}

	console.log([].concat(_toConsumableArray(map2.entries())));

	// 等同于map.entries
	// 表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
	var _iteratorNormalCompletion10 = true;
	var _didIteratorError10 = false;
	var _iteratorError10 = undefined;

	try {
		for (var _iterator10 = map2[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
			var _item4 = _step10.value;

			console.log(_item4);
		}

		// WeakMap结构与Map结构类似，也是用于生成键值对的集合。但是WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名，并且键名所指向的对象，不计入垃圾回收机制。
		// WeakMap只有四个方法可用：get()、set()、has()、delete()。
	} catch (err) {
		_didIteratorError10 = true;
		_iteratorError10 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion10 && _iterator10.return) {
				_iterator10.return();
			}
		} finally {
			if (_didIteratorError10) {
				throw _iteratorError10;
			}
		}
	}
}();

// ============================================================================
// ============================================================================
// Reflect对象
// Chrome 49+,Firefox 42+,Safari 10+，IE不支持
// Reflect对象一共有 13 个静态方法。
//
// Reflect.apply(target, thisArg, args)
// Reflect.construct(target, args)
// Reflect.get(target, name, receiver)
// Reflect.set(target, name, value, receiver)
// Reflect.defineProperty(target, name, desc)
// Reflect.deleteProperty(target, name)
// Reflect.has(target, name)
// Reflect.ownKeys(target)
// Reflect.isExtensible(target)
// Reflect.preventExtensions(target)
// Reflect.getOwnPropertyDescriptor(target, name)
// Reflect.getPrototypeOf(target)
// Reflect.setPrototypeOf(target, prototype)
//
// 上面这些方法的作用，大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。下面是对它们的解释。

false && function () {
	var _obj4;

	// Reflect对象的设计目的有这样几个。
	//
	// 1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
	// 现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。
	// 也就是说，从Reflect对象上可以拿到语言内部的方法。
	//
	// 2. 修改某些Object方法的返回结果，让其变得更合理。
	// 比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，
	// 而Reflect.defineProperty(obj, name, desc)则会返回false。

	// 老写法
	// try {
	// 	Object.defineProperty(target, property, attributes);
	// 	// success
	// } catch (e) {
	// 	// failure
	// }

	// 新写法
	var obj = { a: 1, b: 2 };

	if (Reflect.defineProperty(obj, 'c', {
		enumerable: true, // 是否可以在for...in循环和Object.keys()中被枚举
		configurable: true, // 是否可以被删除
		writable: true, // 是佛可读写
		value: 3 // 属性的值
	})) {
		console.log('success');
		console.log(obj);
	} else {
		console.log('failure');
	}

	// 让Object操作都变成函数行为。某些Object操作是命令式，
	// 比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

	// 老写法
	// 'assign' in Object

	// 写写法
	console.log(Reflect.has(Object, 'assign'));

	// Reflect.get(target, name, receiver)
	// Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
	var obj2 = {
		foo: 1,
		bar: 2,
		get baz() {
			return this.foo + this.bar;
		}
	};
	console.log(Reflect.get(obj2, 'foo')); // 1
	console.log(Reflect.get(obj2, 'bar')); // 2
	console.log(Reflect.get(obj2, 'baz')); // 3
	console.log(Reflect.get(obj2, 'somename')); // undefined


	// Reflect.set(target, name, value, receiver)
	// Reflect.set方法设置target对象的name属性等于value。
	var obj3 = {
		foo: 1,
		set bar(value) {
			return this.foo = value;
		}
	};
	console.log(obj3.foo); // 1

	Reflect.set(obj3, 'foo', 2);
	console.log(obj3.foo); // 2

	Reflect.set(obj3, 'bar', 3);
	console.log(obj3.foo); // 3

	// 赋值函数的this指向receiver
	var obj4 = {
		foo: 4,
		set bar(value) {
			return this.foo = value;
		}
	};

	var myReceiver = { foo: 0 };

	Reflect.set(obj4, 'bar', 1, myReceiver);

	console.log(obj4.foo); // 4
	console.log(myReceiver.foo); // 1


	// Reflect.has(obj, name)
	// Reflect.has方法对应name in obj里面的in运算符。
	console.log(Reflect.has(Math, 'round')); // true
	console.log(Reflect.has(Math, 'test')); // false


	// Reflect.deleteProperty(obj, name)
	// Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
	// 该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false。
	var obj5 = { a: 1, b: 2, c: 3 };
	console.log(Reflect.deleteProperty(obj5, 'c'));
	console.log(obj5); // {a:1, b:2}


	// Reflect.construct(target, args)
	// Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
	function Greeting(name) {
		this.name = name;
	}
	var obj6 = Reflect.construct(Greeting, ['张三']);
	console.log(obj6);

	// Reflect.getPrototypeOf(obj)
	// Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
	// Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。
	console.log(Reflect.getPrototypeOf({}));

	// Reflect.setPrototypeOf(obj, newProto)
	// Reflect.setPrototypeOf方法用于设置对象的__proto__属性，返回第一个参数对象，对应Object.setPrototypeOf(obj, newProto)。
	// 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。
	// 如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。
	var obj7 = {};
	Reflect.setPrototypeOf(obj7, { a: 1, b: 2 });
	console.log(obj7.a, obj7.b);

	// Reflect.apply(func, thisArg, args)
	// Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
	// 一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。

	var fun1 = function fun1() {
		for (var _len2 = arguments.length, args = Array(_len2), _key4 = 0; _key4 < _len2; _key4++) {
			args[_key4] = arguments[_key4];
		}

		console.log(args);
		console.log(this);
	};
	Reflect.apply(fun1, { a: 1, b: 2 }, ['a', 'b', 'c']);

	// Reflect.defineProperty(target, propertyKey, attributes)
	// Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。
	// 如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误，比如Reflect.defineProperty(1, 'foo')。
	var obj8 = {};
	Reflect.defineProperty(obj8, 'a', { value: 'test 123' });
	console.log(obj8);

	// Reflect.getOwnPropertyDescriptor(target, propertyKey)
	// Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。
	// Reflect.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptor的一个区别是，如果第一个参数不是对象，Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，表示参数非法。
	var obj9 = { a: 1, b: 2 };
	Reflect.defineProperty(obj9, 'c', {
		value: 'test 111',
		enumerable: false
	});
	console.log(Reflect.getOwnPropertyDescriptor(obj9, 'c'));

	// Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
	// 如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。
	var obj10 = { a: 1, b: 2 };
	console.log(Reflect.isExtensible(obj10));

	// 默认情况下，对象是可扩展的：即可以为他们添加新的属性。以及它们的 __proto__  属性可以被更改。
	// Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）。

	// Object.freeze() 方法
	// 可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。
	//
	// Object.seal() 方法
	// 可以让一个对象密封，并返回被密封后的对象。密封对象将会阻止向对象添加新的属性，并且会将所有已有属性的可配置性（configurable）置为不可配置（false），即不可修改属性的描述或删除属性。但是可写性描述（writable）为可写（true）的属性的值仍然可以被修改。
	//
	// Object.preventExtensions()方法
	// 让一个对象变的不可扩展，也就是永远不能再添加新的属性。
	Object.preventExtensions(obj10);
	console.log(Reflect.isExtensible(obj10));

	// Reflect.preventExtensions(target)
	// Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
	var obj11 = { a: 1 };
	Reflect.preventExtensions(obj11);
	console.log(Reflect.isExtensible(obj11));

	// Reflect.ownKeys (target)
	// Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
	var obj12 = (_obj4 = {
		foo: 1,
		bar: 2
	}, _defineProperty(_obj4, Symbol.for('baz'), 3), _defineProperty(_obj4, Symbol.for('bing'), 4), _obj4);
	console.log(Object.getOwnPropertyNames(obj12));
	console.log(Object.getOwnPropertySymbols(obj12));
	console.log(Reflect.ownKeys(obj12));
}();

// ============================================================================
// ============================================================================
// Iterator 和 for...of 循环
// Chrome 43+,Firefox 36+,Safari 10+，IE不支持
//
// Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（详见下文）。
// 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
//
// 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
// ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被for...of循环遍历。
// 原因在于，这些数据结构原生部署了Symbol.iterator属性（详见下文），另外一些数据结构没有（比如对象）。
// 凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。
//
// 原生具备 Iterator 接口的数据结构如下。
// Array
// Set
// Map
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象
//
// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。
// 也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。
//
// for...of循环可以使用的范围包括数组、Set 和 Map 结构、
// 某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

false && function () {

	var array1 = ['a', 'b', 'c'];
	var iter = array1[Symbol.iterator]();

	console.log(iter.next()); // { value: 'a', done: false }
	console.log(iter.next()); // { value: 'b', done: false }
	console.log(iter.next()); // { value: 'c', done: false }
	console.log(iter.next()); // { value: undefined, done: true }


	// 下面代码是一个类部署 Iterator 接口的写法。Symbol.iterator属性对应一个函数，执行后返回当前对象的遍历器对象。

	var RangeIterator = function () {
		function RangeIterator(start, stop) {
			_classCallCheck(this, RangeIterator);

			this.value = start;
			this.stop = stop;
		}

		_createClass(RangeIterator, [{
			key: Symbol.iterator,
			value: function value() {
				return this;
			}
		}, {
			key: 'next',
			value: function next() {
				var value = this.value;
				if (value < this.stop) {
					this.value++;
					return { done: false, value: value };
				}
				return { done: true, value: undefined };
			}
		}]);

		return RangeIterator;
	}();

	function range(start, stop) {
		return new RangeIterator(start, stop);
	}

	var _iteratorNormalCompletion11 = true;
	var _didIteratorError11 = false;
	var _iteratorError11 = undefined;

	try {
		for (var _iterator11 = range(0, 3)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
			var value = _step11.value;

			console.log(value); // 0, 1, 2
		}

		// 使用for...of遍历数组
	} catch (err) {
		_didIteratorError11 = true;
		_iteratorError11 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion11 && _iterator11.return) {
				_iterator11.return();
			}
		} finally {
			if (_didIteratorError11) {
				throw _iteratorError11;
			}
		}
	}

	var arr2 = ['a', 'b', 'c'];

	var _iteratorNormalCompletion12 = true;
	var _didIteratorError12 = false;
	var _iteratorError12 = undefined;

	try {
		for (var _iterator12 = arr2[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
			var val = _step12.value;

			console.log(val);
		}

		// 遍历器结构的简单模拟
	} catch (err) {
		_didIteratorError12 = true;
		_iteratorError12 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion12 && _iterator12.return) {
				_iterator12.return();
			}
		} finally {
			if (_didIteratorError12) {
				throw _iteratorError12;
			}
		}
	}

	var likeArr = {
		'0': 'a-0',
		'1': 'b-1',
		'2': 'c-2',
		length: 3
	};

	var _iteratorNormalCompletion13 = true;
	var _didIteratorError13 = false;
	var _iteratorError13 = undefined;

	try {
		for (var _iterator13 = toInterator(likeArr)[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
			var item = _step13.value;

			console.log('遍历器模拟：', item);
			break;
		}
	} catch (err) {
		_didIteratorError13 = true;
		_iteratorError13 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion13 && _iterator13.return) {
				_iterator13.return();
			}
		} finally {
			if (_didIteratorError13) {
				throw _iteratorError13;
			}
		}
	}

	function toInterator(likeArr) {

		likeArr[Symbol.iterator] = function () {

			var index = 0,
			    that = this,
			    length = that.length;

			return {
				next: function next() {

					var value = that[index];

					if (index++ < length) {
						return { done: false, value: value };
					} else {
						return { done: true, value: undefined };
					}
				},
				return: function _return() {
					console.log('遍历器模拟：do return callback');
					return { done: true };
				}
			};
		};

		return likeArr;
	}

	console.log(likeArr);

	// 有一些场合会默认调用 Iterator 接口（即Symbol.iterator方法），除了下文会介绍的for...of循环，还有几个别的场合。

	// （1）解构赋值
	// 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
	//
	var set = new Set().add('a').add('b').add('c');

	var _set = _slicedToArray(set, 2),
	    x = _set[0],
	    y = _set[1]; // x='a'; y='b'


	var _set2 = _toArray(set),
	    first = _set2[0],
	    rest = _set2.slice(1); // first='a'; rest=['b','c'];

	// （2）扩展运算符
	// 扩展运算符（...）也会调用默认的 Iterator 接口。

	// 例一


	var str = 'hello';
	[].concat(_toConsumableArray(str)); //  ['h','e','l','l','o']

	// 例二
	var arr = ['b', 'c'];
	['a'].concat(arr, ['d']); // ['a', 'b', 'c', 'd']

	// （3）yield*
	// yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。


	// （4）其他场合
	// 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。
	//
	// for...of
	// Array.from()
	// Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
	// Promise.all()
	// Promise.race()


	// 字符串的 Iterator 接口
	// 字符串是一个类似数组的对象，也原生具有 Iterator 接口。
	var somestr = 'hi';
	console.log(somestr[Symbol.iterator]);

	var iterator = somestr[Symbol.iterator]();
	console.log(iterator.next()); // { value: "h", done: false }
	console.log(iterator.next()); // { value: "i", done: false }
	console.log(iterator.next()); // { value: undefined, done: true }
}();

// ============================================================================
// ============================================================================
// Generator 函数（生成器函数）
// Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
// Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
// 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
// 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
// 形式上，Generator 函数是一个普通函数，但是有两个特征。
// 一是，function关键字与函数名之间有一个星号；
// 二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。
// Chrome 39.0+, Firefox,IE不支持,Safari不支持

false && function () {
	var _marked = /*#__PURE__*/regeneratorRuntime.mark(helloGenerator),
	    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(testGenerator2),
	    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(testGenerator3),
	    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(testGenerator4),
	    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(testGenerator5),
	    _marked6 = /*#__PURE__*/regeneratorRuntime.mark(testGenerator6),
	    _marked7 = /*#__PURE__*/regeneratorRuntime.mark(fibonacci),
	    _marked8 = /*#__PURE__*/regeneratorRuntime.mark(objectEntries),
	    _marked9 = /*#__PURE__*/regeneratorRuntime.mark(objectEntries2),
	    _marked10 = /*#__PURE__*/regeneratorRuntime.mark(numbers),
	    _marked11 = /*#__PURE__*/regeneratorRuntime.mark(testGenerator11),
	    _marked12 = /*#__PURE__*/regeneratorRuntime.mark(testGenerator12),
	    _marked13 = /*#__PURE__*/regeneratorRuntime.mark(testGenerator13),
	    _marked14 = /*#__PURE__*/regeneratorRuntime.mark(testGenerator14),
	    _marked15 = /*#__PURE__*/regeneratorRuntime.mark(genTest1),
	    _marked16 = /*#__PURE__*/regeneratorRuntime.mark(genTest2),
	    _marked17 = /*#__PURE__*/regeneratorRuntime.mark(genTest2_2),
	    _marked18 = /*#__PURE__*/regeneratorRuntime.mark(genTest2_3),
	    _marked19 = /*#__PURE__*/regeneratorRuntime.mark(genTest3),
	    _marked20 = /*#__PURE__*/regeneratorRuntime.mark(genTest3_2),
	    _marked21 = /*#__PURE__*/regeneratorRuntime.mark(genTest4),
	    _marked22 = /*#__PURE__*/regeneratorRuntime.mark(genTest5),
	    _marked23 = /*#__PURE__*/regeneratorRuntime.mark(genTest5_2),
	    _marked24 = /*#__PURE__*/regeneratorRuntime.mark(genTest6),
	    _marked25 = /*#__PURE__*/regeneratorRuntime.mark(logReturned),
	    _marked26 = /*#__PURE__*/regeneratorRuntime.mark(iterTree),
	    _marked27 = /*#__PURE__*/regeneratorRuntime.mark(genTest7),
	    _marked28 = /*#__PURE__*/regeneratorRuntime.mark(toGenerator);

	function helloGenerator() {
		return regeneratorRuntime.wrap(function helloGenerator$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return 'hello';

					case 2:
						_context.next = 4;
						return 'world';

					case 4:
						return _context.abrupt('return', 'ending');

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		}, _marked, this);
	}

	var gen = helloGenerator();

	console.log(gen);
	console.log(gen[Symbol.iterator]);
	console.log(gen.next()); // { value: 'hello', done: false }
	console.log(gen.next()); // { value: 'world', done: false }
	console.log(gen.next()); // { value: 'ending', done: true }
	console.log(gen.next()); // { value: undefined, done: true }

	// 总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。
	// 以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
	// value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

	// ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。
	// function * foo(x, y) { ··· }
	// function *foo(x, y) { ··· }
	// function* foo(x, y) { ··· }
	// function*foo(x, y) { ··· }

	// 遍历器对象的next方法的运行逻辑如下。
	// （1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
	// （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
	// （3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
	// （4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

	// Generator 函数可以返回一系列的值，因为可以有任意多个yield。
	// 从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。


	// Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。
	function testGenerator2() {
		return regeneratorRuntime.wrap(function testGenerator2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						console.log('执行了');

					case 1:
					case 'end':
						return _context2.stop();
				}
			}
		}, _marked2, this);
	}
	var gen2 = testGenerator2();
	gen2.next();

	// 另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
	// (function (){
	//   	yield 1;
	// })();


	// yield表达式如果用在另一个表达式之中，必须放在圆括号里面。

	// function* demo() {
	//   console.log('Hello' + yield); // SyntaxError
	//   console.log('Hello' + yield 123); // SyntaxError

	//   console.log('Hello' + (yield)); // OK
	//   console.log('Hello' + (yield 123)); // OK
	// }


	// yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
	function testGenerator3() {
		var i, reset;
		return regeneratorRuntime.wrap(function testGenerator3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						i = 0;

					case 1:
						if (!true) {
							_context3.next = 9;
							break;
						}

						_context3.next = 4;
						return i;

					case 4:
						reset = _context3.sent;

						console.log(reset);

					case 6:
						i++;
						_context3.next = 1;
						break;

					case 9:
					case 'end':
						return _context3.stop();
				}
			}
		}, _marked3, this);
	}
	var gen3 = testGenerator3();

	console.log(gen3.next()); // {value: 0, done: false}
	console.log(gen3.next()); // {value: 1, done: false}
	console.log(gen3.next()); // {value: 2, done: false}
	console.log(gen3.next('a')); // {value: 0, done: false}

	// Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。
	// 通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。
	// 也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

	function testGenerator4(x) {
		var y, z;
		return regeneratorRuntime.wrap(function testGenerator4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.next = 2;
						return x + 1;

					case 2:
						_context4.t0 = _context4.sent;
						y = 2 * _context4.t0;
						_context4.next = 6;
						return y / 3;

					case 6:
						z = _context4.sent;
						return _context4.abrupt('return', x + y + z);

					case 8:
					case 'end':
						return _context4.stop();
				}
			}
		}, _marked4, this);
	}
	var gen4 = testGenerator4(5);
	console.log(gen4.next()); // {value: 6, done: false}
	console.log(gen4.next()); // {value: NaN, done: false}
	console.log(gen4.next()); // {value: NaN, done: true}


	var gen4_2 = testGenerator4(5);
	console.log(gen4_2.next()); // {value: 6, done: false}
	console.log(gen4_2.next(6)); // {value: 4, done: false}
	console.log(gen4_2.next(3)); // {value: 20, done: false}   x=5  y=12  z=3


	function testGenerator5() {
		return regeneratorRuntime.wrap(function testGenerator5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						console.log('Started');
						_context5.t0 = console;
						_context5.next = 4;
						return;

					case 4:
						_context5.t1 = _context5.sent;
						_context5.t2 = '1. ' + _context5.t1;

						_context5.t0.log.call(_context5.t0, _context5.t2);

						_context5.t3 = console;
						_context5.next = 10;
						return;

					case 10:
						_context5.t4 = _context5.sent;
						_context5.t5 = '2. ' + _context5.t4;

						_context5.t3.log.call(_context5.t3, _context5.t5);

						return _context5.abrupt('return', 'result');

					case 14:
					case 'end':
						return _context5.stop();
				}
			}
		}, _marked5, this);
	}
	var gen5 = testGenerator5();
	console.log(gen5.next()); // {value: undefined, done: false}
	console.log(gen5.next('abc')); // 1. abc {value: undefined, done: false}
	console.log(gen5.next('efg')); // 2. efg {value: 'result', done: true}


	// for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。
	function testGenerator6() {
		return regeneratorRuntime.wrap(function testGenerator6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.next = 2;
						return 1;

					case 2:
						_context6.next = 4;
						return 2;

					case 4:
						_context6.next = 6;
						return 3;

					case 6:
						_context6.next = 8;
						return 4;

					case 8:
						_context6.next = 10;
						return 5;

					case 10:
						return _context6.abrupt('return', 6);

					case 11:
					case 'end':
						return _context6.stop();
				}
			}
		}, _marked6, this);
	}

	// return语句返回的6，不包括在for...of循环之中。
	var _iteratorNormalCompletion14 = true;
	var _didIteratorError14 = false;
	var _iteratorError14 = undefined;

	try {
		for (var _iterator14 = testGenerator6()[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
			var value = _step14.value;

			console.log(value);
		}

		// 下面是一个利用 Generator 函数和for...of循环，实现斐波那契数列的例子。
	} catch (err) {
		_didIteratorError14 = true;
		_iteratorError14 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion14 && _iterator14.return) {
				_iterator14.return();
			}
		} finally {
			if (_didIteratorError14) {
				throw _iteratorError14;
			}
		}
	}

	function fibonacci() {
		var prev, curr, _ref12;

		return regeneratorRuntime.wrap(function fibonacci$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						prev = 0, curr = 1;

					case 1:
						_ref12 = [curr, prev + curr];
						prev = _ref12[0];
						curr = _ref12[1];
						_context7.next = 6;
						return curr;

					case 6:
						_context7.next = 1;
						break;

					case 8:
					case 'end':
						return _context7.stop();
				}
			}
		}, _marked7, this);
	}

	var _iteratorNormalCompletion15 = true;
	var _didIteratorError15 = false;
	var _iteratorError15 = undefined;

	try {
		for (var _iterator15 = fibonacci()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
			var n = _step15.value;

			if (n > 1000) break;
			console.log(n);
		}

		// 利用for...of循环，可以写出遍历任意对象（object）的方法。
		// 原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
	} catch (err) {
		_didIteratorError15 = true;
		_iteratorError15 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion15 && _iterator15.return) {
				_iterator15.return();
			}
		} finally {
			if (_didIteratorError15) {
				throw _iteratorError15;
			}
		}
	}

	function objectEntries(obj) {
		var propKeys, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, key;

		return regeneratorRuntime.wrap(function objectEntries$(_context8) {
			while (1) {
				switch (_context8.prev = _context8.next) {
					case 0:
						propKeys = Reflect.ownKeys(obj);
						_iteratorNormalCompletion16 = true;
						_didIteratorError16 = false;
						_iteratorError16 = undefined;
						_context8.prev = 4;
						_iterator16 = propKeys[Symbol.iterator]();

					case 6:
						if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
							_context8.next = 13;
							break;
						}

						key = _step16.value;
						_context8.next = 10;
						return [key, obj[key]];

					case 10:
						_iteratorNormalCompletion16 = true;
						_context8.next = 6;
						break;

					case 13:
						_context8.next = 19;
						break;

					case 15:
						_context8.prev = 15;
						_context8.t0 = _context8['catch'](4);
						_didIteratorError16 = true;
						_iteratorError16 = _context8.t0;

					case 19:
						_context8.prev = 19;
						_context8.prev = 20;

						if (!_iteratorNormalCompletion16 && _iterator16.return) {
							_iterator16.return();
						}

					case 22:
						_context8.prev = 22;

						if (!_didIteratorError16) {
							_context8.next = 25;
							break;
						}

						throw _iteratorError16;

					case 25:
						return _context8.finish(22);

					case 26:
						return _context8.finish(19);

					case 27:
					case 'end':
						return _context8.stop();
				}
			}
		}, _marked8, this, [[4, 15, 19, 27], [20,, 22, 26]]);
	}
	var jane = { first: 'Jane', last: 'Doe' };

	var _iteratorNormalCompletion17 = true;
	var _didIteratorError17 = false;
	var _iteratorError17 = undefined;

	try {
		for (var _iterator17 = objectEntries(jane)[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
			var _ref13 = _step17.value;

			var _ref14 = _slicedToArray(_ref13, 2);

			var key = _ref14[0];
			var _value2 = _ref14[1];

			console.log(key + ' : ' + _value2);
		}

		// 加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面。
	} catch (err) {
		_didIteratorError17 = true;
		_iteratorError17 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion17 && _iterator17.return) {
				_iterator17.return();
			}
		} finally {
			if (_didIteratorError17) {
				throw _iteratorError17;
			}
		}
	}

	function objectEntries2(obj) {
		var propKeys, _iteratorNormalCompletion18, _didIteratorError18, _iteratorError18, _iterator18, _step18, _key5;

		return regeneratorRuntime.wrap(function objectEntries2$(_context9) {
			while (1) {
				switch (_context9.prev = _context9.next) {
					case 0:
						propKeys = Reflect.ownKeys(this);
						_iteratorNormalCompletion18 = true;
						_didIteratorError18 = false;
						_iteratorError18 = undefined;
						_context9.prev = 4;
						_iterator18 = propKeys[Symbol.iterator]();

					case 6:
						if (_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done) {
							_context9.next = 13;
							break;
						}

						_key5 = _step18.value;
						_context9.next = 10;
						return [_key5, this[_key5]];

					case 10:
						_iteratorNormalCompletion18 = true;
						_context9.next = 6;
						break;

					case 13:
						_context9.next = 19;
						break;

					case 15:
						_context9.prev = 15;
						_context9.t0 = _context9['catch'](4);
						_didIteratorError18 = true;
						_iteratorError18 = _context9.t0;

					case 19:
						_context9.prev = 19;
						_context9.prev = 20;

						if (!_iteratorNormalCompletion18 && _iterator18.return) {
							_iterator18.return();
						}

					case 22:
						_context9.prev = 22;

						if (!_didIteratorError18) {
							_context9.next = 25;
							break;
						}

						throw _iteratorError18;

					case 25:
						return _context9.finish(22);

					case 26:
						return _context9.finish(19);

					case 27:
					case 'end':
						return _context9.stop();
				}
			}
		}, _marked9, this, [[4, 15, 19, 27], [20,, 22, 26]]);
	}
	var john = { first: 'john', last: 'Dan' };
	john[Symbol.iterator] = objectEntries2;
	var _iteratorNormalCompletion19 = true;
	var _didIteratorError19 = false;
	var _iteratorError19 = undefined;

	try {
		for (var _iterator19 = john[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
			var _ref15 = _step19.value;

			var _ref16 = _slicedToArray(_ref15, 2);

			var _key6 = _ref16[0];
			var _value3 = _ref16[1];

			console.log(_key6, _value3);
		}

		// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
	} catch (err) {
		_didIteratorError19 = true;
		_iteratorError19 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion19 && _iterator19.return) {
				_iterator19.return();
			}
		} finally {
			if (_didIteratorError19) {
				throw _iteratorError19;
			}
		}
	}

	function numbers() {
		return regeneratorRuntime.wrap(function numbers$(_context10) {
			while (1) {
				switch (_context10.prev = _context10.next) {
					case 0:
						_context10.next = 2;
						return 1;

					case 2:
						_context10.next = 4;
						return 2;

					case 4:
						_context10.next = 6;
						return 3;

					case 6:
						return _context10.abrupt('return', 4);

					case 9:
					case 'end':
						return _context10.stop();
				}
			}
		}, _marked10, this);
	}

	console.log(numbers());

	console.log([].concat(_toConsumableArray(numbers())));

	console.log(Array.from(numbers()));

	var _numbers = numbers(),
	    _numbers2 = _slicedToArray(_numbers, 2),
	    x = _numbers2[0],
	    y = _numbers2[1];

	console.log(x, y);

	var _iteratorNormalCompletion20 = true;
	var _didIteratorError20 = false;
	var _iteratorError20 = undefined;

	try {
		for (var _iterator20 = numbers()[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
			var _n = _step20.value;

			console.log(_n);
		}

		// Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
	} catch (err) {
		_didIteratorError20 = true;
		_iteratorError20 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion20 && _iterator20.return) {
				_iterator20.return();
			}
		} finally {
			if (_didIteratorError20) {
				throw _iteratorError20;
			}
		}
	}

	var testGenerator7 = /*#__PURE__*/regeneratorRuntime.mark(function testGenerator7() {
		return regeneratorRuntime.wrap(function testGenerator7$(_context11) {
			while (1) {
				switch (_context11.prev = _context11.next) {
					case 0:
						_context11.prev = 0;
						_context11.next = 3;
						return;

					case 3:
						_context11.next = 8;
						break;

					case 5:
						_context11.prev = 5;
						_context11.t0 = _context11['catch'](0);

						console.log('内部捕获', _context11.t0);

					case 8:
					case 'end':
						return _context11.stop();
				}
			}
		}, testGenerator7, this, [[0, 5]]);
	});

	var gen7 = testGenerator7();
	console.log(gen7.next());

	try {
		gen7.throw('a');
		gen7.throw('b');
	} catch (e) {
		console.log('外部捕获', e);
	}

	// 上面代码中，遍历器对象i连续抛出两个错误。
	// 第一个错误被 Generator 函数体内的catch语句捕获。
	// i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。

	// throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。
	var testGenerator8 = /*#__PURE__*/regeneratorRuntime.mark(function testGenerator8() {
		return regeneratorRuntime.wrap(function testGenerator8$(_context12) {
			while (1) {
				switch (_context12.prev = _context12.next) {
					case 0:
						_context12.prev = 0;
						_context12.next = 3;
						return;

					case 3:
						_context12.next = 8;
						break;

					case 5:
						_context12.prev = 5;
						_context12.t0 = _context12['catch'](0);

						console.log(_context12.t0);

					case 8:
					case 'end':
						return _context12.stop();
				}
			}
		}, testGenerator8, this, [[0, 5]]);
	});
	var gen8 = testGenerator8();
	gen8.next();
	gen8.throw(new Error('出错啦！'));

	// 如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。
	var testGenerator9 = /*#__PURE__*/regeneratorRuntime.mark(function testGenerator9() {
		return regeneratorRuntime.wrap(function testGenerator9$(_context13) {
			while (1) {
				switch (_context13.prev = _context13.next) {
					case 0:
						if (!true) {
							_context13.next = 6;
							break;
						}

						_context13.next = 3;
						return;

					case 3:
						console.log('内部捕获');
						_context13.next = 0;
						break;

					case 6:
					case 'end':
						return _context13.stop();
				}
			}
		}, testGenerator9, this);
	});
	var gen9 = testGenerator9();
	gen9.next();

	try {
		gen9.throw('a');
		gen9.throw('b');
	} catch (e) {
		console.log('外部捕获', e);
	}

	// 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。

	// throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。

	var testGenerator10 = /*#__PURE__*/regeneratorRuntime.mark(function testGenerator10() {
		return regeneratorRuntime.wrap(function testGenerator10$(_context14) {
			while (1) {
				switch (_context14.prev = _context14.next) {
					case 0:
						_context14.prev = 0;
						_context14.next = 3;
						return console.log('a');

					case 3:
						_context14.next = 8;
						break;

					case 5:
						_context14.prev = 5;
						_context14.t0 = _context14['catch'](0);

						console.log('内部捕获');

					case 8:
						_context14.next = 10;
						return console.log('b');

					case 10:
						_context14.next = 12;
						return console.log('c');

					case 12:
					case 'end':
						return _context14.stop();
				}
			}
		}, testGenerator10, this, [[0, 5]]);
	});
	var gen10 = testGenerator10();

	gen10.next(); // a
	gen10.throw(); // b
	gen10.next(); // c

	// 这种函数体内捕获错误的机制，大大方便了对错误的处理。
	// 多个yield表达式，可以只用一个try...catch代码块来捕获错误。
	// 如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在 Generator 函数内部写一次catch语句就可以了。


	// Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。
	function testGenerator11() {
		var x, y;
		return regeneratorRuntime.wrap(function testGenerator11$(_context15) {
			while (1) {
				switch (_context15.prev = _context15.next) {
					case 0:
						_context15.next = 2;
						return 3;

					case 2:
						x = _context15.sent;
						y = x.toLowerCase();
						_context15.next = 6;
						return y;

					case 6:
					case 'end':
						return _context15.stop();
				}
			}
		}, _marked11, this);
	}

	var gen11 = testGenerator11();
	console.log(gen11.next());
	try {
		console.log(gen11.next());
	} catch (err) {
		console.log(err);
	}

	// 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。
	// 如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。
	function testGenerator12() {
		return regeneratorRuntime.wrap(function testGenerator12$(_context16) {
			while (1) {
				switch (_context16.prev = _context16.next) {
					case 0:
						_context16.next = 2;
						return 1;

					case 2:
						console.log('thorw a error');
						throw new Error('generator borke!');

					case 6:
						_context16.next = 8;
						return 3;

					case 8:
					case 'end':
						return _context16.stop();
				}
			}
		}, _marked12, this);
	}
	var gen12 = testGenerator12();
	try {
		console.log('第一次执行', gen12.next());
	} catch (e) {
		console.log('第一次执行', e);
	}
	try {
		console.log('第二次执行', gen12.next());
	} catch (e) {
		console.log('第二次执行', e);
	}
	try {
		console.log('第三次执行', gen12.next());
	} catch (e) {
		console.log('第三次执行', e);
	}

	// Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
	function testGenerator13() {
		return regeneratorRuntime.wrap(function testGenerator13$(_context17) {
			while (1) {
				switch (_context17.prev = _context17.next) {
					case 0:
						_context17.next = 2;
						return 1;

					case 2:
						_context17.next = 4;
						return 2;

					case 4:
						_context17.next = 6;
						return 3;

					case 6:
					case 'end':
						return _context17.stop();
				}
			}
		}, _marked13, this);
	}
	var gen13 = testGenerator13();
	console.log(gen13.next()); // {value: 1, done: false}
	console.log(gen13.return('foo')); //  {value: "foo", done: true}
	console.log(gen13.next()); // {value: undefined, done: true}

	var gen13_2 = testGenerator13();
	console.log(gen13_2.next()); // {value: 1, done: false}
	console.log(gen13_2.return()); //  {value: undefined, done: true}
	console.log(gen13_2.next()); // {value: undefined, done: true}


	// 如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。
	function testGenerator14() {
		return regeneratorRuntime.wrap(function testGenerator14$(_context18) {
			while (1) {
				switch (_context18.prev = _context18.next) {
					case 0:
						_context18.next = 2;
						return 1;

					case 2:
						_context18.prev = 2;
						_context18.next = 5;
						return 2;

					case 5:
						_context18.next = 7;
						return 3;

					case 7:
						_context18.prev = 7;
						_context18.next = 10;
						return 4;

					case 10:
						_context18.next = 12;
						return 5;

					case 12:
						return _context18.finish(7);

					case 13:
						_context18.next = 15;
						return 6;

					case 15:
					case 'end':
						return _context18.stop();
				}
			}
		}, _marked14, this, [[2,, 7, 13]]);
	}
	var gen14 = testGenerator14();
	console.log(gen14.next()); // {value: 1, done: false}
	console.log(gen14.next()); // {value: 2, done: false}
	console.log(gen14.return(7)); // {value: 4, done: false}


	// 如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。
	// 这个就需要用到yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。

	function genTest1() {
		return regeneratorRuntime.wrap(function genTest1$(_context19) {
			while (1) {
				switch (_context19.prev = _context19.next) {
					case 0:
						_context19.next = 2;
						return 'a';

					case 2:
						_context19.next = 4;
						return 'b';

					case 4:
						_context19.next = 6;
						return 'c';

					case 6:
					case 'end':
						return _context19.stop();
				}
			}
		}, _marked15, this);
	}

	function genTest2() {
		return regeneratorRuntime.wrap(function genTest2$(_context20) {
			while (1) {
				switch (_context20.prev = _context20.next) {
					case 0:
						_context20.next = 2;
						return 'x';

					case 2:
						return _context20.delegateYield(genTest1(), 't0', 3);

					case 3:
						_context20.next = 5;
						return 'y';

					case 5:
					case 'end':
						return _context20.stop();
				}
			}
		}, _marked16, this);
	}

	// 等同于
	function genTest2_2() {
		return regeneratorRuntime.wrap(function genTest2_2$(_context21) {
			while (1) {
				switch (_context21.prev = _context21.next) {
					case 0:
						_context21.next = 2;
						return 'x';

					case 2:
						_context21.next = 4;
						return 'a';

					case 4:
						_context21.next = 6;
						return 'b';

					case 6:
						_context21.next = 8;
						return 'c';

					case 8:
						_context21.next = 10;
						return 'y';

					case 10:
					case 'end':
						return _context21.stop();
				}
			}
		}, _marked17, this);
	}
	function genTest2_3() {
		var _iteratorNormalCompletion21, _didIteratorError21, _iteratorError21, _iterator21, _step21, _value4;

		return regeneratorRuntime.wrap(function genTest2_3$(_context22) {
			while (1) {
				switch (_context22.prev = _context22.next) {
					case 0:
						_context22.next = 2;
						return 'x';

					case 2:
						_iteratorNormalCompletion21 = true;
						_didIteratorError21 = false;
						_iteratorError21 = undefined;
						_context22.prev = 5;
						_iterator21 = genTest1()[Symbol.iterator]();

					case 7:
						if (_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done) {
							_context22.next = 14;
							break;
						}

						_value4 = _step21.value;
						_context22.next = 11;
						return _value4;

					case 11:
						_iteratorNormalCompletion21 = true;
						_context22.next = 7;
						break;

					case 14:
						_context22.next = 20;
						break;

					case 16:
						_context22.prev = 16;
						_context22.t0 = _context22['catch'](5);
						_didIteratorError21 = true;
						_iteratorError21 = _context22.t0;

					case 20:
						_context22.prev = 20;
						_context22.prev = 21;

						if (!_iteratorNormalCompletion21 && _iterator21.return) {
							_iterator21.return();
						}

					case 23:
						_context22.prev = 23;

						if (!_didIteratorError21) {
							_context22.next = 26;
							break;
						}

						throw _iteratorError21;

					case 26:
						return _context22.finish(23);

					case 27:
						return _context22.finish(20);

					case 28:
						_context22.next = 30;
						return 'y';

					case 30:
					case 'end':
						return _context22.stop();
				}
			}
		}, _marked18, this, [[5, 16, 20, 28], [21,, 23, 27]]);
	}

	// 执行
	var _iteratorNormalCompletion22 = true;
	var _didIteratorError22 = false;
	var _iteratorError22 = undefined;

	try {
		for (var _iterator22 = genTest2()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
			var _value5 = _step22.value;

			console.log(_value5);
		}
	} catch (err) {
		_didIteratorError22 = true;
		_iteratorError22 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion22 && _iterator22.return) {
				_iterator22.return();
			}
		} finally {
			if (_didIteratorError22) {
				throw _iteratorError22;
			}
		}
	}

	var _iteratorNormalCompletion23 = true;
	var _didIteratorError23 = false;
	var _iteratorError23 = undefined;

	try {
		for (var _iterator23 = genTest2_2()[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
			var _value6 = _step23.value;

			console.log(_value6);
		}
	} catch (err) {
		_didIteratorError23 = true;
		_iteratorError23 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion23 && _iterator23.return) {
				_iterator23.return();
			}
		} finally {
			if (_didIteratorError23) {
				throw _iteratorError23;
			}
		}
	}

	var _iteratorNormalCompletion24 = true;
	var _didIteratorError24 = false;
	var _iteratorError24 = undefined;

	try {
		for (var _iterator24 = genTest2_3()[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
			var _value7 = _step24.value;

			console.log(_value7);
		}

		// 从语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。
	} catch (err) {
		_didIteratorError24 = true;
		_iteratorError24 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion24 && _iterator24.return) {
				_iterator24.return();
			}
		} finally {
			if (_didIteratorError24) {
				throw _iteratorError24;
			}
		}
	}

	function genTest3() {
		return regeneratorRuntime.wrap(function genTest3$(_context23) {
			while (1) {
				switch (_context23.prev = _context23.next) {
					case 0:
						_context23.next = 2;
						return 'hello!';

					case 2:
					case 'end':
						return _context23.stop();
				}
			}
		}, _marked19, this);
	}
	function genTest3_2() {
		return regeneratorRuntime.wrap(function genTest3_2$(_context24) {
			while (1) {
				switch (_context24.prev = _context24.next) {
					case 0:
						_context24.next = 2;
						return 'open';

					case 2:
						_context24.next = 4;
						return genTest3();

					case 4:
						_context24.next = 6;
						return 'close';

					case 6:
					case 'end':
						return _context24.stop();
				}
			}
		}, _marked20, this);
	}
	var _iteratorNormalCompletion25 = true;
	var _didIteratorError25 = false;
	var _iteratorError25 = undefined;

	try {
		for (var _iterator25 = genTest3_2()[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
			var _value8 = _step25.value;

			console.log(_value8);
		}

		// 实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。
	} catch (err) {
		_didIteratorError25 = true;
		_iteratorError25 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion25 && _iterator25.return) {
				_iterator25.return();
			}
		} finally {
			if (_didIteratorError25) {
				throw _iteratorError25;
			}
		}
	}

	function genTest4() {
		return regeneratorRuntime.wrap(function genTest4$(_context25) {
			while (1) {
				switch (_context25.prev = _context25.next) {
					case 0:
						_context25.next = 2;
						return 'start';

					case 2:
						return _context25.delegateYield(['a1', 'b2', 'c3'], 't0', 3);

					case 3:
						return _context25.delegateYield('abc', 't1', 4);

					case 4:
					case 'end':
						return _context25.stop();
				}
			}
		}, _marked21, this);
	}
	var _iteratorNormalCompletion26 = true;
	var _didIteratorError26 = false;
	var _iteratorError26 = undefined;

	try {
		for (var _iterator26 = genTest4()[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
			var _value9 = _step26.value;

			console.log(_value9);
		}

		// 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
	} catch (err) {
		_didIteratorError26 = true;
		_iteratorError26 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion26 && _iterator26.return) {
				_iterator26.return();
			}
		} finally {
			if (_didIteratorError26) {
				throw _iteratorError26;
			}
		}
	}

	function genTest5() {
		return regeneratorRuntime.wrap(function genTest5$(_context26) {
			while (1) {
				switch (_context26.prev = _context26.next) {
					case 0:
						_context26.next = 2;
						return 1;

					case 2:
						_context26.next = 4;
						return 2;

					case 4:
						return _context26.abrupt('return', 'return msg');

					case 5:
					case 'end':
						return _context26.stop();
				}
			}
		}, _marked22, this);
	}
	function genTest5_2() {
		var value;
		return regeneratorRuntime.wrap(function genTest5_2$(_context27) {
			while (1) {
				switch (_context27.prev = _context27.next) {
					case 0:
						_context27.next = 2;
						return 'start';

					case 2:
						return _context27.delegateYield(genTest5(), 't0', 3);

					case 3:
						value = _context27.t0;

						console.log(value);
						_context27.next = 7;
						return 'end';

					case 7:
					case 'end':
						return _context27.stop();
				}
			}
		}, _marked23, this);
	}
	var _iteratorNormalCompletion27 = true;
	var _didIteratorError27 = false;
	var _iteratorError27 = undefined;

	try {
		for (var _iterator27 = genTest5_2()[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
			var _value10 = _step27.value;

			console.log(_value10);
		}

		// 下面的代码中，存在两次遍历。
		// 第一次是扩展运算符遍历函数logReturned返回的遍历器对象，
		// 第二次是yield*语句遍历函数genFuncWithReturn返回的遍历器对象。
		// 这两次遍历的效果是叠加的，最终表现为扩展运算符遍历函数genFuncWithReturn返回的遍历器对象。
		// 所以，最后的数据表达式得到的值等于[ 'a', 'b' ]。
		// 但是，函数genFuncWithReturn的return语句的返回值The result，
		// 会返回给函数logReturned内部的result变量，因此会有终端输出。
	} catch (err) {
		_didIteratorError27 = true;
		_iteratorError27 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion27 && _iterator27.return) {
				_iterator27.return();
			}
		} finally {
			if (_didIteratorError27) {
				throw _iteratorError27;
			}
		}
	}

	function genTest6() {
		return regeneratorRuntime.wrap(function genTest6$(_context28) {
			while (1) {
				switch (_context28.prev = _context28.next) {
					case 0:
						_context28.next = 2;
						return 'a';

					case 2:
						_context28.next = 4;
						return 'b';

					case 4:
						return _context28.abrupt('return', 'the result');

					case 5:
					case 'end':
						return _context28.stop();
				}
			}
		}, _marked24, this);
	}
	function logReturned(genObj) {
		var result;
		return regeneratorRuntime.wrap(function logReturned$(_context29) {
			while (1) {
				switch (_context29.prev = _context29.next) {
					case 0:
						return _context29.delegateYield(genObj, 't0', 1);

					case 1:
						result = _context29.t0;

						console.log(result);

					case 3:
					case 'end':
						return _context29.stop();
				}
			}
		}, _marked25, this);
	};
	console.log(genTest6());
	console.log([].concat(_toConsumableArray(logReturned(genTest6()))));

	// yield*命令可以很方便地取出嵌套数组的所有成员。
	function iterTree(tree) {
		var i, len;
		return regeneratorRuntime.wrap(function iterTree$(_context30) {
			while (1) {
				switch (_context30.prev = _context30.next) {
					case 0:
						if (!Array.isArray(tree)) {
							_context30.next = 9;
							break;
						}

						i = 0, len = tree.length;

					case 2:
						if (!(i < len)) {
							_context30.next = 7;
							break;
						}

						return _context30.delegateYield(iterTree(tree[i]), 't0', 4);

					case 4:
						i++;
						_context30.next = 2;
						break;

					case 7:
						_context30.next = 11;
						break;

					case 9:
						_context30.next = 11;
						return tree;

					case 11:
					case 'end':
						return _context30.stop();
				}
			}
		}, _marked26, this);
	}

	var tree = ['a', ['b', 'c'], ['d', ['e', 'f', 'g']]];

	var _iteratorNormalCompletion28 = true;
	var _didIteratorError28 = false;
	var _iteratorError28 = undefined;

	try {
		for (var _iterator28 = iterTree(tree)[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
			var _value11 = _step28.value;

			console.log(_value11);
		}

		// 如果一个对象的属性是 Generator 函数，可以简写成下面的形式。
	} catch (err) {
		_didIteratorError28 = true;
		_iteratorError28 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion28 && _iterator28.return) {
				_iterator28.return();
			}
		} finally {
			if (_didIteratorError28) {
				throw _iteratorError28;
			}
		}
	}

	var obj = {
		genTest: /*#__PURE__*/regeneratorRuntime.mark(function genTest() {
			return regeneratorRuntime.wrap(function genTest$(_context31) {
				while (1) {
					switch (_context31.prev = _context31.next) {
						case 0:
						case 'end':
							return _context31.stop();
					}
				}
			}, genTest, this);
		})
	};
	console.log(obj);

	// 等同于
	var obj2 = {
		genTest: /*#__PURE__*/regeneratorRuntime.mark(function genTest() {
			return regeneratorRuntime.wrap(function genTest$(_context32) {
				while (1) {
					switch (_context32.prev = _context32.next) {
						case 0:
						case 'end':
							return _context32.stop();
					}
				}
			}, genTest, this);
		})
	};
	console.log(obj2);

	// Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。
	function genTest7() {
		return regeneratorRuntime.wrap(function genTest7$(_context33) {
			while (1) {
				switch (_context33.prev = _context33.next) {
					case 0:
					case 'end':
						return _context33.stop();
				}
			}
		}, _marked27, this);
	}
	genTest7.prototype.hello = function () {
		return 'hi!';
	};

	var obj7 = genTest7();
	console.log(obj7);
	console.log(obj7.hello());

	// 同步控制流管理
	// ==================================================================
	// ==================================================================

	// 流程一：获取数据
	function getData(callback) {

		console.log('get data!');

		// 获取数据
		var data = { a: 1, b: 2, c: 3 };

		// 返回数据
		if (typeof callback === 'function') {
			callback(data);
		} else {
			return data;
		}
	}

	// 流程二：展示数据
	function showData() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var callback = arguments[1];


		console.log('show data!');

		var _iteratorNormalCompletion29 = true;
		var _didIteratorError29 = false;
		var _iteratorError29 = undefined;

		try {
			for (var _iterator29 = Object.entries(data)[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
				var _ref17 = _step29.value;

				var _ref18 = _slicedToArray(_ref17, 2);

				var _key7 = _ref18[0];
				var _value12 = _ref18[1];

				console.log(_key7 + ' : ' + _value12);
			}

			// 返回数据
		} catch (err) {
			_didIteratorError29 = true;
			_iteratorError29 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion29 && _iterator29.return) {
					_iterator29.return();
				}
			} finally {
				if (_didIteratorError29) {
					throw _iteratorError29;
				}
			}
		}

		if (typeof callback === 'function') {
			callback(data);
		} else {
			return data;
		}
	}

	// 流程三：修改数据
	function editData() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var callback = arguments[1];


		console.log('edit data!');

		data['append'] = 'a new value';

		// 返回数据
		if (typeof callback === 'function') {
			callback(data);
		} else {
			return data;
		}
	}

	// 流程四：保存数据
	function saveData() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


		console.log('save data!');
		console.log(data);
	}

	// 传统方式
	console.log('传统层级嵌套的回调方式');
	try {
		getData(function (data) {
			showData(data, function () {
				editData(data, function () {
					saveData(data);
				});
			});
		});
	} catch (err) {
		console.log('error!');
	} finally {
		console.log('success!');
	}

	// 使用Generator函数进行一步封装
	console.log('使用Generator处理');
	runTask(getData, showData, editData, saveData);

	function runTask() {
		var gen = toGenerator.apply(undefined, arguments);
		var result = {};
		while (!(result = gen.next(result.value)).done) {}
	}

	function toGenerator() {
		for (var _len3 = arguments.length, tasks = Array(_len3), _key8 = 0; _key8 < _len3; _key8++) {
			tasks[_key8] = arguments[_key8];
		}

		var returnData, i, len;
		return regeneratorRuntime.wrap(function toGenerator$(_context34) {
			while (1) {
				switch (_context34.prev = _context34.next) {
					case 0:
						returnData = void 0;
						i = 0, len = tasks.length;

					case 2:
						if (!(i < len)) {
							_context34.next = 9;
							break;
						}

						_context34.next = 5;
						return tasks[i](returnData);

					case 5:
						returnData = _context34.sent;

					case 6:
						i++;
						_context34.next = 2;
						break;

					case 9:
					case 'end':
						return _context34.stop();
				}
			}
		}, _marked28, this);
	}

	// 使用Promise处理
	console.log('使用Promise处理');

	Promise.resolve().then(getData).then(showData).then(editData).then(saveData).then(function (result) {
		console.log('success!');
	}).catch(function (err) {
		console.log('error！');
	});
}();

// Generator 函数的异步应用
// “协程”是一种异步编程的解决方案。它使得多个线程可以相互协作，完成异步任务。
// 简单的说，就是协程A执行到一半，进入暂停状态，将执行权转移给协程B；协程B执行一段时间后又将执行权交还给协程A，然后协程A继续执行后续代码
false && function () {
	var _marked29 = /*#__PURE__*/regeneratorRuntime.mark(genTest1),
	    _marked30 = /*#__PURE__*/regeneratorRuntime.mark(genTest2),
	    _marked31 = /*#__PURE__*/regeneratorRuntime.mark(genTest3);

	// 协程的 Generator 函数实现
	// Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
	// 整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。Generator 函数的执行方法如下。|

	function genTest1(x) {
		var y;
		return regeneratorRuntime.wrap(function genTest1$(_context35) {
			while (1) {
				switch (_context35.prev = _context35.next) {
					case 0:
						_context35.next = 2;
						return x + 2;

					case 2:
						y = _context35.sent;
						return _context35.abrupt('return', y);

					case 4:
					case 'end':
						return _context35.stop();
				}
			}
		}, _marked29, this);
	}
	var gen1 = genTest1(1);
	console.log(gen1.next()); // {value: 3, done: false}
	console.log(gen1.next()); // {value: undefined, done: true}

	// Generator 函数的数据交换和错误处理
	// Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。
	// next返回值的 value 属性，是 Generator 函数向外输出数据；next方法还可以接受参数，向 Generator 函数体内输入数据。

	var gen1_2 = genTest1(1);
	console.log(gen1_2.next()); // {value: 3, done: false}
	console.log(gen1_2.next(2)); // {value: 2, done: false}

	// Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。
	function genTest2(x) {
		var y;
		return regeneratorRuntime.wrap(function genTest2$(_context36) {
			while (1) {
				switch (_context36.prev = _context36.next) {
					case 0:
						y = void 0;
						_context36.prev = 1;
						_context36.next = 4;
						return x + 2;

					case 4:
						y = _context36.sent;
						_context36.next = 10;
						break;

					case 7:
						_context36.prev = 7;
						_context36.t0 = _context36['catch'](1);

						console.log('内部捕获', _context36.t0);

					case 10:
						return _context36.abrupt('return', y);

					case 11:
					case 'end':
						return _context36.stop();
				}
			}
		}, _marked30, this, [[1, 7]]);
	}

	var gen2 = genTest2(1);
	console.log(gen2.next()); // {value: 3, done: false}
	gen2.throw('外部指定错误');

	// Thunk 函数的含义
	// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
	// JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。
	// 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。
	// 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。

	var Thunk = function Thunk(fn) {
		return function () {
			for (var _len4 = arguments.length, args = Array(_len4), _key9 = 0; _key9 < _len4; _key9++) {
				args[_key9] = arguments[_key9];
			}

			return function (callback) {
				return fn.call.apply(fn, [this].concat(args, [callback]));
			};
		};
	};

	function testThunk(a, cb) {
		console.log('执行回调');
		cb(a);
	}

	var fnThunk = Thunk(testThunk);

	fnThunk('test a message')(function () {
		for (var _len5 = arguments.length, args = Array(_len5), _key10 = 0; _key10 < _len5; _key10++) {
			args[_key10] = arguments[_key10];
		}

		console.log('回调函数:' + args);
	});

	// Generator 函数的流程管理
	// 你可能会问， Thunk 函数有什么用？回答是以前确实没什么用，但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。
	// Generator 函数可以自动执行。

	function thunkify(fn) {

		// 返回参数调用层面的执行函数
		return function () {
			for (var _len6 = arguments.length, args = Array(_len6), _key11 = 0; _key11 < _len6; _key11++) {
				args[_key11] = arguments[_key11];
			}

			// 保存执行函数所在的上下文
			var ctx = this;

			// 返回回调函数的执行函数
			return function (callback) {
				var called;

				// 回调函数再封装一层，确保回调函数仅执行一次
				args.push(function () {
					for (var _len7 = arguments.length, args = Array(_len7), _key12 = 0; _key12 < _len7; _key12++) {
						args[_key12] = arguments[_key12];
					}

					if (called) return;
					called = true;
					callback.apply(null, [].concat(args));
				});

				try {
					// 触发函数调用
					fn.apply(ctx, args);
				} catch (err) {
					callback(err);
				}
			};
		};
	}

	function testFun2(a, b, callback) {
		var sum = a + b;
		callback(sum);
		callback(sum);
	}
	var fnThunk2 = thunkify(testFun2);

	fnThunk2(1, 2)(function (value) {
		console.log('callback:', value);
	});

	// Thunk 函数的自动流程管理
	// Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器。

	function runGen(fn) {
		var gen = fn();

		// 将next下一步指针作为回调函数传给Thunk函数
		function next(err, data) {
			var result = gen.next(data);
			console.log(result);
			if (result.done) return;
			result.value(next);
		}

		next();
	}

	function testFun3(a, b, callback) {
		var sum = a + b;
		callback(null, sum);
	}

	function genTest3() {
		return regeneratorRuntime.wrap(function genTest3$(_context37) {
			while (1) {
				switch (_context37.prev = _context37.next) {
					case 0:
						_context37.next = 2;
						return thunkify(testFun3)('a', 'b');

					case 2:
						_context37.next = 4;
						return thunkify(testFun3)('1', '2');

					case 4:
						_context37.next = 6;
						return thunkify(testFun3)('x', 'y');

					case 6:
					case 'end':
						return _context37.stop();
				}
			}
		}, _marked31, this);
	}
	// runGen(genTest3);


	// Thunk 函数并不是 Generator 函数自动执行的唯一方案。
	// 因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。
	// 回调函数可以做到这一点，Promise 对象也可以做到这一点。

	co( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var a, b, c;
		return regeneratorRuntime.wrap(function _callee$(_context38) {
			while (1) {
				switch (_context38.prev = _context38.next) {
					case 0:
						_context38.next = 2;
						return thunkify(testFun3)('a', 'b');

					case 2:
						a = _context38.sent;

						console.log('step a:', a);

						_context38.next = 6;
						return thunkify(testFun3)('1', '2');

					case 6:
						b = _context38.sent;

						console.log('step b:', b);

						_context38.next = 10;
						return thunkify(testFun3)('x', 'y');

					case 10:
						c = _context38.sent;

						console.log('step c:', c);

					case 12:
					case 'end':
						return _context38.stop();
				}
			}
		}, _callee, this);
	})).then(function (result) {
		console.log('执行完毕！', result);
	});

	// co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。
	// 使用 co 的前提条件是，Generator 函数的yield命令后面，只能是 Thunk 函数或 Promise 对象。
	// 如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co，详见后文的例子。

	function co(gen) {
		var ctx = this;
		var args = Array.prototype.slice.call(arguments, 1);

		return new Promise(function (resolve, reject) {

			// 自动执行Generator函数
			if (typeof gen === 'function') {
				gen = gen.apply(ctx, args);
			}

			// 如果gen不是Generator函数，那么直接将Promise对象的状态改为 resolved
			if (!gen || typeof gen.next !== 'function') {
				return resolve(gen);
			}

			onFulfilled();

			function onFulfilled(res) {
				var ret = void 0;
				try {
					ret = gen.next(res);
				} catch (e) {
					return reject(e);
				}
				next(ret);
			}

			function onRejected(err) {
				var ret = void 0;
				try {
					ret = gen.throw(err);
				} catch (e) {
					return reject(e);
				}
				next(ret);
			}

			// next函数，它会反复调用自身。
			function next(ret) {
				if (ret.done) return resolve(ret.value);
				var value = toPromise.call(ctx, ret.value);
				if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
				return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, ' + 'but the following object was passed: "' + String(ret.value) + '"'));
			}

			// 转换为Promise对象
			function toPromise(obj) {
				if (!obj) return obj;
				if (isPromise(obj)) return obj;
				if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
				if (typeof obj === 'function') return thunkToPromise.call(this, obj);
				return obj;
			}

			// 将thunk函数转换为Promise对象
			function thunkToPromise(fn) {
				var ctx = this;
				return new Promise(function (resolve, reject) {
					fn.call(ctx, function (err, res) {
						if (err) return reject(err);
						if (arguments.length > 2) res = Array.prototype.slice.call(arguments, 1);
						resolve(res);
					});
				});
			}

			// 根据then方法判断是否为Promise对象
			function isPromise(obj) {
				return 'function' === typeof obj.then;
			}

			// 根据next和throw方法判断是否为Generator对象
			function isGenerator(obj) {
				return typeof obj.next === 'function' && typeof obj.throw === 'function';
			}

			// 判断是否为Generator函数
			function isGeneratorFunction(obj) {
				var constructor = obj.constructor;
				if (!constructor) return false;
				if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') return true;
				return isGenerator(constructor.prototype);
			}
		});
	}
}();

// ES2017 async函数
// Chrome 55+, Firefox 52+, Opera 42+, Safari 10.1+
// 
// ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
// async 函数是什么？一句话，它就是 Generator 函数的语法糖。
// 
// async函数对 Generator 函数的改进，体现在以下四点。
// （1）内置执行器。
// Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
// （2）更好的语义。
// async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
// （3）更广的适用性。
// co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
// （4）返回值是 Promise。
// async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。


false && function () {
	var asyncPrint = function () {
		var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value, ms) {
			return regeneratorRuntime.wrap(function _callee2$(_context39) {
				while (1) {
					switch (_context39.prev = _context39.next) {
						case 0:
							_context39.next = 2;
							return timeout(ms);

						case 2:
							console.log(value);

						case 3:
						case 'end':
							return _context39.stop();
					}
				}
			}, _callee2, this);
		}));

		return function asyncPrint(_x12, _x13) {
			return _ref19.apply(this, arguments);
		};
	}();

	// async和await的基本使用
	// async函数返回的是Promise对象
	var timeout2 = function () {
		var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ms) {
			return regeneratorRuntime.wrap(function _callee3$(_context40) {
				while (1) {
					switch (_context40.prev = _context40.next) {
						case 0:
							_context40.next = 2;
							return new Promise(function (resolve) {
								setTimeout(resolve, ms);
							});

						case 2:
						case 'end':
							return _context40.stop();
					}
				}
			}, _callee3, this);
		}));

		return function timeout2(_x14) {
			return _ref20.apply(this, arguments);
		};
	}();

	var asyncPrint = function () {
		var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(value, ms) {
			return regeneratorRuntime.wrap(function _callee4$(_context41) {
				while (1) {
					switch (_context41.prev = _context41.next) {
						case 0:
							_context41.next = 2;
							return timeout(ms);

						case 2:
							console.log(value);

						case 3:
						case 'end':
							return _context41.stop();
					}
				}
			}, _callee4, this);
		}));

		return function asyncPrint(_x15, _x16) {
			return _ref21.apply(this, arguments);
		};
	}();

	// async 函数有多种使用形式。
	// ==========================================

	// 函数声明
	var foo1 = function () {
		var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
			return regeneratorRuntime.wrap(function _callee5$(_context42) {
				while (1) {
					switch (_context42.prev = _context42.next) {
						case 0:
						case 'end':
							return _context42.stop();
					}
				}
			}, _callee5, this);
		}));

		return function foo1() {
			return _ref22.apply(this, arguments);
		};
	}();

	// 函数表达式


	// async函数的语法规则
	// ==========================================

	// async函数返回一个 Promise 对象。
	// async函数内部return语句返回的值，会成为then方法回调函数的参数。

	var asTest1 = function () {
		var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
			return regeneratorRuntime.wrap(function _callee10$(_context47) {
				while (1) {
					switch (_context47.prev = _context47.next) {
						case 0:
							return _context47.abrupt('return', 'test a message');

						case 1:
						case 'end':
							return _context47.stop();
					}
				}
			}, _callee10, this);
		}));

		return function asTest1() {
			return _ref27.apply(this, arguments);
		};
	}();

	// async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。
	// 抛出的错误对象会被catch方法回调函数接收到。

	var asTest2 = function () {
		var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
			return regeneratorRuntime.wrap(function _callee11$(_context48) {
				while (1) {
					switch (_context48.prev = _context48.next) {
						case 0:
							throw new Error('出错了');

						case 1:
						case 'end':
							return _context48.stop();
					}
				}
			}, _callee11, this);
		}));

		return function asTest2() {
			return _ref28.apply(this, arguments);
		};
	}();

	var asTest3 = function () {
		var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
			var a, b, c;
			return regeneratorRuntime.wrap(function _callee12$(_context49) {
				while (1) {
					switch (_context49.prev = _context49.next) {
						case 0:
							_context49.next = 2;
							return timeout3(1000);

						case 2:
							a = _context49.sent;

							console.log('setp 1', a);
							_context49.next = 6;
							return timeout3(1000);

						case 6:
							b = _context49.sent;

							console.log('setp 2', b);
							_context49.next = 10;
							return timeout3(1000);

						case 10:
							c = _context49.sent;

							console.log('setp 3', c);
							return _context49.abrupt('return', 'async return');

						case 13:
						case 'end':
							return _context49.stop();
					}
				}
			}, _callee12, this);
		}));

		return function asTest3() {
			return _ref29.apply(this, arguments);
		};
	}();

	// await命令
	// 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。

	var asTest4 = function () {
		var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
			return regeneratorRuntime.wrap(function _callee13$(_context50) {
				while (1) {
					switch (_context50.prev = _context50.next) {
						case 0:
							_context50.next = 2;
							return 123;

						case 2:
							return _context50.abrupt('return', _context50.sent);

						case 3:
						case 'end':
							return _context50.stop();
					}
				}
			}, _callee13, this);
		}));

		return function asTest4() {
			return _ref30.apply(this, arguments);
		};
	}();

	// await命令
	// await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
	// 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。

	var asTest5 = function () {
		var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
			return regeneratorRuntime.wrap(function _callee14$(_context51) {
				while (1) {
					switch (_context51.prev = _context51.next) {
						case 0:
							_context51.next = 2;
							return Promise.reject('出错了');

						case 2:
						case 'end':
							return _context51.stop();
					}
				}
			}, _callee14, this);
		}));

		return function asTest5() {
			return _ref31.apply(this, arguments);
		};
	}();

	// 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
	// 这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
	// 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
	var asTest6 = function () {
		var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
			return regeneratorRuntime.wrap(function _callee15$(_context52) {
				while (1) {
					switch (_context52.prev = _context52.next) {
						case 0:
							_context52.prev = 0;
							_context52.next = 3;
							return Promise.reject('出错了');

						case 3:
							_context52.next = 8;
							break;

						case 5:
							_context52.prev = 5;
							_context52.t0 = _context52['catch'](0);

							console.log('asTest6-err', _context52.t0);

						case 8:
							_context52.next = 10;
							return Promise.resolve('666');

						case 10:
							return _context52.abrupt('return', _context52.sent);

						case 11:
						case 'end':
							return _context52.stop();
					}
				}
			}, _callee15, this, [[0, 5]]);
		}));

		return function asTest6() {
			return _ref32.apply(this, arguments);
		};
	}();

	var asTest7 = function () {
		var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
			return regeneratorRuntime.wrap(function _callee16$(_context53) {
				while (1) {
					switch (_context53.prev = _context53.next) {
						case 0:
							_context53.next = 2;
							return Promise.reject('出错了').catch(function (e) {
								return console.log('asTest7-err', e);
							});

						case 2:
							_context53.next = 4;
							return Promise.resolve('777');

						case 4:
							return _context53.abrupt('return', _context53.sent);

						case 5:
						case 'end':
							return _context53.stop();
					}
				}
			}, _callee16, this);
		}));

		return function asTest7() {
			return _ref33.apply(this, arguments);
		};
	}();

	// 错误处理
	// 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
	// 防止出错的方法，也是将其放在try...catch代码块之中。
	// 如果有多个await命令，可以统一放在try...catch结构中。

	var asTest8 = function () {
		var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
			return regeneratorRuntime.wrap(function _callee17$(_context54) {
				while (1) {
					switch (_context54.prev = _context54.next) {
						case 0:
							_context54.next = 2;
							return new Promise(function (resolve, reject) {
								throw new Error('asTest8-error');
							});

						case 2:
						case 'end':
							return _context54.stop();
					}
				}
			}, _callee17, this);
		}));

		return function asTest8() {
			return _ref34.apply(this, arguments);
		};
	}();

	// async和await的基本使用
	// ==========================================
	function timeout(ms) {
		return new Promise(function (resolve) {
			setTimeout(resolve, ms);
		});
	}

	asyncPrint('hello', 300);
	asyncPrint('hello two', 300);
	console.log(timeout(100));var foo2 = function () {
		var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
			return regeneratorRuntime.wrap(function _callee6$(_context43) {
				while (1) {
					switch (_context43.prev = _context43.next) {
						case 0:
						case 'end':
							return _context43.stop();
					}
				}
			}, _callee6, this);
		}));

		return function foo2() {
			return _ref23.apply(this, arguments);
		};
	}();

	// 对象的方法
	var obj = {
		foo: function () {
			var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
				return regeneratorRuntime.wrap(function _callee7$(_context44) {
					while (1) {
						switch (_context44.prev = _context44.next) {
							case 0:
							case 'end':
								return _context44.stop();
						}
					}
				}, _callee7, this);
			}));

			function foo() {
				return _ref24.apply(this, arguments);
			}

			return foo;
		}()
	};
	obj.foo().then();

	// class的方法

	var Storage = function () {
		function Storage() {
			_classCallCheck(this, Storage);

			this.cachePromise = caches.opens.open('avatars');
		}

		_createClass(Storage, [{
			key: 'getAvatar',
			value: function () {
				var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(name) {
					var cache;
					return regeneratorRuntime.wrap(function _callee8$(_context45) {
						while (1) {
							switch (_context45.prev = _context45.next) {
								case 0:
									_context45.next = 2;
									return this.cachePromise;

								case 2:
									cache = _context45.sent;
									return _context45.abrupt('return', cache.match('/avatars/' + name + '.jpg'));

								case 4:
								case 'end':
									return _context45.stop();
							}
						}
					}, _callee8, this);
				}));

				function getAvatar(_x17) {
					return _ref25.apply(this, arguments);
				}

				return getAvatar;
			}()
		}]);

		return Storage;
	}();

	// 箭头函数


	var foo3 = function () {
		var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
			return regeneratorRuntime.wrap(function _callee9$(_context46) {
				while (1) {
					switch (_context46.prev = _context46.next) {
						case 0:
						case 'end':
							return _context46.stop();
					}
				}
			}, _callee9, _this);
		}));

		return function foo3() {
			return _ref26.apply(this, arguments);
		};
	}();

	asTest1().then(function (ret) {
		console.log(ret);
	});

	asTest2().then(function (ret) {
		return console.log(ret);
	}, function (err) {
		return console.log(err.toString());
	});

	// Promise 对象的状态变化
	// ==========================================
	// async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。
	// 也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

	function timeout3(ms) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve('return data');
			}, ms);
		});
	}

	asTest3().then(function (ret) {
		console.log('async then:', ret);
	});

	asTest4().then(function (ret) {
		console.log('asTest4:', ret);
	});

	asTest5().then(function (ret) {
		return console.log('asTest5', ret);
	}).catch(function (err) {
		return console.log('asTest5', err);
	});
	asTest6().then(function (ret) {
		return console.log('asTest6', ret);
	}).catch(function (err) {
		return console.log('asTest6', err);
	});

	asTest7().then(function (ret) {
		return console.log('asTest7', ret);
	}).catch(function (err) {
		return console.log('asTest7', err);
	});

	asTest8().then(function (ret) {
		return console.log('asTest8', ret);
	}).catch(function (err) {
		return console.log('asTest8', err);
	});

	// 使用注意点
	// ==========================================
	// 
	// 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
	// 
	// 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
	// 
	// 写法一
	// let [foo, bar] = await Promise.all([getFoo(), getBar()]);
	// 
	// 写法二
	// let fooPromise = getFoo();
	// let barPromise = getBar();
	// let foo = await fooPromise;
	// let bar = await barPromise;
	// 
	// 第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。
}();

// ============================================================================
// ============================================================================
// 类的声明
// 
// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
// Object.assign方法可以很方便地一次向类添加多个方法。
// prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的。
// 
// 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。这一点与 ES5 的行为不一致。

false && function () {

	// 类不存在变量提升（hoist），这一点与 ES5 完全不同。
	// new Hello();  // Uncaught ReferenceError: Hello is not defined

	// 声明类
	var Hello = function () {

		// 构造函数
		// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
		// 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
		// constructor方法默认返回实例对象（即this），也可以指定返回另外一个对象，这样通过new调用的返回对象就不再是类的实例，而是return返回的这个对象。
		function Hello() {
			_classCallCheck(this, Hello);

			// 实例属性
			this.name = undefined;

			// new.target返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
			// 子类继承父类时，new.target会返回子类。
			// new.target只能在函数内部使用，在函数外调用将报错
			console.log('new.target', new.target === Hello);
		}

		// 父类的实例方法


		_createClass(Hello, [{
			key: 'setName',
			value: function setName(aName) {
				this.name = aName;
			}

			// 父类的实例方法

		}, {
			key: 'getName',
			value: function getName() {
				return this.name;
			}

			// 父类的实例方法

		}, {
			key: 'sayHello',
			value: function sayHello() {
				console.log('Hello ' + this.name);
			}

			// static关键字 父类的静态方法
			// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
			// 如果一个方法前面加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就成为“静态方法”
			// 如果静态方法包含this关键字，这个this指的是类，而不是实例。
			// 父类的静态方法，可以被子类继承。
			// 静态方法也是可以从super对象上调用的。

		}], [{
			key: 'func',
			value: function func() {
				return 'This is a private method';
			}
		}]);

		return Hello;
	}();

	;

	// 父类的静态属性
	// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象
	// 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
	Hello.prop = 123;

	// 类的继承

	var Sub = function (_Hello) {
		_inherits(Sub, _Hello);

		// 在子类缺失constructor构造函数的情况下，会默认使用父类的构造函数进行初始化。
		// ES6要求，子类的构造函数必须执行一次super函数。
		// super作为函数在子类的构造函数中调用时，代表父类的构造函数。
		// 虽然执行的是父类的构造函数，但是返回的确实子类的实例，是因为super内部的this指向的是子类而不是父类
		function Sub() {
			var _ref35;

			_classCallCheck(this, Sub);

			for (var _len8 = arguments.length, args = Array(_len8), _key13 = 0; _key13 < _len8; _key13++) {
				args[_key13] = arguments[_key13];
			}

			var _this2 = _possibleConstructorReturn(this, (_ref35 = Sub.__proto__ || Object.getPrototypeOf(Sub)).call.apply(_ref35, [this].concat(args)));
			// this.a = 123;  // 在执行super()之前，子类的this是不存在的，所以会报错


			_this2.b = 321; // super()执行之后，子类的实例的this才会存在
			return _this2;
		}

		// 子类的实例方法


		_createClass(Sub, [{
			key: 'subAlert',
			value: function subAlert() {
				// super关键字作为对象使用时，表示父类的原型对象。
				// ES6 规定，通过super调用父类的方法时，方法内部的this指向子类。
				// 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
				console.log('subAlert:' + _get(Sub.prototype.__proto__ || Object.getPrototypeOf(Sub.prototype), 'getName', this).call(this));
			}

			// 子类的静态方法

		}], [{
			key: 'subFunc',
			value: function subFunc() {
				// 如果super关键字作为对象，用在静态方法中，这时super将指向父类，而不是父类的原型对象
				return _get(Sub.__proto__ || Object.getPrototypeOf(Sub), 'func', this).call(this);
			}
		}]);

		return Sub;
	}(Hello);

	// 类的实例化
	// 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。


	var objHello = new Hello();
	var objSub = new Sub();

	window.Hello = Hello;
	window.Sub = Sub;
	window.objHello = objHello;
	window.objSub = objSub;

	// 父类的实例方法的调用
	objHello.setName('username');
	objHello.sayHello(); // Hello username

	// 子类的实例方法的调用
	objSub.setName('a new name');
	objSub.sayHello(); // Hello a new name
	objSub.subAlert(); // subAlert:a new name

	// 类的静态方法的调用
	console.log('静态方法1: ', Hello.func());
	console.log('静态方法2: ', Sub.subFunc());

	// 类的所有实例方法都定义在类的prototype属性上面
	// prototype属性作为原型对象，可以被实例所继承
	console.log(Hello.prototype);
	console.log(objHello.prototype);

	// __proto__属性用来访问继承链的上一环（即实例对象的原型），该属性指向对应的构造函数的prototype属性。
	// 
	// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
	// （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
	// （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
	// 
	// 该属性并不是语言本身的特性，它是各大厂商具体实现时添加的私有属性，
	// 虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。
	// 生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
	console.log(Hello.__proto__);
	console.log(objHello.__proto__);

	// 获取父类
	var parent = Object.getPrototypeOf(Sub);
	parent.append1 = 'append1';
	console.log('获取父类1：', parent);
	console.log('获取父类2：', parent.prototype);
	console.log('获取父类3：', parent.append1);

	// 获取对象原型
	var proto = Object.getPrototypeOf(objHello);
	proto.append2 = 'append2';
	console.log('获取对象原型1：', proto);
	console.log('获取对象原型2：', proto.append2);
	console.log('获取对象原型3：', objHello.append2);

	// name属性
	// 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
	// name属性总是返回紧跟在class关键字后面的类名。
	console.log(Hello.name);

	// 私有方法和私有属性
	// 私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。

	// 一种做法是在命名上加以区别。

	var Widget = function () {
		function Widget() {
			_classCallCheck(this, Widget);
		}

		_createClass(Widget, [{
			key: 'foo',


			// 公有方法
			value: function foo(baz) {
				this._bar(baz);
			}

			// 私有方法

		}, {
			key: '_bar',
			value: function _bar(baz) {
				return this.snaf = baz;
			}

			// ...

		}]);

		return Widget;
	}();

	// 另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。


	var Widget2 = function () {
		function Widget2() {
			_classCallCheck(this, Widget2);
		}

		_createClass(Widget2, [{
			key: 'foo',
			value: function foo(baz) {
				widTest2.call(this, baz);
			}

			// ...

		}]);

		return Widget2;
	}();

	function widTest2(baz) {
		return this.snaf = baz;
	}

	// 还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
	var bar = Symbol('bar');
	var snaf = Symbol('snaf');

	var myClass = function () {
		function myClass() {
			_classCallCheck(this, myClass);
		}

		_createClass(myClass, [{
			key: 'foo',


			// 公有方法
			value: function foo(baz) {
				this[bar](baz);
			}

			// 私有方法

		}, {
			key: bar,
			value: function value(baz) {
				return this[snaf] = baz;
			}

			// ...

		}]);

		return myClass;
	}();

	// 与私有方法一样，ES6 不支持私有属性。目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。


	// Class 的取值函数（getter）和存值函数（setter）
	// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

	var MyClass = function () {
		function MyClass() {
			_classCallCheck(this, MyClass);
		}

		_createClass(MyClass, [{
			key: 'prop',
			get: function get() {
				return 'getter';
			},
			set: function set(value) {
				console.log('setter: ', value);
			}
		}]);

		return MyClass;
	}();

	var myObj = new MyClass();
	myObj.prop = 123;
	console.log(myObj.prop);
}();

// ============================================================================
// ============================================================================
// Promise对象
// Promise对象是异步编程的一种解决方案。
// Promise的目的就是为了解决回调函数的多层嵌套，改成链式调用。
// Promise的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚。
//
// Promise的状态一旦改变，就永久保持该状态，不会再变了。
// Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
// 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
// 这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
// 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
// Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
// 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
// 如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
// 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

false && function () {

	// 创建Promise对象的一个实例
	var promise = new Promise(function (resolve, reject) {
		if (true) {
			resolve();
		} else {
			reject();
		}
	});

	// 用then方法分别指定resolved状态和rejected状态的回调函数
	promise.then(function () {
		console.log('success');
	}, function () {
		console.log('fail');
	});

	// 延时执行
	function timeout(ms) {
		return new Promise(function (resolve, reject) {
			setTimeout(resolve, ms, 'done!');
		});
	}
	timeout(1000).then(function (value) {
		console.log(value);
	});

	// promise对象的执行时机问题
	// new Promise的回调函数会立即执行
	var pp2 = new Promise(function (resolve, reject) {
		console.log('do new Promise()');
		resolve();
	});

	// promise.then的回调函数会在当前脚本所有同步任务执行完才会执行
	pp2.then(function () {
		console.log('resoled.');
	});

	console.log('Hi!');

	// resolve或reject并不会终结Promise的参数函数的执行
	new Promise(function (resolve, reject) {
		resolve(1);
		console.log('2');
	}).then(function (result) {
		console.log(result);
	});

	// 一般来说，调用resolve或reject以后，Promise 的使命就完成了，
	// 后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。
	// 所以，最好在它们前面加上return语句，这样就不会有意外。
	new Promise(function (resolve, reject) {
		return resolve(1);
		console.log('2');
	}).then(function (result) {
		console.log(result);
	});

	// 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。
	// reject函数的参数通常是Error对象的实例，表示抛出的错误；
	// resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例
	var p1 = new Promise(function (resolve, reject) {
		setTimeout(function () {
			return reject(new Error('fail'));
		}, 3000);
	});

	var p2 = new Promise(function (resolve, reject) {
		// 这里的resolve传递的参数是一个Promise实例，那么表示p2的状态将取决于p1的状态
		// 如果p1的状态是pending，那么p2的回调函数将等待p1的状态改变；
		// 如果p1的状态是resolved或者rejected，那么p2的回调函数将会立即执行
		setTimeout(function () {
			return resolve(p1);
		}, 1000);
	});

	p2.then(function (result) {
		return console.log(result);
	}).catch(function (error) {
		return console.log(error);
	});

	// =========================================================
	// Promise.prototype.then()
	// .then()方法提供两个参数，第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
	// .then()方法返回的是一个新的Promise对象，因此可以采用链式写法，即.then()之后可以再调用一个the方法。
	// 采用链式的then，可以指定一组按照次序调用的回调函数。
	// 这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

	// 将Ajax Get请求封装成一个Promise对象
	var getJSON = function getJSON(url) {
		var promise = new Promise(function (resolve, reject) {
			var handler = function handler() {
				if (this.readyState !== 4) {
					return;
				}
				if (this.status === 200) {
					console.log('getJson:', url);
					resolve(this.response);
				} else {
					reject(new Error(this.statusText));
				}
			};
			var client = new XMLHttpRequest();
			client.open("GET", url);
			client.onreadystatechange = handler;
			client.responseType = "json";
			client.setRequestHeader("Accept", "application/json");
			client.send();
		});

		return promise;
	};

	// 下面的代码使用了then方法先后指定了两个回调函数，当第一个回调函数完成之后，会将返回结果作为参数传递给第二个回调函数
	getJSON('./data.json').then(function (result) {
		console.log('then1-1:', result);
		return result.data;
	}).then(function (result) {
		console.log('then1-2:', result);
	});

	// then方法的回调可以返回一个Promise对象，这样第二个then方法指定的回调，将会等待这个新的Promise对象状态发生变化
	// 如果变为resolved，就调用funcA，如果状态变为rejected，就调用funcB
	getJSON('./data.json').then(function (result) {
		console.log('then2-1:', result);
		return getJSON('./data2.json');
	}).then(function (result) {
		console.log('then2-2:', result);
		return getJSON('./data3.json');
	}).then(function (result) {
		console.log('then2-3-success');
	}, function (err) {
		console.log('then2-3-error');
		console.log(err);
	});

	// =========================================================
	// Promise.prototype.catch()
	// Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
	getJSON('./data2.json').then(function (result) {
		console.log('catch1-success', result);
	}).catch(function (err) {
		console.log('catch1-error', err);
	});

	// Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
	// 一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。
	// catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。


	// =========================================================
	// Promise.prototype.finally()
	// finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

	// new Promise((resolve, reject) => {
	// 	resolve('test-return');
	// }).then(result => {
	// 	console.log('test-success');
	// }).catch(err => {
	// 	console.log('test-error');
	// }).finally(() => {
	// 	console.log('test-finally');
	// });


	// =========================================================
	// Promise.all([p1, p2, p3])
	// Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
	// 新的Promise实例的状态取决于p1、p2、p3的整体状态，如果依赖的Promise实例的任意一个状态为rejected，那么新的Promise对象的状态就是rejected。
	// 只有当所有依赖的Promise对象的状态都是resolved，新的Promise对象的状态才是resolved。

	var promises = ['', '', '', '2'].map(function (id, index) {
		return getJSON('./data' + id + '.json');
	});

	Promise.all(promises).then(function (result) {
		console.log('Promise.all() resolved');
	}).catch(function (err) {
		console.olg('Promise.all() err');
	});

	// =========================================================
	// Promise.race([p1, p2, p3])
	// Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
	// 新的Promise实例的状态值，将取决于所依赖的所有的Promise实例中最先改变状态的那个实例。

	// 下面包装的新的Promise实例，如果指定时间内没有获得结果，就将Promise的状态变为rejected
	var promises2 = Promise.race([getJSON('./data.json'), new Promise(function (resolve, reject) {
		setTimeout(function () {
			return reject(new Error('request timeout'));
		}, 10);
	})]);

	promises2.then(function (result) {
		console.log('Promise.race resolved');
	}).catch(function (err) {
		console.log('Promise.race err');
	});

	// =========================================================
	// Promise.resolve()
	// Promise.resolve方法将现有对象转换为Promise对象

	// 如果参数为空，则直接返回一个新的resolved状态的Promise对象，之后的then方法的回调函数会被立即执行
	// 所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve方法。
	var promise1 = Promise.resolve();
	promise1.then(function (result) {
		console.log('Promise.resolve-1:', result);
	});

	// 如果参数不是具有then方法的对象，或根本不是对象
	// 则返回一个新的resolved状态的Promise对象
	// 之后的then方法的回调函数会被立即执行，Promise.resolve方法的参数，会同时传给回调函数
	var promise2 = Promise.resolve({ a: 1, b: 2, c: 3 });
	promise2.then(function (result) {
		console.log('Promise.resolve-2:', result);
	});

	// 如果参数是Promise实例，那么Promise.resolve不会做任何修改，原封不动的返回这个实例

	// 如果参数是一个thenable对象，即对象中含有then方法的对象
	// 那么Promise.resolve方法会将这个对象转换为Promise对象，然后立即执行thenable对象的then方法。


	// =========================================================
	// Promise.reject()
	// Promise.reject方法也会返回一个新的Promise实例，该实例的状态为rejected。
	var promise3 = Promise.reject('出错了');
	promise3.catch(function (err) {
		console.log('Promise.reject error');
	});
}();