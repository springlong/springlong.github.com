// 例如：删除当前所在索引后的第4个元素（从索引0开始）
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// [1, 2, 3, 4, 6, 7, 8, 9, 10]
// [1, 2, 3, 4, 6, 7, 8, 9]
// [1, 2, 3, 6, 7, 8, 9]
// [2, 3, 6, 7, 8, 9]
// [2, 3, 6, 7, 9]
// [2, 3, 6, 9]
// [2, 3, 6]
// [3, 6]
// [6]

/**
 * 从索引0开始，循环删除当前索引后的第n个数组元素，直到数组长度为1
 * @param  {Array} arr 待操作的数组
 * @param  {number} base 索引基数	
 * @return {Array}     返回数组长度为1时的结果
 */
function removeLoop(arr, base)
{
	var index = 0,
		maxIndex = arr.length - 1;

	base = base || 1;

	while(maxIndex > 0){

		index = (index + base) % (maxIndex + 1);

		arr.splice(index, 1);
		console.log(arr);

		maxIndex = arr.length - 1;
		index = index > maxIndex ? maxIndex : index;
	}

	return arr;
}

removeLoop([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4);