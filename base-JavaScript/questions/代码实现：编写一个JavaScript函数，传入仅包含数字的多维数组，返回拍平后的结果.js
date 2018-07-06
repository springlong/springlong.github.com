// 编写一个JavaScript函数，传入仅包含数字的多维数组，返回拍平后的结果：
// 比如：传入[1, [2, 3]]，返回[1, 2, 3]

// 方案一
function flatten(arr)
{
	var result = [],
		i = 0,
		len = arr.length;

	for(; i < len; i++ ){
		result = result.concat(arr[i]);
	}
	return result;
}
console.info( flatten([1, [2, 3], 3, [4, 5, 6]]) );


// 方案二
function flatten(arr)
{
	var result = [],
		i = 0,
		len = arr.length,
		data;

	for(; i < len; i++ ){
		data = arr[i];
		result.push.apply(result, data instanceof Array ? data : [data]);
	}
	return result;
}
console.info( flatten([1, [2, 3], 3, [4, 5, 6]]) );


// 方案三
function flatten(arr)
{
	var result = arr.join(',').split(','),
		i = 0,
		len = result.length;

	for(; i < len; i++){
		result[i] = parseInt(result[i]);
	}
	return result;
}
console.info( flatten([1, [2, 3], 3, [4, 5, 6]]) );
