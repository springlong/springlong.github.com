/**
 * 重置当前url中的参数
 * @param {Object} data 参数名称与参数值的比对列表，例如： {page: '2', order: 'sale'}
 * @return {string} 返回url参数重置后的链接字符串
 */
function setUrlQuery(data)
{
	var url = location.href,
		search = location.search.replace(/^\?*/, ''),
		strQuery, regResult;

	for(var name in data){

		if(data.hasOwnProperty(name)){

			regResult = new RegExp('(&|\\b)(' + name + '[^&#]*)', 'ig').exec(search);
			strQuery = name + '=' + data[name];

			console.info(regResult);

			// 替换原有参数：replace('page=2', 'page=3')
			if(regResult !== null && regResult.length === 3) {

				search = search.replace(regResult[2], strQuery);
			}
			// 附加新的参数
			else{

				search += '&' + strQuery;
			}
		}
	}

	if(search.indexOf('&') === 0){
		search = search.substring(1);
	}

	return url.indexOf('?') >= 0 ? url.substring(0, url.indexOf('?')) + '?' + search : (url + '?' + search);
}