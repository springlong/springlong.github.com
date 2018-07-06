/**
 * 取得当前股票的涨停价格和涨停幅度
 * @param  {number} lastPrice 昨天的股价
 * @return {string}           涨停价格和涨停幅度的整合字符串
 */
function riseStop(lastPrice)
{
	var stopPrice = (lastPrice * 1.1).toFixed(2),
		stopPercent = (Math.round((stopPrice - lastPrice) / lastPrice * 10000) / 100).toFixed(2) + "%";
	
	return stopPrice + " " + stopPercent;
}
console.log( riseStop(13.91) );   // --> 15.30 9.99%
console.log( riseStop(34.96) );   // --> 38.46 10.01%