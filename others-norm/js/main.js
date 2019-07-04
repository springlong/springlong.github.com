
//======================================================================================================
//======================================================================================================
jQuery(function($)
{
	/**
     * 将页面滚动条定位至目标位置
     * @param  {Number|jQuery}   pos      需要滚动至的具体位置，也可以传递一个jQuery对象或者jQuery函数调用所支持的选择器字符串来表示目标元素所在的位置
     * @param  {Function} callback 操作完成后的回调函数
     * @return {undefined}         
     */
    $.scrollTo = function(pos, callback)
    {
        //确定目标位置
        if(pos == undefined || pos === "") return;
        var position = typeof pos == "number" ? pos : jQuery(pos).offset().top;

        //获得有效的目标对象（文档scrollTop的设置和获取在不同浏览器中存在差异）
        var oBody = document.body, value = oBody.scrollTop;
        oBody.scrollTop = value + 1;
        oBody.scrollTop === 0 && (oBody = document.documentElement);

        //执行动画（虽然可以使用jQuery("html,body")来绑定事件，但是这样回调函数会被调用两次）
        jQuery(oBody).animate({scrollTop: position}, 600, callback);
    };

	//用于折叠h2、h3、h4
	$("h2").css("cursor", "pointer").click(function()
	{
	    $(this).next().toggle();
	});
	$("h3").css("cursor", "pointer").prepend("<span>-</span>").click(function()
	{
	    $(this).html(function(index, oldhtml)
	    {
	        return oldhtml.indexOf("+") > 0 ? oldhtml.replace("+", "-") : oldhtml.replace("-", "+");
	    }).next().toggle();
	});
	$("h4").css("cursor", "pointer").prepend("<span>-</span>").click(function()
	{
	    $(this).html(function(index, oldhtml)
	    {
	        return oldhtml.indexOf("+") > 0 ? oldhtml.replace("+", "-") : oldhtml.replace("-", "+");
	    }).next().toggle();
	});

	//用于折叠包含类名“expand”的容器
	$("ol.expand, div.expand").prepend("<div class='expand_div'>点击查看</div>").find(".expand_div").click(function()
	{
		var $wrap = $(this).parent();
		if($wrap.height() <= 30)
		{
			$wrap.children().slice(1).show().end().first().html("点击隐藏");
		}
		else
		{
			$wrap.children().slice(1).hide().end().first().html("点击查看");
		}
	}).end().children().not(".expand_div").hide().end().first().html("点击查看");

	//返回顶部
	window.returnToBack = function(func)
	{
	    var $doc = $(document),
	        $win = $(window);

	    if($doc.width() > 1024)
	    {
	        //创建“返回顶部”按钮，ASCII编码内容为——“返回顶部”
	        $(document.body).append('<div id="returnToBack" style="display:none"><a href="#" target="_self" hidefocus="true" title="\u8fd4\u56de\u9876\u90e8"></a></div>');

	        //为按钮添加事件绑定
	        var $returnToBack = $("#returnToBack"),
	            $a = $returnToBack.children().eq(0);

	        $a.click(function()
	        {
	            $win.scrollTop(0);
	            func && func.call();
	            return false;
	        });

	        //监测按钮是否显示
	        $win.bind("scroll", function()
	        {
	            $win.scrollTop() > 0 ? $returnToBack.show() : $returnToBack.hide();
	        });
	    }
	};
	returnToBack();
	
	//生成目录（精确到三级目录，即h4标题）
	!$(document.body).hasClass("no-directory") && (function()
	{
		var $h2_list = $("h2"), htmlStr = "";

		if($h2_list.length < 2) return;

		$h2_list.each(function(index, ele)
		{
			var $ele = $(ele),
				$h3_list = $ele.next().find("h3"),
				listStr_h3 = "";

			$ele.attr("name", "dictory_h2_" + index);
			$h3_list.each(function(index2, ele)
			{
				var $ele = $(ele),
					$h4_list = $ele.next().find("h4"),
					listStr_h4 = "";

				$ele.attr("name", "dictory_h3_" + index + "_" + index2);
				$h4_list.each(function(index3, ele)
				{
					var $ele = $(ele);
					$ele.attr("name", "dictory_h4_" + index2 + "_" + index3);

					listStr_h4 += "<li><a href='#" + $ele.attr("name") + "'>" + $ele.text().substring(1) + "</a></li>";
				});
				listStr_h4 = listStr_h4 === "" ? "" : "<ul>" + listStr_h4 + "</ul>";
				listStr_h3 += "<li><a href='#" + $ele.attr("name") + "'>" + $ele.text().substring(1) + "</a>" + listStr_h4 + "</li>";

			});

			listStr_h3 = listStr_h3 === "" ? "" : "<ul>" + listStr_h3 + "</ul>";
			htmlStr += "<li><a href='#" + $ele.attr("name") + "'>" + $ele.text() + "</a>" + listStr_h3 + "</li>";
		});
		$h2_list.eq(0).before("<div id='dictory'><strong>目录</strong><ul>" + htmlStr + "</ul></div>");
	})();

	//url的hash参数变更，进行定位
	$("#dictory a").click(function()
	{
		var hash = $(this).attr("href");
		$.scrollTo("[name=" + hash.substring(hash.indexOf("#") + 1) + "]");
	});
	location.hash !== "" && setTimeout(function()
	{
		$.scrollTo("[name=" + location.hash.substring(1) + "]");
	}, 0);
});

jQuery(function($)
{        
    //代码着色
    try{
        $("pre.jsCode").snippet("javascript", {style: "custom_js", showNum: false});
        $("pre.jsCodeNum").snippet("javascript", {style: "custom_js"});
        $("pre.htmlCode").snippet("html", {style: "custom_html", showNum: false});
        $("pre.htmlCodeNum").snippet("html", {style: "custom_html"});
        $("pre.cssCode").snippet("css", {style: "custom_css", showNum: false});
        $("pre.cssCodeNum").snippet("css", {style: "custom_css"});   
    }
    catch(e){}
});

//====================================================================================================================
//原型扩展与兼容处理
var arrayPrototype = Array.prototype, stringPrototype = String.prototype;
arrayPrototype.indexOf === undefined && (arrayPrototype.indexOf = function(val, fromIndex)
{
    //返回目标数组中参数val的值第一次出现所在的索引位置，不存在则返回-1。（返回类型：Number）
    //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
    //参数val：（类型：Object）需要检索的值
    //参数fromIndex：（类型：Number，可选）指定开始查找的索引位置（为负数时表示从倒数第几个开始检索）
    var result = -1,
        len = this.length,
        i = typeof fromIndex === "number" ? (fromIndex >= 0 ? fromIndex : len + fromIndex) : 0;

    for(i = (i < 0 ? 0 : i); i < len; i++)
    {
        if(this[i] === val)
        {
            result = i;
            break;
        }
    }
    return result;
});
arrayPrototype.filter === undefined && (arrayPrototype.filter = function(func)
{
    //筛选出原数组中符合条件（即回调函数返回ture时）的所有元素，并以数组形式返回。
    //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
    //回调函数：function(item, i){}
    //回调函数-参数item：当前项的值；
    //回调函数-参数i：当前项的索引值；
    //回调函数-this：window对象；
    var result = [],
        len = this.length,
        i = 0,
        item;

    for(; i < len; i++)
    {
        if(func(item = this[i], i))
        {
            result.push(item);
        }
    }

    return result;
});
arrayPrototype.map === undefined && (arrayPrototype.map = function(func)
{
    //遍历目标数组中的每一个元素，并执行回调函数，最终将回调函数返回的值组合成新的数组返回。
    //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
    //回调函数：function(item, i){}
    //回调函数-参数item：当前项的值；
    //回调函数-参数i：当前项的索引值；
    //回调函数-this：window对象；
    var i = 0, len = this.length, result = [];
    for(; i < len; )
    {
        result[i] = func(this[i], i++);
    }
    return result;
});
arrayPrototype.forEach === undefined && (arrayPrototype.forEach = function(func)
{
    //遍历目标数组中的每一个元素，并执行回调函数。
    //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
    //回调函数：function(item, i){}
    //回调函数-参数item：当前项的值；
    //回调函数-参数i：当前项的索引值；
    //回调函数-this：window对象；
    var i = 0, len = this.length;
    for(; i < len; )
    {
        func(this[i], i++);
    }
});
arrayPrototype.unique === undefined && (arrayPrototype.unique = function()
{
    //返回目标数组去除重复值之后所组成的新数组（不排序，原数组的值不受影响）。
    //该方法在最新版的ECMAScript6中依旧不被支持。
    var output = [],  //最终输出结果
        result = {},  //用于结果判断
        i = 0,
        len = this.length,
        num;

    for(; i < len; )
    {
        num = this[i++];
        if(result[num] === undefined)
        {
            result[num] = 1;     //使用1来表示目标结果已加入新的数组中
            output.push(num);    //保存唯一值
        }
    }
    return output;
});
arrayPrototype.remove = function(val)
{
    //删除原数组中与参数val的值相等的所有元素，并返回原数组（原数组中的值将会受到影响）。
    //该方法在最新版的ECMAScript6中依旧不被支持。
    //参数val：（类型：Object）需要删除的元素值；
    var idx;

    while((idx = this.indexOf(val)) !== -1)
    {
        this.splice(idx, 1);
    }
    return this;
};
window.asc = function(a, b){ return a > b ? 1 : -1; }; //升序
window.desc = function(a, b){ return a < b ? 1: -1; }; //降序
stringPrototype.trim === undefined && (stringPrototype.trim = function()
{
    //去除目标字符串首尾两端的所有空格，并作为新字符串返回
    //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
    return this.replace(/^\s*|\s*$/g, "");
});
stringPrototype.contains === undefined && (stringPrototype.contains = function(match, position)
{
    //判断目标字符串中是否存在检索字符串
    //该方法在ECMAScript6中被提出，目前仅Firefox支持。
    //参数match：（类型：String）需要检索的字符串
    //参数position：（类型：Number，可选）指定开始查找的索引位置，默认为0（非负数时有效，负数时相当于0）
    return typeof(match) == "string" && this.indexOf(match, Number(position)) >= 0;
});
stringPrototype.startsWith === undefined && (stringPrototype.startsWith = function(match, position)
{
    //判断目标字符串是否以检索字符串开头
    //该方法在ECMAScript6中被提出，目前仅Firefox支持。
    //参数match：（类型：String）需要检索的字符串
    //参数position：（类型：Number，可选）指定本次检索中“目标字符串”的起始位置，默认为0（非负数时有效，负数时相当于0）。
    //当position参数大于0时，实际上是将该索引位置及后续的所有字符作为新的“目标字符串”后再做判断
    return typeof(match) == "string" && this.substring(Number(position)).indexOf(match) == 0;
});
stringPrototype.endsWith === undefined && (stringPrototype.endsWith = function(match, position)
{
    //判断目标字符串是否以检索字符串结束
    //该方法在ECMAScript6中被提出，目前仅Firefox支持。
    //参数match：（类型：String）需要检索的字符串
    //参数position：（类型：Number，可选）指定本次检索中“目标字符串”的结束位置，默认为原字符串的长度（当该值小于1时，将返回false）
    //当指定了position参数时，实际上是将该索引位置之前的所有字符作为新的“目标字符串”后再做检索判断
    return typeof(match) == "string" && new RegExp(match + "$").test(position === undefined ? this : this.substring(0, Number(position)));
});
stringPrototype.repeat === undefined && (stringPrototype.repeat = function(count)
{
    //返回目标字符串重复连接的结果（原字符串不受影响）
    //该方法在ECMAScript6中被提出，目前仅Firefox支持。
    //参数count：（类型：Number）指明需要重复连接的次数
    //如果参数为空或者为0，则返回空字符串。
    //如果参数为数字字符串，则作为数字处理。
    return isNaN(count = Number(count)) ? "" : new Array(count + 1).join(this);
});
Date.now === undefined && (Date.now = function(){
    //兼容IE6~8：返回当前日期时间的毫秒级快照
    return new Date().getTime();
});
typeof HTMLElement !== "undefined" && HTMLElement.prototype.contains === undefined && (HTMLElement.prototype.contains = function(element)
{
    //判断当前元素节点的子节点中是存在目标节点，如果是则返回true，否则返回false（同一元素进行比较时将返回true）
    //该方法在IE6+中均已支持，在较老版本的Firefox、Chrome、Opera浏览器中未被支持
    //注意：如果目标参数是一个非DOM对象，那么在IE6~8、Firefox、Presto版Opera浏览器中将导致错误异常
    while(element)
    {
        if(element === this) return true;
        element = element.parentNode;
    }
    return false;
});