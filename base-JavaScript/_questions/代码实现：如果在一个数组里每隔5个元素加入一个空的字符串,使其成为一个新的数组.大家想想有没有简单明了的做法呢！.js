// 如果在一个数组里每隔5个元素加入一个空的字符串,使其成为一个新的数组.大家想想有没有简单明了的做法呢！
// 例如：
// [1,2,3,4,5,6,7,8,9,10] >-- [1,2,3,4,5,"",6,7,8,9,10,""]


// 方案一
function addToArray(arr)
{
	var arr = arr.slice(),
		len = arr.length,
		step = 5,
		i = step;

	for(; i <= len++; i += step + 1){
		arr.splice(i, 0, '');
	}

	return arr;
}

var arr = [1,2,3,4,5,6,7,8,9,10];
console.info( addToArray(arr) );
console.info( arr );


// 方案二
function addToArray(arr)
{
	var arr = arr.slice(),
		step = 5,
		times = arr.length / step,
		i = 0;

	for(; i < times; i++){
		arr.splice( step * (i + 1) + i, 0, '');
	}

	return arr;
}

var arr = [1,2,3,4,5,6,7,8,9,10];
console.info( addToArray(arr) );
console.info( arr );