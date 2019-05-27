// =======================================================
// =======================================================
// =======================================================
// 原始数据类型


// 布尔值
let isDone: boolean = false;
let createdByBoolean: boolean = Boolean(1);  // 直接调用 Boolean 也可以返回一个 boolean 类型
let createdByNewBoolean : boolean = new Boolean(1);  // error: 事实上 new Boolean() 返回的是一个 Boolean 对象


// 数值
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;        // 十六进制
let binaryLiteral: number = 0b1010;     // ES6 中的二进制表示法,会被编译为十进制数字
let octalLiteral: number = 0o744;       // ES6 中的八进制表示法,会被编译为十进制数字
let notANumber: number = NaN;
let infinityNumber: number = Infinity;


// 字符串
let myName: string = 'Tom';
let myAge: number = 25;
let sentence: string = `Hello, my name is ${myName}. I'll be ${myAge + 1} years old next month`;  // 模板字符串


// 空值
// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
function alertName(): void {
  alert('My name is Tom');
}
// 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null
let unusable: void = undefined;


// Null 和 Undefined
// 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
let u: undefined = undefined;
let n: null = null;

// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
let num: number = undefined;
let num2: number = u;

// 而 void 类型的变量不能赋值给 number 类型的变量
let u2: void;
let num3: number = u2;




// =======================================================
// =======================================================
// =======================================================
// 任意值
// 任意值（Any）用来表示允许赋值为任意类型。

// 如果是一个普通类型，在赋值过程中改变类型是不被允许的：
let myfavoriteNumber: string = 'seven';
myfavoriteNumber = 7;

// 但如果是 any 类型，则允许被赋值为任意类型。
let myFavoriteNumber2: any = 'seven';
myFavoriteNumber2 = 7;

// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let everything;
everything = 'seven';
everything = 7;
everything.setName('Tom');



// =======================================================
// =======================================================
// =======================================================
// 类型推论
// 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
// TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查

// 以下代码虽然没有指定类型，但是会在编译的时候报错：
let myFavoNumber = 'seven';
myFavoNumber = 7;

// 事实上，它等价于：
let myFavoNumber2: string = 'seven';
myFavoNumber2 = 7;



// =======================================================
// =======================================================
// =======================================================
// 联合类型
// 联合类型（Union Types）表示取值可以为多种类型中的一种。

// 这里的 let favoNumver: string | number 的含义是，允许 favoNumver 的类型是 string 或者 number，但是不能是其他类型。
let favoNumver: string | number;
favoNumver = 'seven';
favoNumver = 7;
favoNumver = true;

// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
// 下面的代码示例，length 不是 string 和 number 的共有属性，所以会报错。
function getLength(something: string | number): number {
  return something.length;
}

// 访问 string 和 number 的共有属性是没问题的：
function getString(something: string | number): string {
  return something.toString();
}

// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
// 下面代码示例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。
// 而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。
let favoNumver2: string | number;
favoNumver2 = 'seven';
console.log(favoNumver2.length); // 5
favoNumver2 = 7;
console.log(favoNumver2.length); // 编译时报错
