function $(id)
{
    return typeof(id) === "string" ? document.getElementById(id) : id;
}

var Extend = {};

Extend.addEvent = function(id, eventName, func, isCapture)
{
    /*参数说明：
     *1. id: 目标对象引用或ID属性值
     *2. eventName: 事件名称（必须是如下形式：onscroll、onclick、ondblclick等等，而不能是scroll、onScroll、OnScroll等等。）
     *3. func:      事件触发所需执行的函数
     *4. isCapture: 是否进行事件捕捉（默认值为false，表示不进行事件捕捉；当设置该值为true时，则进行事件的捕捉）
     *--------------------------------------------------------------------------------------------------------------------*/
    var obj = $(id);
    if(obj)
    {
        "addEventListener" in document ? obj.addEventListener(eventName.substring(2, eventName.length), func, isCapture) : obj.attachEvent(eventName, func);
        return func;            //返回执行函数的引用
    }
}

//二级列表的切换显示
function chanelChange(id)
{
    var wrapper = $(id);        //容器
    if(!wrapper)
    {
        return false;
    }

    var child = wrapper.children,
   	    len = child.length,
        child_child, obj, obj2; //循环所需的变量

   	wrapper.sele = -1; 	       //当前默认选中的选项卡索引
   	wrapper.li_cur = 0; 	   //当前打开链接所在的选项卡索引
   	wrapper.li_sele = 0;	   //当前打开链接索引

   	for(var i = 0; i < len; i++)
    {
   		child_child = child[i].children;   //li标签下所有子元素的引用
       	obj = child_child[0];              //li下直属子级a标签的引用
       	obj.i = i;
       	
       	obj.onclick = function()
        {
           	var parent = this.parentNode.parentNode,
               	sele = parent.sele,
                curChild = parent.children[this.i].children; //当前li的子级元素

            //如果“sele”元素为当前元素本身，则设置.sele信息为-1
            if(sele === this.i)
            {
                parent.sele = -1;
                sele = -1;
            }

            //如果.sele信息为-1，则不执行下述语句
           	if(sele !== -1)
            {
                //去掉已有“sele”元素的类名
               	var seleChild = parent.children[sele].children;
               	seleChild[0].className = seleChild[0].className.replace(/\s*sele/g, "");

                //如果当前元素还存在嵌套ul，则去掉ul的“show”类名
               	if(seleChild.length > 1)
                {
               		seleChild[1].className = seleChild[1].className.replace(/\s*show/g, "");
           		}
           	}
           
            //如果“sele”元素不是当前元素本身，则设置当前元素为“sele”元素
           	if(sele !== this.i)
            {
        		curChild[0].className += " sele";
            	if(curChild.length > 1)
            	{
            		curChild[1].className += " show"; //如果当前元素存在嵌套的ul，则将嵌套的ul添加“show”类名
            	}
           		parent.sele = this.i;
           	}

           	//移除嵌套ul中的“sele”类名
           	var cur = parent.li_cur;
           	if(parent.children[cur].children.length > 1)
            {
            	sele = parent.li_sele;
				seleChild = parent.children[cur].children[1].children[sele].children[0];
				seleChild.className = seleChild.className.replace(/\s*sele/g, "");
			}
       	};

        //如果存在嵌套ul元素
       	if(child_child.length > 1)
        {
       		var _li = child_child[1].children;     //嵌套ul元素的子级li元素
       		for(var j = 0, l = _li.length; j < l; j++)
            {
       			obj2 = _li[j].children[0];
       			obj2.i = i;
				obj2.j = j;
			    obj2.onclick = function()
                {
					var parent = this.parentNode.parentNode.parentNode.parentNode,
					   cur = parent.li_cur,
					   sele = parent.li_sele;

    				if(parent.children[cur].children.length > 1)
                    {
    					var childSele = parent.children[cur].children[1].children[sele].children[0];
    					childSele.className = childSele.className.replace(/\s*sele/g, "");
    				}

    				this.className += " sele";
    				parent.li_cur = this.i;
    				parent.li_sele = this.j;
				}
       		}
       	}
   	}
}
chanelChange("asideNav");

//执行代码
// function excuteCode(obj, type)
// {
//     var code, win;

//     if(obj)
//     {
//         code = obj.innerText || obj.textContent;
//         if(type === "js")
//         {
//             code = "<script>" + code + "</script>";
//         }
//         win = window.open();
//         win.document.write(code);
//         win.document.close();
//     }
// }
// (function()
// {
//     var i, len, obj,
//         div = document.getElementsByTagName("div");

//     for(i = 0, len = div.length; i < len; i++)
//     {
//         obj = div[i];
//         if(obj.className.indexOf("js_code") !== -1)
//         {
//             obj.ondblclick = function(e)
//             {
//                 excuteCode(this, "js");
//             }
//         }
//         else if(obj.className.indexOf("html_code") !== -1)
//         {
//             obj.ondblclick = function(e)
//             {
//                 excuteCode(this, "html");
//             }
//         }
//     }    
// })();

//关键字、对象、方法汇总
var codeNameStr = {
    keywords:{
        net: ["using", "namespace", "public", "private", "static", "partial", "protected", "void", "get", "set", "EventArgs", "true", "false", "object", "new", "if", "else", "switch", "case", "default", "while", "do", "for","break", "continue", "return", "with", "got", "try", "catch", "finally", "bool", "char", "string", "sbyte", "short", "int", "long", "byte", "ushort", "uint", "ulong", "float", "double", "decimal", "const", "checked", "is", "this" ],
        js: ["var", "new", "if", "else", "switch", "case", "default", "while", "do", "for","break", "continue", "return", "with", "try", "catch", "finally", "Number", "Boolean", "function", "this", "prototype"]
    },
    object:{
        net: ["Object", "DateTime", "Decimal", "Double", "Single", "UInt64", "Uint32", "UInt16", "Byte", "Int64", "Int16", "SByte", "String", "Char", "Boolean", "Exception", "MessageBox", "SqlConnection", "CommandType", "Parameters", "SqlDataReader ", "CommandBehavior", "SqlDataAdapter ", "SqlCommandBuilder ", "DataSet ", "SqlCommand", "SqlCommandBuilder", "DataView ", "DataRowView ", "CurrencyManager", "OleDbConnection ", "Img"],
        js: ["Object", "String", "Function", "Array", "Date", "Math", "RegExp", "arguments", "window", "screen", "navigator", "history", "location", "document", "XMLHttpRequest", "ActiveXObject" ]
    },
    method:{
        net: ["sizeOf", "CacheImage"],
        js: ["$", "alert", "length", "true", "false", "undefined", "null", "setTimeout", "setInterval", "addEventListener", "attachEvent", "removeEventListener", "detachEvent", "preventDefault", "stopPropagation", "getElementById", "getElementsByTagName"]
    }
};

//着色代码内容替换
function replaceCode(code, html)
{
    code.innerHTML = compatibleCode(html);
}
//着色代码的兼容性处理
function compatibleCode(html)
{
    var reg, match, str;

    //替换回车键，该操作仅在IE6、7、8中有效（因为在IE6、7、8中，重新对innerHTML赋值后回车符与多个连续的空格一起只会显示一个空格）
    reg = /(\r+)/g;
    html = colorCode(html, reg, "<br>");

    //替换<br>标签后的空格为&nbsp;（因为在IE6、7中，重新对innerHTML赋值后会多个连续空格只会显示一个空格）
    reg = /<br>(\s+)/gi;
    do
    {
        match = reg.exec(html);
        if(match !== null)
        {
            str = match[1].replace(/\s{1}/g, "&nbsp;");
            html = html.replace(match[0], "<br>" + str.substring(6, str.length));
        }
    }
    while(match !== null)

    return html;
}

//统一着色处理程序
function colorCode(html, reg, rule)
{
    var i, len, match, replaceStr;
    do
    {
        replaceStr = rule;
        match = reg.exec(html);
        if(match !== null)
        {
            for(i = 1, len = match.length; i < len; i++)
            {
                replaceStr = replaceStr.replace("{" + i + "}", match[i]);
            }
            html = html.replace(match[0], replaceStr);
        }
    }
    while(match !== null)

    return html;
}

//JS和.NET代码着色
function colorJS(html, type)
{
    var i, j, len, arr, reg, match, value;

    //字符串
    reg = /(")([^">]*")/g;
    html = colorCode(html, reg, "<span class='js_str'><span>{1}</span>{2}</span>");

    //关键字
    arr = codeNameStr.keywords[type] || codeNameStr.keywords["js"];
    for(i = 0, len = arr.length; i < len; i++)
    {
        reg = new RegExp("([^\\w>]+)(" + arr[i] + ")([^\\w:]+)", "g");
        html = colorCode(html, reg, "{1}<span class='js_keywords'>{2}</span>{3}");

        reg = new RegExp("^(" + arr[i] + ")(\\W+)", "g");
        html = colorCode(html, reg, "<span class='js_keywords'>{1}</span>{2}");
    }

    //对象
    arr = codeNameStr.object[type] || codeNameStr.object["js"];
    for(i = 0, len = arr.length; i < len; i++)
    {
        reg = new RegExp("([^\\w>]+)(" + arr[i] + ")([^\\w:]+)", "g");
        html = colorCode(html, reg, "{1}<span class='js_object'>{2}</span>{3}");
        
        reg = new RegExp("^(" + arr[i] + ")(\\W+)", "g");
        html = colorCode(html, reg, "<span class='js_object'>{1}</span>{2}");
    }

    //对象的属性及方法
    arr = codeNameStr.method[type] || codeNameStr.method["js"];
    for(i = 0, len = arr.length; i < len; i++)
    {
        reg = new RegExp("([^\\w>]+)(" + arr[i] + ")([^\\w:]+)", "g");
        html = colorCode(html, reg, "{1}<span class='js_method'>{2}</span>{3}");
    }

    //替换注释
    reg = /\r/.test(html) ? /(\/)(\/[^\r]*)/ : /(\/)(\/.*)/;
    html = colorCode(html, reg, "<span class='comments'><span>{1}</span>{2}</span>");

    reg = /\/\*/g;
    html = colorCode(html, reg, "<span class='comments'><span>/</span>*");

    reg = /\*\//g;
    html = colorCode(html, reg, "*<span>/</span></span>");

    return html;
}

//HTML代码着色
(function()
{
    var i, j, z, l, len, reg, arr, code, wrapper, html, match, str, str1, str2, bln, script_i, script_j, div, obj, value,
        info_height = 308,  //限定代码块的高度
        pre = document.getElementsByTagName("pre"); //所有pre标签的集合

    for(i = 0, len = pre.length; i < len; i++)
    {
        code = pre[i];
        wrapper = code.parentNode;
        html = code.innerHTML;

        //逐个条件判断进行代码着色
        //JS代码判断
        if(wrapper.className.indexOf("js_code") !== -1)
        {
            html = colorJS(html, "js");
            replaceCode(code, html);
        }
        //.NET代码判断
        else if(wrapper.className.indexOf("net_code") !== -1)
        {
            html = colorJS(html, "net");
            replaceCode(code, html);
        }
        //HTML代码判断
        else if(wrapper.className.indexOf("html_code") !== -1)
        {
            //HTML标签：<!DOCTYPE html>类型
            html = html.replace("&lt;!DOCTYPE html&gt;", "<span class='label'>&lt;</span><span class='html'>!DOCTYPE</span> <span class='attr'>html</span><span class='label'>&gt;</span>");

            //HTML标签：<?xml ?>和<%@ Page %>类型
            reg = /(&lt;)(\?xml|%@\s{1}[a-z]+)(\s+.*)(\?&gt;|%&gt;)/gi;
            html = colorCode(html, reg, "<span class='label'>{1}</span><span class='html'>{2}</span>{3}<span class='label'>{4}</span>");
            
            //替换内嵌JS
            script_i = 0;
            do
            {
                script_i = html.indexOf("&lt;script&gt;", script_i);
                script_j = html.indexOf("&lt;/script&gt;", script_i);
                bln = script_i !== -1 && script_j !== -1;

                if(bln === true)
                {
                    str1 = html.substring(script_i+14, script_j);
                    str2 = colorJS(str1);

                    html = html.replace(str1, str2);
                    script_i += str2.length + 29;
                }
            }
            while(bln === true)

            //HTML标签：<link  />类型
            reg = /(&lt;)([a-z\.]+)(\s*.*)(\/{1}&gt;)/gi;
            html = colorCode(html, reg, "<span class='label'>{1}</span><span class='html'>{2}</span>{3}<span class='label'>{4}</span>");

            // HTML标签：替换<p title="">类型
            reg = /(&lt;)([a-z1-6\.]+)(\s{1}.*["'])(&gt;)/gi;
            html = colorCode(html, reg, "<span class='label'>{1}</span><span class='html'>{2}</span>{3}<span class='label'>{4}</span>");

            //HTML标签：替换<html>类型
            reg = /(&lt;)([a-z1-6\.]+)(&gt;)/gi;
            html = colorCode(html, reg, "<span class='label'>{1}</span><span class='html'>{2}</span><span class='label'>{3}</span>");

            //HTML标签：替换</html>类型
            reg = /(&lt;\/)([a-z1-6\.]+)(&gt;)/gi;
            html = colorCode(html, reg, "<span class='label'>{1}</span><span class='html'>{2}</span><span class='label'>{3}</span>");

            //HTML属性：替换 name="xxx" 类型
            reg = /\s{1}([a-z-_]+)(=)("[^"]*")/gi;
            html = colorCode(html, reg, " <span class='attr'>{1}</span><span class='equal'>{2}</span><span class='value'>{3}</span>");
            
            //替换注释
            reg = /(\/)(\*.*\*\/)/g;
            html = colorCode(html, reg, "<span class='comments'><span>{1}</span>{2}</span>");

            reg = /&lt;!--/g;
            html = colorCode(html, reg, "<span class='comments'><span>&lt;</span>!--");

            reg = /--&gt;/g;
            html = colorCode(html, reg, "--<span>&gt;</span></span>");

            reg = /&lt;%--/g;
            html = colorCode(html, reg, "<span class='comments'><span>&lt;</span>%--");

            reg = /--%&gt;/g;
            html = colorCode(html, reg, "--%<span>&gt;</span></span>");
          
            //替换CSS属性
            reg = /([;{\s>]+)([a-z-]+):([^;]+);{1}/gi;
            html = colorCode(html, reg, "{1}<span class='css_attr'>{2}</span>:<span class='css_value'>{3}</span>;");

            replaceCode(code, html);
        }

        //代码块超过指定高度后，默认隐藏
        if(code.offsetHeight > info_height && wrapper.className.indexOf("autoHeight") === -1)
        {
            code.style.overflow = "hidden";
            code.style.height = info_height + "px";
            wrapper.style.height = info_height + "px";
            wrapper.className += " height_code";

            div = document.createElement("div");
            div.className = "showMore";
            div.innerHTML = "\u5c55\u5f00\u2193"; //展开↓
            div.info_height = info_height + "px";

            div.onclick = function()
            {
                obj = this.parentNode.children[0];
                if(this.innerHTML === "\u5c55\u5f00\u2193") //展开↓
                {
                    //展开
                    obj.style.height = "auto";
                    this.parentNode.style.height = obj.offsetHeight + "px";
                    this.innerHTML = "\u6536\u8d77\u2191"; //收起↑
                }
                else
                {
                    //收起
                    obj.style.height = this.info_height;
                    this.parentNode.style.height = this.info_height;
                    document.body.scrollTop += this.parentNode.parentNode.getBoundingClientRect().top;
                    document.documentElement.scrollTop += this.parentNode.parentNode.getBoundingClientRect().top;
                    this.innerHTML = "\u5c55\u5f00\u2193"; //展开↓
                }
            }
            wrapper.appendChild(div);
        }
    }
})();

//返回顶部按钮
(function toTop(func)
{
    var docWidth = document.documentElement.clientWidth;
    if(docWidth > 1024)
    {
        //创建“返回顶部”按钮
        var obj = document.createElement("div");
        obj.id = "backToTop";
        obj.style.display = "none";

        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0);");
        a.setAttribute("target", "_self");
        a.setAttribute("title", "\u8fd4\u56de\u9876\u90e8");    //ASCII编码内容为“返回顶部”。
        a.setAttribute("hidefocus", "true");
        a.onclick = function()
        {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            if(func !== undefined)
            {
                func.call();
            }
            return false;
        }
        obj.appendChild(a);
        document.body.appendChild(obj);

        //监测按钮是否显示
        Extend.addEvent(window, "onscroll", function()
        {
            var top = document.body.scrollTop || document.documentElement.scrollTop;
            obj.style.display = (top > 0) ? "block" : "none";
        });
    }
})();

//生成目录
(function()
{
    var i, ele, text,
        h2_list = document.getElementsByTagName("h2"),
        len = h2_list.length,
        dictoryStr = [];

    if(len >= 2)
    {
        for(i = 0; i < len; i++)
        {   
            ele = h2_list[i];
            ele.id = "dictory_" + i;
            dictoryStr.push("<li><a href='#" + ele.id + "'>" + ele.innerHTML + "</a></li>");
        }
        ele = document.createElement("div");
        ele.style.cssText = "overflow:hidden;";
        text = "<div class='dictory'><strong>目录</strong>";
        text += "<ul>" + dictoryStr.join("") + "</ul></div>";
        ele.innerHTML  = text;
        h2_list[0].parentNode.insertBefore(ele, h2_list[0]);
    }   
})();