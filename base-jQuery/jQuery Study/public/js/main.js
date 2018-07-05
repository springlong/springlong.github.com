//======================================================================================================
//======================================================================================================
jQuery(function($)
{
	//用于折叠h2、h3
	$("h2").css("cursor", "pointer").click(function()
	{
	    $(this).nextUntil("h2").toggle();
	});
	$("h3").css("cursor", "pointer").prepend("<span>-</span>").click(function()
	{
	    $(this).html(function(index, oldhtml)
	    {
	        return oldhtml.indexOf("+") > 0 ? oldhtml.replace("+", "-") : oldhtml.replace("-", "+");
	    }).nextUntil("h3").toggle();
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
	    var $doc = jQuery(document),
	        $win = jQuery(window);

	    if($doc.width() > 1024)
	    {
	        //创建“返回顶部”按钮，ASCII编码内容为——“返回顶部”
	        jQuery(document.body).append('<div id="returnToBack" style="display:none"><a href="#" target="_self" hidefocus="true" title="\u8fd4\u56de\u9876\u90e8"></a></div>');

	        //为按钮添加事件绑定
	        var $returnToBack = jQuery("#returnToBack"),
	            $a = $returnToBack.children().eq(0);

	        $a.click(function()
	        {
	            $.scrollTo(0);
	            func && func.call();
	            return false;
	        });

	        //监测按钮是否显示
	        $win.bind("scroll", function()
	        {
	            $win.scrollTop() > 0 ? $returnToBack.fadeIn() : $returnToBack.fadeOut();
	        });
	    }
	};
	returnToBack();
	
	//生成目录（精确到二级目录，即h3标题）
	(function()
	{
		var $h2_list = $("h2"), htmlStr = "";

		if($h2_list.length < 2) return;

		$h2_list.each(function(index, ele)
		{
			var $ele = $(ele),
				$h3_list = $ele.next().find("h3"),
				listStr = "";

			$ele.attr("name", "dictory_h2_" + index);
			$h3_list.each(function(cur, ele)
			{
				var $ele = $(ele);
				$ele.attr("name", "dictory_h3_" + index + "_" + cur);
				listStr += "<li><a href='#" + $ele.attr("name") + "'>" + $ele.text().substring(1) + "</a></li>";
			});

			if(listStr === "")
			{
				htmlStr += "<li><a href='#" + $ele.attr("name") + "'>" + $ele.text() + "</a></li>";
			}
			else
			{
				htmlStr += "<li><a href='#" + $ele.attr("name") + "'>" + $ele.text() + "</a><ul>" + listStr + "</ul></li>";
			}
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