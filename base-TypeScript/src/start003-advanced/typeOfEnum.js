// 枚举
// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
// =======================================================
// =======================================================
// 简单的例子
// 枚举使用 enum 关键字来定义：
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
;
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
// =======================================================
// =======================================================
// 手动赋值
// 我们也可以给枚举项手动赋值：
var Days2;
(function (Days2) {
    Days2[Days2["Sun"] = 7] = "Sun";
    Days2[Days2["Mon"] = 1] = "Mon";
    Days2[Days2["Tue"] = 2] = "Tue";
    Days2[Days2["Wed"] = 3] = "Wed";
    Days2[Days2["Thu"] = 4] = "Thu";
    Days2[Days2["Fri"] = 5] = "Fri";
    Days2[Days2["Sat"] = 6] = "Sat";
})(Days2 || (Days2 = {}));
;
console.log(Days2["Sun"] === 7); // true
console.log(Days2["Mon"] === 1); // true
console.log(Days2["Tue"] === 2); // true
console.log(Days2["Sat"] === 6); // true
// 上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增。
// 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：
var Days3;
(function (Days3) {
    Days3[Days3["Sun"] = 5] = "Sun";
    Days3[Days3["Mon"] = 3] = "Mon";
    Days3[Days3["Tue"] = 4] = "Tue";
    Days3[Days3["Wed"] = 5] = "Wed";
    Days3[Days3["Thu"] = 6] = "Thu";
    Days3[Days3["Fri"] = 7] = "Fri";
    Days3[Days3["Sat"] = 8] = "Sat";
})(Days3 || (Days3 = {}));
;
console.log(Days3["Sun"] === 5); // true
console.log(Days3["Wed"] === 5); // true
console.log(Days3[5] === "Sun"); // false
console.log(Days3[5] === "Wed"); // true
// 上面的例子中，'Tue' 由于未手动赋值 接着 'Mon' 的枚举项递增为 4。
// 'Wed' 递增到 5 的时候与前面的 Sun 的取值重复了，
// 但是 TypeScript 并没有报错，导致 Days[5] 的值先是 "Sun"，而后又被 "Wed" 覆盖了。
// 所以使用的时候需要注意，最好不要出现这种覆盖的情况。
// 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：
var Days4;
(function (Days4) {
    Days4[Days4["Sun"] = 7] = "Sun";
    Days4[Days4["Mon"] = 8] = "Mon";
    Days4[Days4["Tue"] = 9] = "Tue";
    Days4[Days4["Wed"] = 10] = "Wed";
    Days4[Days4["Thu"] = 11] = "Thu";
    Days4[Days4["Fri"] = 12] = "Fri";
    Days4[Days4["Sat"] = "S"] = "Sat";
})(Days4 || (Days4 = {}));
;
// 当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1：
var Days5;
(function (Days5) {
    Days5[Days5["Sun"] = 7] = "Sun";
    Days5[Days5["Mon"] = 1.5] = "Mon";
    Days5[Days5["Tue"] = 2.5] = "Tue";
    Days5[Days5["Wed"] = 3.5] = "Wed";
    Days5[Days5["Thu"] = 4.5] = "Thu";
    Days5[Days5["Fri"] = 5.5] = "Fri";
    Days5[Days5["Sat"] = 6.5] = "Sat";
})(Days5 || (Days5 = {}));
;
// =======================================================
// =======================================================
// 常数项和计算所得项
// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
// 前面我们所举的例子都是常数项，一个典型的计算所得项的例子：
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = "blue".length] = "Blue";
})(Color || (Color = {}));
;
// 上面的例子中，"blue".length 就是一个计算所得项。
// 上面的例子不会报错，但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = "red".length] = "Red";
    Color2[Color2["Green"] = void 0] = "Green";
    Color2[Color2["Blue"] = void 0] = "Blue";
})(Color2 || (Color2 = {}));
;
var directionsDemo = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
;
var directionsDemo2 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
var directionsDemo3 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
