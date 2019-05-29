
// 类
// 传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，我们终于迎来了 class。
// TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。
// 这一节主要介绍类的用法，下一节再介绍如何定义类的类型。




// =======================================================
// =======================================================
// ES6 中类的用法
// 下面我们先回顾一下 ES6 中类的用法。

// 属性和方法
// 使用 class 定义类，使用 constructor 定义构造函数。
// 通过 new 生成新实例的时候，会自动调用构造函数。

class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

let a = new Animal('Jack');
console.log(a.sayHi());


// 类的继承
// 使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。
class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi();
  }
}
let c = new Cat('Tom');
console.log(c.sayHi());


// 存取器
// 使用 getter 和 setter 可以拦截该属性的存取行为：
class Animal2 {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}
let a2 = new Animal2('Kitty');
a2.name = 'Tom';
console.log(a2.name);


// 静态方法
// 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：
class Animal3 {
  constructor(name) {
    this.name = name;
  }
  static isAnimal(a) {
    return a instanceof Animal3;
  }
}
let a3 = new Animal3('Jack');
console.log(Animal3.isAnimal(a3));
console.log(a3.isAnimal(a3));  // error: isAnimal方法仅存在于Animal3类中


// ES7 中类的用法
// ES7 中有一些关于类的提案，TypeScript 也实现了它们，这里做一个简单的介绍。

// 实例属性
// ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义：

class Animal4 {
  constructor() {
    // ...
  }

  // 实例属性
  name = 'Jack';
}

let a4 = new Animal4();
console.log(a4.name);  // Jack


// 静态属性
// ES7 提案中，可以使用 static 定义一个静态属性：
class Animal5 {
  constructor() {
    // ...
  }

  static num  = 42;
}
console.log(Animal5.num);  // 42




// =======================================================
// =======================================================
// TypeScript 中类的用法
// public private 和 protected

// TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

// 下面举一些例子：
// 下面的例子中，name 被设置为了 public，所以直接访问实例的 name 属性是允许的。
class Animal6 {
  public name;
  public constructor(name) {
    this.name = name;
  }
}
let a6 = new Animal6('Jack');
console.log(a6.name); // Jack
a6.name = 'Tom';
console.log(a6.name); // Tom


// 很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 private 了：
// 需要注意的是，TypeScript 编译之后的代码中，并没有限制 private 属性在外部的可访问性。
class Animal7 {
  private name;
  public constructor(name) {
    this.name = name;
  }
}
let a7 = new Animal7('Jack');
console.log(a7.name);
a7.name = 'Tom';


// 使用 private 修饰的属性或方法，在子类中也是不允许访问的：
class Animal8 {
  private name;
  public constructor(name) {
    this.name = name;
  }
}
class Cat8 extends Animal8 {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}


// 而如果是用 protected 修饰，则允许在子类中访问：
class Animal9 {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat9 extends Animal9 {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}

let a9 = new Animal9('Jack');
console.log(a9.name);



// =======================================================
// =======================================================
// TypeScript 中类的用法
// 抽象类
// abstract 用于定义抽象类和其中的抽象方法。

// 什么是抽象类？
// 首先，抽象类是不允许被实例化的：
abstract class Animal10 {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public eat() {
    console.log(`${this.name} is eating`);
  }
  public abstract sayHi();
}

let a10 = new Animal10('Jack');  // error: 无法创建抽象类的实例。

// 上面的例子中，我们定义了一个抽象类 Animal，并且定义了一个抽象方法 sayHi。在实例化抽象类的时候报错了。


// 其次，抽象类中的抽象方法必须被子类实现：
abstract class Animal11 {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public eat() {
    console.log(`${this.name} is eating`);
  }
  public abstract sayHi();
}

class Cat11 extends Animal11 {
  public eat() {
    console.log(`${this.name} is eating.`);
  }
}

let cat11 = new Cat11('Tom');


// 上面的例子中，我们定义了一个类 Cat 继承了抽象类 Animal，但是没有实现抽象方法 sayHi，所以编译报错了。

// 下面是一个正确使用抽象类的例子：
abstract class Animal12 {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public eat() {
    console.log(`${this.name} is eating`);
  }
  public abstract sayHi();
}

class Cat12 extends Animal12 {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat12 = new Cat12('Tom');
cat12.eat();
cat12.sayHi();

// 上面的例子中，我们实现了抽象方法 sayHi，编译通过了。
// 需要注意的是，即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类.




// =======================================================
// =======================================================
// 类的类型
// 给类加上 TypeScript 的类型很简单，与接口类似：

class Animal13 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My Name is ${this.name}`;
  }
}

let a13: Animal13 = new Animal13('Jack');
console.log(a13.sayHi());
