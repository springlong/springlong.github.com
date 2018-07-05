//用于生成jsApp对象的一个实例
var jsApp = function(id)
{
	return new jsApp.fn.init(id);
};
var ja = $$ = jsApp;

//构建基类jsApp对象
jsApp.fn = jsApp.prototype = {
	//============================================================================================================================//
	//用于初始化jsApp对象实例
	init: function(id)
	{
		this.node = (typeof(id) === "string") ? document.getElementById(id) : id;
	},
	//============================================================================================================================//
	//获取对象的目标样式或属性
	/*=================
	 *说明：在Javascript中，如果我们首次使用style对象获取一个元素的相关样式属性，往往得不到正确的结果，结果往往为空。这是因为style对象中的属性并不是实时更新的，即使目标元素通过CSS设置了该属性，在第一次通过style对象获取该属性时也无法捕捉到该属性的值。
	 *作者：龙泉
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
	getStyle:function(styleName)
	{
	    var obj = this.node;
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
	//============================================================================================================================//
	//对目标对象的样式或属性进行赋值
	/*=================
	 *说明：opacity属性值的取值为0~1
	 *作者：龙泉
	 *QQ：569320261
	 *创作时间：2012-03-18
	 *修改时间：2012-03-18
	 *		  ：2012-07-13：当设置opacity属性时，filter滤镜透明仅针对IE6、7、8；
	 *-----------------------------------
	 *参数说明：
	 *1. styleName: 样式名称（如：“fontSize”、“fontFamily”、“marginLeft”、“opacity”）
	 *2. value: 样式值
	 *==================================================*/
	setStyle:function(styleName, value)
	{
	    var obj = this.node;
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
	},

	//============================================================================================================================//
	//设置或获取HTML元素的CSS属性
	css:function(){

	},

	//============================================================================================================================//
	//设置或获取HTML元素的标签属性
	attr:function(){

	},

	//============================================================================================================================//
	//监听器的操纵
	/*=================
	 *目标：简化IE非标准事件模型的操作
	 *说明：在IE6/7/8中的事件模型和标准的事件模型的操作方式截然不同，为了简化每次的繁杂操作，必须有一个绝对“标准”的操作方式来维护这种繁杂的操作！（注：IE9已支持标准的事件模型）
	 *注意：1. 	在IE6/7/8浏览器的事件绑定的函数中，this指针指向的是window而非目标对象，其他浏览器则表现正常，this指针指向目标对象；
	         	为了兼容IE中的这种不常规行为，在绑定函数中需要通过如下两条语句来表示目标对象：var e = e || window.event; var obj =  e.target || e.srcElement;

	        2. 	在IE非标准事件模型中，事件名称以带“on”的“onclick”、“onload”等形式表示，而在标准的事件模型中，则以不带“on”的“click”、“load”等形式表示。
	 *作者：Jerry_小猪
	 *QQ：569320261
	 *创作时间：2011-11-12
	 *修改时间：2011-11-12;
	 *			2012-05-23;
	 *			2012-11-03：更改代码方式以符合jsApp对象的使用
	 *==================================================*/

	//添加事件监听器
	/*----------------------------------
	 *参数说明：
     *1. eventName: （类型：string，必备）事件名称（必须是如下形式：scroll、click、dblclick）
     *2. func:      （类型：object，必备）事件触发所需执行的函数
     *3. isCapture: （类型：boolean，可选）是否进行事件捕捉（在IE的非标准事件模型中不支持事件捕捉！）
     *--------------------------------------------------------------------------------------------------------------------*/
	bind:function(eventName, func, isCapture){
		var obj = this.node;
		"addEventListener" in document ? obj.addEventListener(eventName, func, isCapture) : obj.attachEvent("on" + eventName, func);
        return func;
	},

	//事件监听器的删除
	/*----------------------------------
	 *参数说明：
	 *参数说明：
     *1. eventName: （类型：string，必备）事件名称（必须是如下形式：scroll、click、dblclick）
     *2. func:      （类型：object，必备）事件触发所需执行的函数
     *3. isCapture: （类型：boolean，可选）是否进行事件捕捉(说明：之所以在这里需要指明“是否进行捕捉”参数，是因为同一个监听器可以使用不同的捕捉参数注册两次！）
     *--------------------------------------------------------------------------------------------------------------------*/
	unbind:function(eventName, func, isCapture){
		var obj = this.node;
		"removeEventListener" in document ? obj.removeEventListener(eventName, func, isCapture) : obj.detachEvent("on" + eventName, func);
	},

	//防止事件冒泡（参数e: 传递过来的事件对象）
	stopPropagation:function(e){
	    e = (e) ? e : window.event;
	    if("stopPropagation" in e){
	        e.stopPropagation();	//标准DOM事件模型
	    }else{
	        e.cancelBubble = true;  //IE的非标准DOM事件模型
	    }
	},

	//兼容firstChild属性的获取，返回值类型：object
	//无目标节点则返回null
	//说明：在IE9、Firefox、Opera、Chrome、Safari浏览器中，如果使用childNodes、firstChild、lastChild、previousSibling和nextSilbing属性访问目标对象的相关信息时，空格位也算是一个文本节点(说明：只要两个标签之间存在空格间隙，包括回车符、制表符，且无论存在多少个，都算是一个空格位)；而在IE6/7/8中，则不存在这种现象！
	firstChild: function()
	{
		var ele = this.node.firstChild;
		while(ele !== null && ele.nodeName === "#text")
		{
			ele = ele.nextSibling;
		}
		return ele;
	},

	//兼容lastChild属性的获取，返回值类型：object
	//无目标节点则返回null
	lastChild: function()
	{
		var ele = this.node.lastChild;
		while(ele !== null && ele.nodeName === "#text")
		{
			ele = ele.previousSibling;
		}
		return ele;
	},

	//兼容previousSibling属性的获取，返回值类型：object
	//无目标节点则返回null
	prev: function()
	{
		var ele = this.node.previousSibling;
		while(ele !== null && ele.nodeName === "#text")
		{
			ele = ele.previousSibling;
		}
		return ele;
	},

	//兼容nextSibling属性的获取，返回值类型：object
	//无目标节点则返回null
	next: function()
	{
		var ele = this.node.nextSibling;
		while(ele !== null && ele.nodeName === "#text")
		{
			ele = ele.nextSibling;
		}
		return ele;
	},

	//兼容childNodes属性的获取，返回值类型：object
	children: function()
	{
		return this.node.children;
	},

	//兼容parentNode属性的获取，返回值类型：object
	//无目标节点则返回null
	parent: function()
	{
		return this.node.parentNode;
	},

	//封装对innerHTML的访问和赋值（说明：如果没有参数则表示获取innerHTML属性值，否则为修改innerHTM文本）
	/*----------------------------------
	 *参数说明：
	 *1. str：（类型：string，可选）需要添加的innerHTML文本；
	 *=================================================================================*/
	html: function(str)
	{
		if(str)
		{
			this.node.innerHTML = str;
		}
		else
		{
			return this.node.innerHTML;
		}
		return this;
	},

	//封装对innerText的访问和赋值（说明：如果没有参数则表示获取innerText属性值，否则为修改innerHTML属性值）
	//
	/*----------------------------------
	 *参数说明：
	 *1. str：（类型：string，可选）需要添加的innerHTML文本；
	 *=================================================================================*/
	text: function(str)
	{
		var obj = this.node;
		if(str)
		{
			obj.innerHTML = str;
		}
		else
		{
			return (obj.innerText || obj.textContent);
		}
		return this;
	}
}
jsApp.fn.init.prototype = jsApp.fn;


/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 浏览器Browser对象的方法及属性扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 浏览器Browser对象的方法及属性扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

//创建$browser对象用来保存浏览器的相关信息以及与浏览器本身相关的方法。
/*----------------------------------
 *说明：在实际编码过程中，有时不得不针对不同的浏览器采取不同的解决措施来解决相同的问题，此变量主要用来甄别浏览器名称和版本！
 *		由于浏览器提供了修改userAgent的功能，所以完全使用userAgent来甄别浏览器已不是完全合理，在这里还需要加上各浏览器的独特特性来进行判断。
 *		各浏览器userAget略见如下：
 *		IE：Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 6.1; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; BOIE9;ZHCN)
 *		Firefox：Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20100101 Firefox/14.0.1
 *		Chrome：Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.77 Safari/537.1
 *		Safari：Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
 *		Opera：Opera/9.80 (Windows NT 6.1; U; zh-cn) Presto/2.10.289 Version/12.02
 *----------------------------------
 *编写者：龙泉
 *QQ：569320261
 *创作日期：2012-10-16
 *修改日期：2012-10-16
 *=================================================================================*/
var $$browser = {

	//浏览器名称（类型：String）
	name: "",

	//浏览器版本（类型：Stromg）
	version: "",

	//是否支持Flash播放（类型：Boolean）
	canFlash: function()
	{
		var canFlash = false,
			plugins = navigator.plugins;

		if(window.ActiveXObject)
		{
			//For IE
			try
			{
				//下一行语句如果没有Flash组件，则无法完成创建操作，将会抛出“Automation 服务器不能创建对象”异常
				new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); 
				canFlash = true;
			}
			catch(e){}
		}
		else if(plugins)
		{
			//For Firefox、Chrome、Safari、Opera
			for(var i = 0, len = plugins.length; i < len; i++)
			{
				if(plugins[i].name.toLowerCase().indexOf("shockwave flash") !== -1)
				{
					canFlash = true;
					break;
				}
			}
		}

		return canFlash;
	},

	//设为首页
	/*----------------------------------
	 *说明：通常我们都会在网站头部某个位置加上一个“设为首页”的功能，但是没有一个全部兼容的设为首页的方法，所以在此创建一个函数将兼容性处理方法包装起来。
	 *		当然，以下代码是我参考网上的代码示例，经过修改后的结晶。		
	 *=================================================================================*/
	setHome: function()
	{
	    try
	    {
			//针对IE浏览器(setHomePage的参数必须是一个完整的网站地址才能正常触发设为首页操作)
	        document.body.style.behavior = 'url(#default#homepage)';
	        document.body.setHomePage(location.href);
	    }
	    catch(e)
	    {
	    	//暂时没有找到兼容其他浏览器的方法，在此使用提供功能代替（ASCII码字符：您的浏览器需要手动设置首页。如需获取帮助，请参见“如何把百度设为您的上网主页”！）
	        var ok = confirm("\u60a8\u7684\u6d4f\u89c8\u5668\u9700\u8981\u624b\u52a8\u8bbe\u7f6e\u9996\u9875\u3002\u5982\u9700\u83b7\u53d6\u5e2e\u52a9\uff0c\u8bf7\u53c2\u89c1\u201c\u5982\u4f55\u628a\u767e\u5ea6\u8bbe\u4e3a\u60a8\u7684\u4e0a\u7f51\u4e3b\u9875\u201d\uff01")
	        if(ok)
	        {
	        	window.open("http://www.baidu.com/cache/sethelp/index.html", "_blank");
	        }
	    }
	},

	//加入收藏
	/*----------------------------------
	 *说明：基本上（只测试了常用的浏览器，少数浏览没有测试）浏览器将当前页面加入到收藏夹的快捷键是Ctrl+D，但为了吸引用户执行这项操作，
	 *		通常在页面的某个位置放置了一个类似“加入收藏”的链接。在Firefox和Opera中让该链接的rel="sidebar"可以实现该操作，但是存在瑕疵，
	 *		所以还是使用JS来执行该操作比较好！
	 *=================================================================================*/
	addFavorite: function()
	{
		try
		{
			//针对IE进行添加操作
			//注：由于安全设置问题，本地文件中没有权限执这行代码。另外在IE中，无法直接执行addFavorite方法，需要通过dom节点的相关事件才能正常触发，
			//	  而以IE为内核的360，搜狗等浏览器却可以正常被触发。
			window.external.addFavorite(location.href, document.title);
		}
		catch(e)
		{
			try
			{
				//针对Firefox进行添加操作
				//注意：addPanel方法要求网址信息必须是一个绝对且有效的网站地址，所以在本地文件进行测试将无法看到效果
				window.sidebar.addPanel(document.title, location.href, "");
			}
			catch(e)
			{
				//如果是其他浏览器，则提示按Ctrl+D进行添加操作（ASCII码字符：添加收藏没有成功，可使用Ctrl+D继续完成操作！）
				alert("\u6dfb\u52a0\u6536\u85cf\u6ca1\u6709\u6210\u529f\uff0c\u53ef\u4f7f\u7528Ctrl+D\u7ee7\u7eed\u5b8c\u6210\u64cd\u4f5c\uff01");
			}
		}
	}
};

//获取浏览器信息以及针对相关浏览器处理兼容性操作。
(function(ua){

	//先通过userAgent字符串获取浏览器名称和版本
	var match = /ms(ie) ([\d.]+)/.exec(ua) || 
				/(firefox)\/([\d.]+)/.exec(ua) ||
				/(opera).*version\/([\d.]+)/.exec(ua) ||
				/(chrome)\/([\d.]+) safari\/([\d.]+)/.exec(ua) ||
				/apple(webkit).*version\/([\d.]+) safari/.exec(ua) ||
				[],
		name = match[1] || "",
		version = match[2] || "",
		canFlash = false;

    if(name !== "chrome" && name === "webkit")
	{
		name = "safari";
	}
	
	//再通过浏览器独有的特性以确保所获取的信息尽可能地正确
	if(window.ActiveXObject)
	{
		//说明：对IE浏览器做版本鉴定的补充，因为在高版本的IE浏览器中（如IE9）如果切换至低版本模式工作，则浏览器字符串中关于版本的描述依旧是高版本浏览器的版本号。
		//	 	为了兼容相关JS脚本的工作，必须将当前运作模式的浏览器版本保存正确。
		//注：仅IE浏览器支持window.ActiveXObject属性
		name = "ie";

		if(!window.XMLHttpRequest)
		{
			//注：IE6不支持XMLHttpRequest对象
	    	version = "6.0";
		}
		else if(window.XMLHttpRequest && !("hasAttribute" in document.createElement("div")))
		{
		    //注：IE6/7不支持hasAttribute方法
	    	version = "7.0";
		}
		else if(!document.getSelection && ("hasAttribute" in document.createElement("div")))
		{
		    //注：IE6/7/8不支持document.getSelection
	    	version = "8.0";
		}
	}
	else if(window.opera)
	{
		//注：Opera浏览器有一个专门的浏览器标志，就是window.opera属性。
		name = "opera";
	}
	
	//使IE浏览器兼容HTML5标签
	/*----------------------------------
	 *说明：截止2012-09-03，Firefox、Chrome、IE9等高级浏览器均已支持基本的HTML5标签，但是在IE8及更低版本的IE浏览器中无法得到支持。
	 *      在IE中，只需要通过document.createElement()方法创建一个未知的HTML元素，就可以正常使用IE本身未支持的标签了。
	 *=================================================================================*/
	var isIE = name === "ie",
		browserV = parseInt(version);
	if(isIE && browserV <= 8)
	{
	    var tags = "header,footer,aside,article,section,hgroup,nav,menu,canvas,output,dialog,datalist,details,figure,figcaption,audio,video,progress,mark,time".split(",");
	    for(var i = 0, len = tags.length; i < len; i++)
	    {
		    document.createElement(tags[i]);
	    }
	}

	//解决IE6浏览器下不缓存背景图片的Bug
	/*----------------------------------
	 *说明：我们通常需要使用CSS来进行背景图片的设置，但这样在IE6下有一个Bug，那就是IE6默认情况下不缓存背景图片，CSS里每次更改图片的位置时都会重新发起请求，所以当鼠标在有CSS背景的元素上移动时，图片会闪烁甚至鼠标会出现忙的状态。
	 *      解决方案一：在CSS中加入如下样式：html { filter: expression(document.execCommand(”BackgroundImageCache”, false, true)); }
	 *      使用上述方案可能会影响整个页面的加载速度，所以推荐使用JS来修正这个Bug。  
	 *=================================================================================*/
	if(isIE && browserV === 6)
	{
		try
		{
			document.execCommand("BackgroundImageCache", false, true);
		}
		catch(e){}
	}

	//对$browser赋值
	$$browser.name = name;
	$$browser.version = version;

})(navigator.userAgent.toLowerCase());


/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 字符串String对象的方法及属性扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 字符串String对象的方法及属性扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

//trim()方法用于去除目标字符串中的首尾空格，返回值类型：string
/*----------------------------------
 *编写者：龙泉
 *QQ：569320261
 *创作日期：2012-09-04
 *修改日期：2012-09-04
 *----------------------------------
 *参数说明：
 *1. str：（类型：string，必备）目标字符串，如果缺少该参数则会返回undefined；
 *2. all：（类型：boolean，可选）是否移除所有空格；
 *=================================================================================*/
jsApp.strTrim = function(str, all){
	if(str && typeof(str) === "string"){
		if(all){
			return str.replace(/\s/g, ""); 
		}
		return str.replace(/^\s*|\s*$/g, "");
	}
}

//padStr()方法用于填充字符以使目标字符串达到指定长度，返回值类型：string
//如果指定的长度小于目标字符串的长度，则返回原目标字符串
/*----------------------------------
 *编写者：龙泉
 *QQ：569320261
 *创作日期：2012-09-04
 *修改日期：2012-09-04
 *----------------------------------
 *参数说明：
 *1. str：（类型：string，必备）目标字符串；
 *2. dir：（类型：string，必备）填充的方向，"left"——左填充，"right"——右填充；
 *3. len：（类型：number，必备）目标显示长度；
 *4. c：（类型：string，必备）用来进行填充的字符，如果是以&开头且长度大于1的字符串作为特殊HTML编码字符来使用，如果不是以&开头且长度大于1的字符串将截取第一个字符；
 *=================================================================================*/
jsApp.strPad = function(str, dir, len, c){
    if(str && dir && len && c){
	    var strLen = str.length;
	    if(strLen < len){
	        var pad = "";
	        c = (c.charAt(0) === "&" && c.length > 1) ? c : c.charAt(0);
	        len = len - strLen;

	        for(var i = 0; i < len; i++){
	            pad += c;
	        }
	        if(dir === "left"){
	        	return pad + str;
	        }
	        return  str + pad;
	    }
    }
    return str;
}

//strDup()方法用于返回len个目标字符串的拼接结果，返回值类型：string
//如果缺少参数则结果返回""
/*----------------------------------
 *编写者：龙泉
 *QQ：569320261
 *创作日期：2012-09-04
 *修改日期：2012-09-04
 *----------------------------------
 *参数说明：
 *1. str：（类型：string，必备）目标字符串；
 *2. len：（类型：number，必备）需要拼接的次数；
 *=================================================================================*/
jsApp.strDup = function(str, len){
	var c = "";
	var result = "";

	if(str && len){
		for(var i = 1; i < len; i++){
			c += str;
		}
		result = str + c;
	}
	return result;
}



/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< Cookie操作指南 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< Cookie操作指南 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

//添加cookie或者重新给cookie赋值
//对已有cookie的更改操作就是对该cookie的重新赋值，
/*----------------------------------
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-05-12;
 *修改时间：2012-05-12;
 *----------------------------------
 *参数说明：
 *1. name: 需要添加的cookie名称;
 *2. value: 为cookie指定的值;
 *3. expires: 指定当前cookie多长时间后失效（单位：分），默认为回话结束后失效。
 *4. path: 指定可访问cookie的目录名称，默认值为“/”。 假使cookie创建时的页面地址为http://www.xxx.com/syc/ts.html,那么在默认情况下该cookie仅能供sys目录下及其子级目录下的页面进行访问，像http://www.xxx.com/why/jjs.html这样的页面将无法访问该cookie，如果需要使why目录下的页面也能正常访问，则需要将path属性设置为“path=/why”，而如果需要使该网站的所有页面都有权限访问该cookie，则需要将path属性设置为网站根目录，即“path=/”。 说明：一个页面可以根据path路径的不同而创建多个具有相同名称的cookie。
 *5. domain: 指定可访问cookie的主机名，默认值为空。 默认情况下，二级域名之间创建的cookie是不能相互被访问的。比如yes.xxx.com访问不了www.xxx.com域名下创建的cookie，如果需要实现二级域名之间能够互相被访问，则需要设置domain属性值为“domain=.xxx.com”，这样才能保证hyck.xxx.com、osp.xxx.com、yes.xxx.com等域名下的网页也能够正常访问www.xxx.com域名下网页所创建的cookie。 （说明：在www.xxx.com下创建一个cookie时，如果为该cookie的domain值指定为其他二级域名，那么该cookie将创建失败！）
 *6. secure: 用于设置安全性。 默认情况下，使用http协议连接的页面即可访问该cookie；当设置了该属性后（该属性的属性值可以为任何字符，包括""），则只有通过https或者其它安全协议连接的页面才能访问该cookie。
 *------------------------------------------------------------*/
jsApp.setCookie = function(name, value, expires, path, domain, secure){
	var str = name + "=" + escape(value) + ";path=" + (path === undefined ? "/" : path) + (domain === undefined ? "" : ";domain=" + domain) + (secure === undefined ? "" : ";secure=")  //说明：必须对cookie值进行escape编码处理，从而使空格、汉字、特殊字符呈如“%20”的形式进行保存。
	if(expires > 0){
		var e_date = new Date();
		e_date.setMinutes(e_date.getMinutes() + parseInt(expires));
		str += ";expires=" + e_date.toGMTString();		//过期时间值必须是GMT时间格式，通过toGMTString()方法即可将一个时间值转换为GMT格式;
	}
	document.cookie = str;
}

//获取指定cookie的值，返回值类型：string
//如果没有目标名称的cookie，则返回null
/*----------------------------------
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-05-12;
 *修改时间：2012-05-12;
 *----------------------------------
 *参数说明：
 *1. name: 需要获取的cookie名称;
 *----------------------------------------------------------------------------*/
jsApp.getCookie = function(name){
    var reg = new RegExp(name + "=([^;]*)");
    var result = reg.exec(document.cookie);
    return result ? unescape(result[1]) : null;	//在返回数据时，必须将编码的源数据解码。
}

//删除指定名称的cookie
//通过将cookie的过期时间设置为一个过去的时间值即可将该cookie删除。
/*----------------------------------
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-05-12;
 *修改时间：2012-05-12;
 *----------------------------------
 *参数说明：
 *1. name: 需要删除的cookie名称;
 *2. path: 添加cookie时所设置的目录名称,默认值为“/”。因为一个页面可以根据path路径的不同而创建多个具有相同名称的cookie，所以在删除的时候也必须指明path路径。（说明：将path参数值指定为“/”，将无法删除path值为“/xxx”创建的cookie，如果需要删除该cookie，则必需指定delCookie方法的path参数值也为“/xxx”。）
 *3. domain: 添加cookie时所设置的主机名称，默认值为空。因为一个页面可以根据domain值的不同而创建多个具有相同名称的cookie，所以在删除的时候也必须指明domain值。
 *----------------------------------------------------------------------------*/
jsApp.delCookie = function(name, path, domain){
	var e_date = new Date();
	e_date.setTime(e_date.getTime() - 100);
	document.cookie = name + "=;expires=" + e_date.toGMTString() + ";path=" + (path === undefined ? "/" : path) + (domain === undefined ? "" : ";domain=" + domain);
}




/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< DOM元素操作的扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< DOM元素操作的扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

//判断一个HTML元素中是否包含指定的子元素
/*----------------------------------
 *说明：为HTML对象添加contains方法，用来判断父元素中是否包含目标子级元素
 *		IE中已支持HTML标签对象的contains方法，且IE浏览器不支持HTMLElement对象
 *----------------------------------
 *作者：龙泉
 *QQ：569320261
 *创作时间：2012-05-08
 *修改时间：2012-08-23
 *-----------------------------------
 *参数说明：
 *1. obj: 需要判断的子元素。
 *==================================================*/
if(typeof(HTMLElement) !== "undefined"){
	HTMLElement.prototype.contains = function(obj){
		while(obj !== null){
			if(obj === this){
				return true;
			}
			obj = obj.parentNode;
		}
		return false;
	}
}



//============================================================================================================================//
//获取目标元素是否处于显示状态，即元素本身以及其父级元素没有处于“display:none” 或 “visibility:hidden”状态。
/*=================
 *目标：获取目标元素是否处于显示状态
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2011-11-12
 *修改时间：2011-11-12
 *--------------------------------
 *参数说明：
 *1. id: 目标对象引用或ID属性值
 *==================================================*/
jsApp.isShow = function(id)
{
    var ele = $$(id);
    if(ele)
    {
        var result = true;
        while(ele.parentNode != document.body)
        {
            if(Extend.getCurrentStyle(ele, "display") == "none" || Extend.getCurrentStyle(ele, "visibility") == "hidden")
            {
                result = false;
                break;
            }
            ele = ele.parentNode;
        }
        return result;
    }
}

//============================================================================================================================//
//用于获取当前页面鼠标选择的文本值
/*=================
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-06-26
 *修改时间：2012-06-26;
 *---------------------------------*/
jsApp.getSelection = function(){
	var str = (document.selection) ? document.selection.createRange().text : document.getSelection();
	return str + "";	//如果不使用该语句返回值，将返回selection的引用。
}


/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< Array对象操作的扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< Array对象操作的扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

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
 *作者：龙泉
 *QQ：569320261
 *创作时间：2012-08-13
 *修改时间：2012-08-13
 *-----------------------------------
 *参数说明：
 *1. eles: 需要被转换的NodeList对象。
 *==================================================*/
jsApp.toArray = function(eles)
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


/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< Math对象操作的扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< Math对象操作的扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

/*=============================================================================================================================//
 *数学Math对象的方法及属性扩展
 */



/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< RegExp对象操作的扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< RegExp对象操作的扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

/*=============================================================================================================================//
 *正则表达式RegExp对象的方法及属性扩展
 */




/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 效果扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&< 效果扩展 >&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

/*=============================================================================================================================//
 *功能扩展
 */


/*=====================================================================
 *动画
 */
jsApp.prototype.animate = function(attrs, params, callback, delay)
{
	//============================================================================================================================//
	//动画外部参数传递接口
	/*=================
	 *目标：通过调用该方法，将动画相关参数传递给动画参数的配置接口；
	 *作者：龙泉
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
 	var obj = this.node;
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
	 *作者：龙泉
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



//返回顶部(未作测试，未完成)
//当浏览器文档显示区低于1024px时，不显示“返回顶部”按钮
/*----------------------------------
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-11-12;
 *修改时间：2012-11-12;
 *----------------------------------
 *参数说明：
 *1. func：（类型：function，可选）当点击按钮时，执行的附加操作；
 *----------------------------------------------------------------------------*/
jsApp.backToTop = function(func){
    var docWidth = document.documentElement.clientWidth;
    if(docWidth > 1024){
	    //创建“返回顶部”按钮
        var obj = document.createElement("div");
        obj.id = "backToTop";
        obj.style.display = "none";

        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0);");
        a.setAttribute("target", "_self");
        a.setAttribute("title", "\u8fd4\u56de\u9876\u90e8");    //ASCII编码内容为“返回顶部”。
        a.setAttribute("hidefocus", "true");
        a.onclick = function(){
    	    document.body.scrollTop = 0;
    	    document.documentElement.scrollTop = 0;
		    if(func !== undefined){
			    func.call();
		    }
    	    return false;
        }
        obj.appendChild(a);
        document.body.appendChild(obj);

        //监测按钮是否显示
        jsApp(window).bind("scroll", function(){
	        var top = document.body.scrollTop || document.documentElement.scrollTop;
            obj.style.display = (top > 0) ? "block" : "none";
        });
    }
}