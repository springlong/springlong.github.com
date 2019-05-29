// 泛型
// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
// =======================================================
// =======================================================
// 简单的例子
// 首先，我们来实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x');
// 上例中，我们使用了之前提到过的数组泛型来定义返回值的类型。
// 这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：
// Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
// 这时候，泛型就派上用场了：
function createArray2(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray2(3, 'x');
// 上例中，我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
// 接着在调用的时候，可以指定它具体的类型为 string。
// 当然，也可以不手动指定，而让类型推论自动推算出来：
function createArray3(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray3(3, 'x');
// =======================================================
// =======================================================
// 多个类型参数
// 定义泛型的时候，可以一次定义多个类型参数：
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']);
swap([7, 7]);
swap(['seven', 'seven']);
// =======================================================
// =======================================================
// 泛型约束
// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
function loggingIdentity2(arg) {
    console.log(arg.length);
    return arg;
}
// 上例中，我们使用了 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性。
// 此时如果调用 loggingIdentity 的时候，传入的 arg 不包含 length，那么在编译阶段就会报错了：
loggingIdentity2(7);
// 多个类型参数之间也可以互相约束：
function copyFields(target, source) {
    for (var id in source) {
        target[id] = source[id];
    }
    return target;
}
var x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });
var mySearchFunc;
mySearch = function (source, substring) {
    return source.search(substring) !== -1;
};
var createArr;
createArr = function (length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
};
createArr(3, 'x');
var createArr2;
createArr2 = function (length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
};
createArr2(3, 'x');
// =======================================================
// =======================================================
// 泛型类
// 与泛型接口类似，泛型也可以用于类的类型定义中：
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
