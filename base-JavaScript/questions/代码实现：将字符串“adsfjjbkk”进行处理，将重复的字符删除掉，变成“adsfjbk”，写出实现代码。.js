/**
 * @fileoverview  将字符串“adsfjjbkk”进行处理，将重复的字符删除掉，变成“adsfjbk”，写出实现代码。
 **/

var strDefault = "adsfjjbkk",  	//原始字符串
	character = strDefault[0], 	//单个字符
	strResult = character, 		//处理之后的结果
	len = strDefault.length, 	//原字符串长度
	i = 1; 						//从第二个字符开始

for(; i < len;)
{
	character !== (character = strDefault[i++]) && (strResult += character);
}
alert('The result is: "' + strResult + '"');