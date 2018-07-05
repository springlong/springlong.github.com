//根据ID获取目标对象$$
function $$(id){return (typeof(id) == "string") ? document.getElementById(id) : id;}

//生成基类的一个对象实例ja
function ja(id){ return new jsApp(id); }

//构建基类jsApp对象
function jsApp(id)
{
   	this.obj = (typeof(id) == "string") ? document.getElementById(id) : id;
   	if(this.obj)
   	{
   		if(this.obj.objThis)
   		{
   			//二次访问时，直接返回第一次声明的实例对象
   			return this.obj.objThis;
   		}
       	this.id = this.obj.id;
       	this.obj.objThis = this;
   	}
   	this.timerId = null;	//用于保存动画的计时器ID
   	this.timers = [];  		//用于保存动画的集合
}
jsApp.prototype = 
{
	getStyle:function(styleName)
	{
		//============================================================================================================================//
		//获取对象的目标样式或属性
		/*=================
		 *说明：在Javascript中，如果我们首次使用style对象获取一个元素的相关样式属性，往往得不到正确的结果，结果往往为空。这是因为style对象中的属性并不是实时更新的，即使目标元素通过CSS设置了该属性，在第一次通过style对象获取该属性时也无法捕捉到该属性的值。
		 *作者：Jerry_小猪
		 *QQ：569320261
		 *创作时间：2011-11-12
		 *修改时间：2011-11-12;2012-12-15;
		 *        ：2012-03-18：增加对opacity属性值的获取；
				  ：2012-07-13：增加对DOM属性值的获取；
				  ：2012-07-19：修改代码结构；
		 *--------------------------------
		 *参数说明：
		 *1. styleName: 样式名称（如：“fontSize”、“fontFamily”、“marginLeft”、“opacity”）
		 *==================================================*/
	    var obj = this.obj;
	    if(obj)
	    {
	    	var result = 0;
	        if(styleName in obj)
	        {
	        	//用于获取DOM属性值
				result = obj[styleName];
	        }
			else if(styleName == "opacity" && (isIE6 || isIE7 || isIE8))
	        {
	        	//IE6/7/8浏览器获取透明属性值,并将值保持在0~1之间，与标准的style.opacity属性兼容(注：在alpha对象为空时，默认取值为1)
	            result = (obj.filters.alpha) ?  obj.filters.alpha.opacity / 100 : 1; 
	        }
	        else if(obj.style[styleName] == "" || obj.style[styleName] == undefined)
	        {
	        	//获取运行时样式
	       		result = obj.currentStyle ? obj.currentStyle[styleName] : window.getComputedStyle(obj,null)[styleName];
	        }
	        else
	        {
	        	//获取已知样式
	        	result = obj.style[styleName];
	        }
	        return (result == "auto")? 0 : result;
	    }
	},
	setStyle:function(styleName, value)
	{
		//============================================================================================================================//
		//对目标对象的样式或属性进行赋值
		/*=================
		 *说明：opacity属性值的取值为0~1
		 *作者：Jerry_小猪
		 *QQ：569320261
		 *创作时间：2012-03-18
		 *修改时间：2012-03-18
		 *		  ：2012-07-13：当设置opacity属性时，filter滤镜透明仅针对IE6、7、8；
		 *-----------------------------------
		 *参数说明：
		 *1. styleName: 样式名称（如：“fontSize”、“fontFamily”、“marginLeft”、“opacity”）
		 *2. value: 样式值
		 *==================================================*/
	    var obj = this.obj;
	    if(obj)
	    {
	        if(styleName in obj)
	        {
	        	//DOM属性值
				obj[styleName] = value;
	        }
	        else if(styleName == "opacity")
			{
				//opacity属性
	            obj.style.cssText += ";opacity:" + value + ";filter:alpha(opacity=" + value*100 + ") \9;"; //这行代码仅能用于第一次赋值方才生效，第二次赋值需要借助下面的代码(注：因为IE9同时支持opacity和filter的透明属性，所以在仅让IE9版本以下的IE浏览器使用Filter滤镜透明)。
				(isIE6 || isIE7 || isIE8) ? obj.filters.alpha.opacity = value * 100 : obj.style[i] = value;
	        }
			else
			{
				//其他标准属性
	            obj.style[styleName] = value;
	        }
	    }
	    return this;
	}
}
jsApp.prototype.animate = function(attrs, params, callback, delay)
{
	//============================================================================================================================//
	//动画外部参数传递接口
	/*=================
	 *目标：通过调用该方法，将动画相关参数传递给动画参数的配置接口；
	 *作者：Jerry_小猪
	 *QQ：569320261
	 *创作时间：2012-07-17
	 *修改时间：2012-07-17
	          ：2012-07-22
	 *-----------------------------------
	 *参数说明：
	 *1. attrs: 需要更改目标对象的属性集合， 如：{width:200, height:200, left:"+100", top:"-100", opacity:0.5, backgroundColor:"#056279"}
	 *			说明：
	 *				对于left、width等数值属性支持绝对数值，也支持相对数值。相对数值采用字符串格式进行书写，"+"表示在原来基础进行相加的结果，"-"则表示在原来基础上进行相减的结果。
	 *			  	对于颜色color或者backgroundColor属性值采用字符串格式进行书写，如："#ffffff"、"#000000"、"#cc0000"。（注意：在进行颜色值的变换效果中，最终颜色值必须是6位的十六进制值，并且原始颜色值[即通过CSS设置的color或background-color的值]不能为英文单词，但可以是三位的十六进制颜色值。这是因为在非IE浏览器中，无论你的颜色值为“#000”、“balck"、"#000000"中的哪一种，最终都将转为rgb()格式进行保存，而在IE6中，将保留原始值字符串值！）	
	 *2. params: 参数设置，以JSON格式存在:
	 		tween: 缓动效果
	 		duration: 运动持续的总时间（单位：秒）
			noZIdx: 是否不进行层叠控制，默认值为true，即不进行层叠控制
			zoomFromCenter: 是否以目标对象中心进行缩放，默认值为false
	 *3. callback: 回调函数，当移动动画执行完毕后触发
	 *4. delay: 回调函数延迟触发的时间（单位：毫秒）
	 *==================================================*/
	console.time("参数传递接口");
 	var obj = this.obj;
 	if(obj)
 	{
		var FPS = 75;							//每秒帧数
		var SPF = 1000 / FPS;					//每帧执行的间隔时间
		duration = params && params.duration ? params.duration : 1;			//设置默认时间为1秒钟
		var frames = duration * FPS;			//运动的总次数
		tween = params && params.tween ? params.tween : Tween.Quad.easeOut;	//默认缓动效果
		delay = delay == undefined ? 0 : delay;	//回调函数的延迟加载时间

		//遍历属性
	 	for(var name in attrs)
	 	{
			var begin = $$(obj).getStyle(name);
			var suffix = String(begin).indexOf("px") != -1 ? "px" : 0;			//属性值的单位
			begin = parseFloat(begin);											//初始值
			if(isNaN(begin)){ continue; }										//非数值属性无法使用动画效果
			var end = String(attrs[name]).charAt(0) == "+" || String(attrs[name]).charAt(0) == "-" ? begin + parseFloat(attrs[name]) : attrs[name];	//结束值
			var change = end - begin;											//变换的量
			var times = 0;														//当前运动次数

		 	var config = 
		 	{
		 		app: this,
		 		obj: obj,
		 		attr:  name,
		 		begin: begin,
		 		end: end,
		 		change: change,
		 		times: times,
		 		frames: frames,
		 		suffix: suffix,
		 		tween: tween,
		 		SPF: SPF,
		 		callback: callback,
		 		delay: delay
		 	}

		 	//初始化动画的一个实例，并执行
		 	var fx = new FX(config);
		 	fx.custom();
	 	}
	}
	console.timeEnd("参数传递接口");
	return this;
}
jsApp.prototype.stop = function()
{
	//============================================================================================================================//
	//停止目标对象的动画输出
	/*=================
	 *目标：停止目标对象的动画输出；
	 *作者：Jerry_小猪
	 *QQ：569320261
	 *创作时间：2012-07-22
	 *修改时间：2012-07-22
	 *==================================================*/
	clearInterval(this.timerId);
	return this;
}

/*=====================================================================
 *动画的构造函数
 */
var FX = function()
{
 	for(var i in arguments[0])
 	{
 		this[i] = arguments[0][i];	//将动画的参数信息保存
 	}
}
//动画的控制
FX.prototype.custom = function()
{
	// alert(this.attr + ":" + this.begin + ";" + this.end)
	// return false;
 	var _this = this;

 	//将所有动画保存至一个数组
 	function fn()
 	{
 		_this.step();
 	}
 	_this.app.timers.push(fn);

 	//设置定时器
 	if(!_this.app.timerId)
	{
 	 	_this.app.timerId = setInterval(function()
	 	{
	 		// alert(_this.app.timers.length);
	 		if(_this.app.timers.length > 0)
	 		{
	 			for(var i = 0; i < _this.app.timers.length; i++)
	 			{
	 				_this.app.timers[i].call();
	 			}
	 		}
	 		else
	 		{
	 			clearInterval(_this.app.timerId);
		 		if(_this.callback && typeof(_this.callback) == "function")
		 		{
		 			setTimeOut(callback, _this.delay);
		 		}
	 			_this.app.timerId = null;
	 		}
	 	}, _this.SPF);
 	}
}
//动画的执行
FX.prototype.step = function()
{
	//console.time("时间");
	var _this = this;

 	$$(_this.obj).setStyle(_this.attr, _this.tween(_this.times, _this.begin, _this.change, _this.frames) + _this.suffix);	//进行缓动运动
	_this.times++;
 	if(_this.times >= _this.frames)
 	{
 		//动画执行完毕，将属性重置为目标值
 		clearInterval(_this.app.timerId);
 		$$(_this.obj).setStyle(_this.attr, _this.end);
		for(var i = 0; i < _this.app.timers.length; i++)
		{
			// if(_this.app.timers[i] == this)
			// {
			// 	_this.app.timers.splice(i, 1);
			// }
			if(_this.app.timers[i] == arguments.callee)
			{
				alert(true);
				_this.app.timers.splice(i, 1);
			}
		}
 	}
	//console.timeEnd("时间");
}






/*=============================================================================================================================//
 *jsApp对象的基本功能扩展
 */




/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 字符串String对象的方法及属性扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 字符串String对象的方法及属性扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

//$$.trim()方法用于去除目标字符串中的首尾空格，返回值类型：string
/*----------------------------------
 *编写者：Jerry_小猪
 *QQ：569320261
 *创作日期：2011-09-04
 *修改日期：2011-09-04
 *----------------------------------
 *参数说明：
 *1. str：（类型：string，必备）目标字符串；
 *=================================================================================*/
$$.trim = function(str)
{
	/// <summary>用于去除目标字符串中的首尾空格</summary>
	/// <param name="str" type="number">(必备)目标字符串</param>
	/// <returns type="string"></returns>
	return str.replace(/^\s*|\s*$/g,"");
}

//$$.padStr()方法用于填充字符以使目标字符串达到指定长度，返回值类型：string
/*----------------------------------
 *编写者：Jerry_小猪
 *QQ：569320261
 *创作日期：2011-09-04
 *修改日期：2011-09-04
 *----------------------------------
 *参数说明：
 *1. str：（类型：string，必备）目标字符串；
 *2. dir：（类型：string，必备）填充的方向，"l"——左填充，"r"——右填充；
 *3. len：（类型：number，必备）目标显示长度；
 *4. c：（类型：string，必备）用来进行填充的字符，如果是以&开头且长度大于1的字符串作为特殊HTML编码字符来使用，如果不是以&开头且长度大于1的字符串将截取第一个字符；
 *=================================================================================*/
$$.padStr=function(str, dir, len, c)
{
    if(str && dir && len && c)
    {
	    var strLen = this.length;
	    if(strLen < len)
	    {
	        var pad = "";
	        c = (c.charAt(0) == "&" && c.length > 1) ? c : c.charAt(0);
	        len = len - strLen;

	        for(var i = 0; i < len; i++)
	        {
	            pad += c;
	        }
	        if(dir == "l")
	        {
	        	return pad + str;
	        }
	        return  str + pad;
	    }
    }
    return str;
}

//$$.strDup()方法用于返回n个目标字符串的拼接结果，返回值类型string
/*----------------------------------
 *编写者：Jerry_小猪
 *QQ：569320261
 *创作日期：2011-09-04
 *修改日期：2011-09-04
 *----------------------------------
 *参数说明：
 *1. str：（类型：string，必备）目标字符串；
 *2. len：（类型：number，必备）需要拼接的次数；
 *=================================================================================*/
$$.strDup = function(str, len)
{
	var c = "";
	var result = "";

	if(str && len)
	{
		for(var i = 1; i < len; i++)
		{
			c += str;
		}
		result = str + c;
	}
	return result;
}




/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 浏览器Browser对象的方法及属性扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 浏览器Browser对象的方法及属性扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

//创建$$B对象用来保存浏览器的相关信息
/*----------------------------------
 *说明：在实际编码过程中，有时不得不针对不同的浏览器采取不同的解决措施来解决相同的问题，此变量主要用来甄别浏览器名称和版本！
 *----------------------------------
 *编写者：Jerry_小猪
 *QQ：569320261
 *创作日期：2011-09-03
 *修改日期：2011-09-03
 *=================================================================================*/
var $$B = (function(ua){
	var b = {
		name: "",
		version: ""
	};

	var isIE = b.name == "msie";
	//对IE浏览器做版本鉴定的补充，因为在高版本的IE浏览器中（如IE9）如果切换至低版本模式工作，则浏览器字符串中关于版本的描述依旧是高版本浏览器的版本号。
	if(isIE && !window.XMLHttpRequest){
		//注：IE6不支持XMLHttpRequest对象
    	b.version = "6";
    	b.isIE6 = true;
	}
	if(isIE && window.XMLHttpRequest && !("hasAttribute" in document.createElement("div"))){
	    //注：IE6/7不支持hasAttribute方法
	    b.version = "7";
	    b.isIE7 = true;
	}
	if(!document.getSelection && ("hasAttribute" in document.createElement("div"))){
	    //注：IE6/7/8不支持document.getSelection
	    b.version = "8";
	    b.isIE8 = true;
	}
	return b;
})(navigator.userAgent.toLowerCase());

//使IE浏览器兼容HTML5标签
/*----------------------------------
 *说明：截止2012-09-03，Firefox、Chrome、IE9等高级浏览器均以支持基本的HTML5标签，但是在IE8及更低版本的IE浏览器中无法得到支持。
 *      在IE中，只需要通过document.createElement()方法创建一个未知的HTML元素，就可以正常使用IE本身未支持的标签了。
 *----------------------------------
 *编写者：Jerry_小猪
 *QQ：569320261
 *创作日期：2011-09-03
 *修改日期：2011-09-03
 *=================================================================================*/
if($$B.isIE6 || $$B.isIE7 || $$B.isIE8)
{
    var tags="header,footer,aside,article,section,hgroup,nav,menu,canvas,output,dialog,datalist,details,figure,figcaption,audio,video,progress,mark,time".split(",");
    for(var i=0;i<tags.length;i++)
    {
	    document.createElement(tags[i]);
    }
}

//解决IE6浏览器下不缓存背景图片的Bug
/*----------------------------------
 *说明：我们通常需要使用CSS来进行背景图片的设置，但这样在IE6下有一个Bug，那就是IE6默认情况下不缓存背景图片，所以当鼠标在有CSS背景的元素上移动时，图片会闪烁甚至鼠标会出现忙的状态。
 *      解决方案一：在CSS中加入如下样式：html { filter: expression(document.execCommand(”BackgroundImageCache”, false, true)); }
 *      使用上述方案可能会使整个页面的加载变得很慢，所以推荐使用JS来修正这个Bug。  
 *----------------------------------
 *编写者：Jerry_小猪
 *QQ：569320261
 *创作日期：2011-09-03
 *修改日期：2011-09-03  
 *=================================================================================*/
if($$B.isIE6)
{
	try {
		document.execCommand("BackgroundImageCache", false, true);
	} catch(e) {}
}



/*=============================================================================================================================//
 *文档DOM对象的方法及属性扩展
 */
//================================
//判断一个HTML元素中是否包含指定的子元素
/*=================
 *说明：为HTML对象添加contains方法，用来判断父元素中是否包含目标子级元素（注：IE中已支持HTML标签对象的contains方法！）
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-05-08
 *修改时间：2012-08-23
 *-----------------------------------
 *参数说明：
 *1. obj: 需要判断的子元素。
 *==================================================*/
if(typeof(HTMLElement) != "undefined")
{
	HTMLElement.prototype.contains = function(obj)
	{
		while(obj != undefined)
		{
			if(obj == this){
				return true;
			}
			obj = obj.parentNode;
		}
		return false;
	}
}




/*=============================================================================================================================//
 *数组Array对象的方法及属性扩展
 */
Array.prototype.indexOf = function(val)
{
    //返回目标数组中指定值第一次出现所在的位置，不存在则返回-1
    var result = -1;
	for(var i = 0; i < this.length; i++)
	{
		if(this[i] == val){
			result = i;
			break;
		}
	}
	return result;
}
Array.prototype.remove = function(val)
{
    //删除数组中的指定值，仅只删除第一次所出现的位置。
	var idx = this.indexOf(val);
	if(idx != -1)
	{
		this.splice(idx,1);
	}
}

//================================
//将目标NodeList转换为静态的Array
/*=================
 *说明：节点集合NodeList会随着DOM的更改而被更新，在某种情况下不好控制，需要转换为静态数组后再行处理。
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-08-13
 *修改时间：2012-08-13
 *-----------------------------------
 *参数说明：
 *1. eles: 需要被转换的NodeList对象。
 *==================================================*/
$$.toArray = function(eles)
{
	var arr = [];
	try
	{
		//在非IE浏览器中进行操作，IE浏览器不支持该方法
		arr = Array.prototype.slice.call(eles);
	}
	catch(e)
	{
		//在IE中采用循环赋值的方式来进行
		for(var i = 0, l = eles.length; i < l; i++)
		{
			// arr.push(eles[i]);//在IE中使用索引扩展数组的方式比使用push方法的效率要高些
			arr[i] = eles[i];
		}
	}
	return arr;
}



/*=============================================================================================================================//
 *数学Math对象的方法及属性扩展
 */




/*=============================================================================================================================//
 *正则表达式RegExp对象的方法及属性扩展
 */





/*=============================================================================================================================//
 *效果扩展
 */
