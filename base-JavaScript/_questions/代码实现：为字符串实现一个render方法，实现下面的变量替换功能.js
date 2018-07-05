/**
 * @fileoverview  为字符串实现一个render方法，实现下面的变量替换功能
 **/
var greeting = 'my name is $(name),age $(age)';
var result = greeting.render({name:'XiaoMing',age:11});
console.log(result); // my name is XiaoMing,age 11