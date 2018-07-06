// 实现一个isDuplicate的方法，如果这个方法传入的参数包含相同的数字则返回true，否则返回false。
// 例如：
// isDuplicate(1, 2, 3, 4, 5);	 	// return flase;
// isDuplicate(1, 2, 3, 2); 		// return true;


// 方案一
function isDuplicate()
{
	var data = {},
		i = 0,
		len = arguments.length;

	for(; i < len; i++){
		if(data[arguments[i]] !== undefined){
			return true;
		}
		data[arguments[i]] = 1;
	}
	return false;
}
console.info( isDuplicate(1, 2, 3, 4, 5) );
console.info( isDuplicate(1, 2, 3, 2) );


// 方案二
function isDuplicate()
{
	var arr = Array.prototype.slice.call(arguments),
		i = 0,
		len = arr.length;

	for(; i < len; i++){
		if(arr.indexOf(arr[i], i+1) > i){
			return true;
		}
	}
	return false;
}
console.info( isDuplicate(1, 2, 3, 4, 5) );
console.info( isDuplicate(1, 2, 3, 2) );