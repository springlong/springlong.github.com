
// 元组
// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

// 元组起源于函数编程语言（如 F#）,在这些语言中频繁使用元组。



// =======================================================
// =======================================================
// 简单的例子
// 定义一对值分别为 string 和 number 的元组：
let tupleDemo: [string, number] = ['Xcat Liu', 25];

// 当赋值或访问一个已知索引的元素时，会得到正确的类型：
let xcatliu: [string, number];
xcatliu[0] = 'Xcat Liu';
xcatliu[1] = 25;

// 定义的元组只包含2个成员，给第三个成员赋值将报错
xcatliu[2] = 'other text';

// 也可以只赋值其中一项：
let xcatliu2: [string, number];
xcatliu2[0] = 'Xcat Liu';

// 但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
let xcatliu3: [string, number];
xcatliu3 = ['Xcat Liu', 25];

// 由于直接赋值缺少了另一个成员，报错
xcatliu3 = ['only text'];

// 赋值类型与定义不匹配，报错
let xcatliu4: [string, number] = ['Xcat Liu'];

// 不能先提供一个成员设置，后期再补充赋值
let xcatliu5: [string, number];
xcatliu5 = ['Xcat Liu'];
xcatliu5[1] = 25;



// =======================================================
// =======================================================
// 越界的元素
// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
let xcatliu6: [string, number];
xcatliu6 = ['Xcat Liu', 25];
xcatliu6.push('http://xcatliu.com/');
xcatliu6.push(true);
