// 对象的类型——接口
// 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
var tom = {
    name: 'Tom',
    age: 25
};
// 定义的变量比接口少了一些属性是不允许的：
var tom2 = {
    name: 'Tom'
};
// 多一些属性也是不允许的：
var tom22 = {
    name: 'Tom',
    age: 25,
    sex: 'male'
};
var tom3 = {
    name: 'Tom'
};
var tom33 = {
    name: 'Tom',
    age: 25
};
// 这时仍然不允许添加未定义的属性：
var tom333 = {
    name: 'Tom',
    age: 25,
    sex: 'male'
};
var tom4 = {
    name: 'Tom',
    sex: 'male'
};
var tom5 = {
    name: 'Tom',
    age: 25,
    sex: 'male'
};
var tom6 = {
    id: 89757,
    name: 'Tom',
    sex: 'male'
};
// 使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了。
tom6.id = 9527;
var tom7 = {
    name: 'Tom',
    gender: 'male'
};
tom7.id = 89757;
