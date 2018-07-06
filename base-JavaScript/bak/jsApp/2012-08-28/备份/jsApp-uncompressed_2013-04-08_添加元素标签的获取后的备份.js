//版本：1.0.1
//起始时间：2013-01-25
//竣工时间：
//----------------------------
//作者：龙泉（Jerry Sun）
//Q  Q：569320261
//E-mail：yangtuan2009@126.com
//============================
//所有的对象、方法的声明都放到一个匿名函数中进行，是为了防止过多垃圾变量污染Window对象。
//之所在该匿名函数中传递window对象作为参数，是为了在进行压缩时减少字节。
(function(window){

	//声明需要使用到的变量
	var

		//声明document、location、undefined等对象或特殊值的替代变量，一是为了减少使用他们时从window对象中查找所需的时间，二是为了在进行压缩时减少字节。
		document = window.document,
		location = window.location,
		navigator = window.navigator,
		undefined = undefined,

		//用于ready方法存放处理程序集合
		readyList = [],
		
		//事件绑定快捷方式-事件名称集
		eventNames = "mousewheel,mouseover,mousemove,mouseout,mousedown,mouseup,mouseenter,mouseleave,click,dblclick,focus,blur,change,keydown,keypress,keyup,load,unload,beforeunload,resize,scroll,error,contextmenu,hashchange".split(","),
		
		//用于生成jsApp对象的一个实例
		jsApp = function(selector)
		{
			return new jsApp.fn.init(selector);
		},

		//执行readyList列表
		doReady = function()
		{
			jsApp.each(readyList, function(i, callback)
			{
				callback();
			});
			document.addEventListener && document.removeEventListener("DOMContentLoaded", arguments.callee, false);
		},

		//执行检索操作（大部分操作都涉及到DOM元素，所以需要确保万无一失。
		//另外有些操作需要针对一个元素集合的每一个元素都执行操作，这时通过该函数进行统一调配。
		/*----------------------------------
		 *参数说明：
		 *1. match：（类型：object，必备）需要进行检索的对象，这里传递过来的值为jsApp对象实例
		 *2. callback：（类型：function，必备）如果DOM元素存在时需要执行的操作
	     *--------------------------------------------------------------------*/
		map = function(match, callback)
		{
			var ele = match.node, 
				len;
			if(ele)
			{
				len = ele.length;
				if(len !== undefined)
				{
					//当目标对象是一个数组时
					jsApp.each(ele, function(i, obj)
					{
						callback.call(match, obj);
					});
				}
				else if(ele.nodeType || ele === window)
				{
					return callback.call(match, ele);  //确保执行函数中的this依旧为检索对象
				}
			}			
			return match;
		};

	//构建基类jsApp对象
	jsApp.fn = jsApp.prototype = {
		
		//============================================================================================================================//
		//用于初始化jsApp对象实例
		init: function(selector)
		{
			//如果不存在selector参数，或者为""、undefined、null、false、0等值时直接返回实例对象
			if(!selector)
			{
				return this;
			}

			//如果是HTML对象或者window对象
			if(selector.nodeType || selector === window)
			{
				this.node = selector;
			}

			//如果为字符串
			if(jsApp.isString(selector))
			{
				if(/^#[\w-]+$/i.test(selector))
				{
					//根据ID获取（如果目标ID元素不存在则返回null）
					this.node = document.getElementById(selector.substring(1, selector.length));
				}
				else if(/^[a-z]+$/i.test(selector))
				{
					//根据标签元素获取（如果没有目标元素则返回null）
					this.node = document.getElementsByTagName(selector);
				}
			}
			//如果为函数时，则表示在DOM树加载完毕之后执行
			else if(jsApp.isFunction(selector))
			{
				this.ready(selector);
			}
		},

		//============================================================================================================================//
		//设置或获取HTML元素的CSS属性
		//如果属性不存在，则获取样式时返回undefined，而设置样式时则不会返回任何结果
		css: function(name, value)
		{
			return map(this, function(ele)
			{
				var ieOpacity = ele.style.opacity === undefined && name === "opacity", result;
				if(value === undefined)
				{
					result = ieOpacity ? 
					jsApp.ieOpacity(ele) : 
					(ele.currentStyle ? ele.currentStyle[name] : window.getComputedStyle(ele,null)[name]);
					return result === "auto" ? "0px" : result;
				}
				ieOpacity ? jsApp.ieOpacity(ele, value) : (ele.style[name] = value);
				return this;
			});
		},

		//============================================================================================================================//
		//设置或获取HTML元素的标签属性
		//说明：如果获取的属性没有被设置则返回null。
		attr: function(attr, value)
		{
			return map(this, function(ele)
			{
				if(value === undefined)
				{
					return jsApp.getAttrFilter(ele, attr);
				}
				jsApp.setAttrFilter(ele, attr, value);
				return this;
			});
		},

		//============================================================================================================================//
		//移除HTML元素的相关属性
		removeAttr: function(attr)
		{
			return map(this, function(ele)
			{
				attr === "class" ? ele.className = "" : ele.removeAttribute(attr);
				return this;
			});
		},

		//============================================================================================================================//
		//添加类名
		addClass: function(name)
		{
			return map(this, function(ele)
			{
				!this.hasClass(name) && (ele.className += " " + name);
				return this;
			});
		},

		//============================================================================================================================//
		//移除类名
		removeClass: function(name)
		{
			return map(this, function(ele)
			{
				var className = " " + ele.className + " ",
					replaceStr = " " + name + " ";

				while(className.indexOf(replaceStr) !== -1)
				{
					className = className.replace(replaceStr, " ");
				}
				ele.className = jsApp.trim(className);

				return this;
			});
		},

		//============================================================================================================================//
		//是否存在类名
		hasClass: function(name)
		{
			return map(this, function(ele)
			{
				return (" " + ele.className + " ").indexOf(" " + name + " ") !== -1;
			});
		},

		//============================================================================================================================//
		//切换类名状态
		toggleClass: function(name)
		{
			return map(this, function(ele)
			{
				return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
			});
		},
		 
		//添加事件监听器
		/*----------------------------------
		 *说明：一个HTML元素可通过添加听器进行事件的多次绑定，所有绑定的这些事件监听器，在事件被触发时都将会被依次执行。
		 *      在执行所有被绑定的事件监听器时，IE6/7/8是按照添加先后的反向顺序依次执行的，而标准模型中则是按照被添加的先后顺序依次执行。
		 *      我们在这里做了相关处理，使处理程序中的this在所有浏览器中均指向HTML元素本身。（在IE6/7/8中，事件处理程序中this指向的是window，而在其他浏览器中（如：IE9、Chrome、Firefox），则指向的是目标HTML元素）
		 *=========
		 *【参数】
	     *1. name: （类型：string，必备）事件名称（必须是如下形式：scroll、click、dblclick）
	     *2. handler: （类型：function，必备）需要绑定的处理程序
	     *3. capture: （类型：boolean，可选）是否进行事件捕捉（在IE的非标准事件模型中不支持事件捕捉！）
	     *--------------------------------------------------------------------------------------------------------------------*/
		bind: function(name, handler, capture)
		{
			return map(this, function(ele)
			{
				var returnBack = null;
				if("mouseenter,mouseleave".indexOf(name) >= 0 && !("onmouseenter" in ele))
				{
					// 兼容mouseenter和mouseleave事件（在Chrome和Safari中未得到支持），这两个事件不会发生冒泡，鼠标在子级元素的移动不会触发父级元素的相关事件。
					name = name === "mouseenter" ? "mouseover" : "mouseout";
					returnBack = function(e)
					{
			        	e = jsApp.event(e);
						var target = e.target;
						var mouseTo = e.relatedTarget;

						//如果相关目标不是目标元素的子元素且不是元素本身则继续执行
						if(!ele.contains(mouseTo) && ele !== mouseTo)
						{
		    				handler.call(target, e);
						}
					};
				}
				else
				{
					returnBack = function(e)
			        {
			        	//通过中转实现各浏览器下this与事件对象表现一致
			        	e = jsApp.event(e);
			        	handler.call(e.target, e);
			        };	
				}
				document.addEventListener ? ele.addEventListener(name, returnBack, capture) : ele.attachEvent("on" + name, returnBack);	
		        return returnBack;
			});
		},

		//事件监听器的删除
		/*----------------------------------
		 *【参数】
	     *1. name: （类型：string，必备）事件名称（必须是如下形式：scroll、click、dblclick）
	     *2. handler: （类型：function，必备）需要绑定的处理程序
	     *3. capture: （类型：boolean，可选）是否进行事件捕捉(说明：之所以在这里需要指明“是否进行捕捉”参数，是因为同一个监听器可以使用不同的捕捉参数注册两次！）
	     *--------------------------------------------------------------------------------------------------------------------*/
		unbind: function(name, handler, capture)
		{
			return map(this, function(ele)
			{
				if("mouseenter,mouseleave".indexOf(name) >= 0 && !("onmouseenter" in ele))
				{
					name = name === "mouseenter" ? "mouseover" : "mouseout";
				}
				document.addEventListener ? ele.removeEventListener(name, handler, capture) : ele.detachEvent("on" + name, handler);	
				return this;
			});
		},

		//DOM树加载完成时即执行通过ready添加的处理程序
		/*----------------------------------
		 *说明：通过该方式添加的处理程序可以在形成完整的DOM树之后就触发，而不需要像load事件那样在所有页面元素全部加载完毕后才会触发，可以在页面下载的早期就添加事件处理程序，这意味着用户能够尽早地与页面进行交互。
		 *=========
		 *【参数】
	     *1. handler: （类型：function，必备）需要绑定的处理程序
	     *--------------------------------------------------------------------------------------------------------------------*/
		ready: function(handler)
		{
			//如果添加处理程序时DOM树已经加载完毕，那么1毫秒后自动执行（之所以使用定时器，是为了实现异步执行）
			var readyState = document.readyState;
			if(readyState === "interactive" || readyState === "complete")
			{
				return setTimeout(handler, 1);
			}

			//添加处理程序列表
			readyList.push(handler);
			if(readyList.length === 1)
			{
				//仅当第一次添加处理程序时才进行DomContentLoaded事件的监测。
				jsApp.DomContentLoaded();
			}
			return this;
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
			return jsApp(ele);
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
			return jsApp(ele);
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
			return jsApp(ele);
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
			return jsApp(ele);
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
			return jsApp(this.node.parentNode);
		},

		//封装对innerHTML的访问和赋值（说明：如果没有参数则表示获取innerHTML属性值，否则为修改innerHTM文本）
		/*----------------------------------
		 *参数说明：
		 *1. str：（类型：string，可选）需要添加的innerHTML文本；
		 *=================================================================================*/
		html: function(str)
		{
			if(str === undefined)
			{
				return this.node.innerHTML;
			}
			else
			{
				this.node.innerHTML = str;
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
			if(str === undefined)
			{
				return (obj.innerText || obj.textContent);
			}
			else
			{
				obj.innerHTML = str;
			}
			return this;
		}
	}
	jsApp.fn.init.prototype = jsApp.fn;

	//jsApp的扩展函数(仅针对JSON对象以及Function对象进行扩展操作)
	//可以有两个参数：第一个参数为需要扩展的对象本身，第二个参数是当需要扩展的对象为函数时所指定的函数名称。
	//使用jsApp.extend进行扩展的对象直接通过jsApp.xx即可调用；而使用jsApp.fn.extend进行扩展的对象则需要通过new jsApp().xx来进行调用。
	jsApp.extend = jsApp.fn.extend = function()
	{
		var n,
			target = this,
			obj = arguments[0],
			name = arguments[1] || "";

		if(name === true || jsApp.isJSON(obj))
		{
			//JSON扩展（name===true为扩展功能，就是为了让自己扩展对象时不需要判断对象类型）
			for(n in obj)
			{
				target[n] = obj[n];
			}
		}
		else if(jsApp.isFunction(obj) && name !== "")
		{
			//函数扩展
			target[name] = obj;
		}
	}

	//对jsApp对象进行扩展
	jsApp.extend({

		//DomContentLoaded事件的兼容处理
		DomContentLoaded: function()
		{
			if(document.addEventListener)
			{
				//标准事件模型（IE9+、Chrome、Safari、Firefox、Opera）
				document.addEventListener("DOMContentLoaded", doReady, false);
				return;
			}
			//兼容IE6、7、8，原理是因为在IE浏览器中DOM未加载完成时调用doScroll方法，会产生异常。参考地址：http://javascript.nwbox.com/IEContentLoaded/
			var checkReady = function()
			{
				try
				{
					document.documentElement.doScroll('left');
				}
				catch(e)
				{
					setTimeout(checkReady, 10);
					return;
				}
				doReady();
			}
			checkReady();
		},

		//对事件对象的兼容性处理
		event: function(e)
		{
			e = e || window.event; 					//事件对象
			var target = e.target || e.srcElement,	//事件目标
			type = e.type,						//事件类型
			compatible = {

				//事件类型，即事件的名称，如：click、dblclick、mouseover
				type: type,

				//事件目标，即用户的操作是基于哪一个目标元素进行的
				target : target,

				//Ctrl键是否按下
				ctrlKey: e.ctrlKey,

				//Shift键是否按下
				shiftKey: e.shiftKey, 

				//Alt键是否按下
				altKey: e.altKey,

				//防止事件冒泡
				stopPropagation: function()
				{
					if("stopPropagation" in e)
					{
						e.stopPropagation();         	//用于DOM标准事件模型
					}
					else
					{
						e.cancelBubble = true;			//用于IE6/7/8浏览器的非标准事件模型
					}
				},

				//取消默认行为
				preventDefault: function()
				{
					if("preventDefault" in e)
					{
						e.preventDefault();         	//用于DOM标准事件模型
					}
					else
					{
						e.returnValue = false;			//用于IE6/7/8浏览器的非标准事件模型
					}
				}
			};

			//鼠标事件
			if(type.indexOf("mouse") >= 0 || type.indexOf("click") >= 0)
			{
				//作用于鼠标事件, 对于mouseover而言表示从哪个DOM元素进来，而对于mouseout而言则表示鼠标着落在那个DOM元素
				compatible.relatedTarget = e.relatedTarget === undefined ? (type === "mouseover" ? e.fromElement : e.toElement) : e.relatedTarget;

				// //鼠标相对于目标元素的X轴坐标位置（由于offsetX和offsetY并没有被加入标准，所以Firefox浏览器并不支持这两个属性）
				compatible.offsetX = e.offsetX === undefined ? (e.clientX - target.getBoundingClientRect().left) : e.offsetX;

				// //鼠标相对于目标元素的Y轴坐标位置
				compatible.offsetY = e.offsetY === undefined ? (e.clientY - target.getBoundingClientRect().top) : e.offsetY;

				//鼠标相对于文档显示区的X轴坐标位置
				compatible.clientX = e.clientX;

				//鼠标相对于文档显示区的Y轴坐标位置
				compatible.clientY = e.clientY;

				//鼠标相对于整个页面的X轴坐标位置（pageX和pageY在IE6/7/8中没有得到支持）
				compatible.pageX = e.pageX === undefined ? (document.documentElement.scrollLeft + event.clientX) : e.pageX;

				// //鼠标相对于整个页面的Y轴坐标位置
				compatible.pageY = e.pageY === undefined ? (document.documentElement.scrollTop + event.clientY) : e.pageY;

				//鼠标相对于屏幕的X坐标位置
				compatible.screenX = e.screenX;

				//鼠标相对于屏幕的Y坐标位置
				compatible.screenY = e.screenY;

				// 判断鼠标所按的是哪个键（0—左键；1—中间键；2—右键）
				if(document.implementation.hasFeature("MouseEvents", "2.0"))
				{
					compatible.button = e.button;
				}
				else
				{
					//在非标准的IE6/7/8事件模型下，按键有7个值
					switch(e.button)
					{
						case 0:
						case 1:
						case 3:
						case 5:
						case 7:
							compatible.button =  0;
							break;
						case 2:
						case 6:
							compatible.button =  2;
							break;
						case 4:
							compatible.button =  1;
							break;
					}	
				}
			}
			//键盘按键事件的兼容性处理
			else if(type.indexOf("key") >= 0)
			{
				//键盘按键的键码值
				compatible.keyCode = e.keyCode === 0 ? e.charCode : e.keyCode;
			}

			return compatible;
		},

		//用于IE6/7/8设置或获取html元素的opacity属性的值
		ieOpacity: function(ele, value)
		{
			//由于windows7中IEtest的IE6模式下不支持透明滤镜，会影响到调试，所以需要使用了try语句。
			try
			{
				if(value === undefined)
				{
					return ele.filters.alpha ? ele.filters.alpha.opacity / 100 : 1;
				}
				//如果不用filter:alpha书写样式，则IE6/7/8中的opacity属性为null
				ele.filters.alpha ? 
				(ele.filters.alpha.opacity = value * 100) : 
				(ele.style.cssText += ";filter:alpha(opacity=" + value*100 + ");");
			}
			catch(e)
			{
				return 0;
			}
		},
		
		//用于attr()获取属性时进行筛选兼容
		getAttrFilter: function(ele, attr)
		{
			var result;
			switch(attr)
			{
				case "class":
					//如果元素的class属性为空字符串，则认为没有设置class属性
					result = ele.className || null;
					break;

				case "style":
					//移除style属性后，值为空字符串
					result = ele.style.cssText || null;
					break;

				case "tabindex":
					//当没有tabindex属性时，IE6/7中的值为0，而非null（tabindex属性属于元素属性）
					result = ele.getAttribute(attr) || null;
					break;

				case "for":
					//label标签的for属性以DOM属性的形式进行存储，命名为htmlFor；其他标签如果有设置for属性，则作为元素属性进行访问
					result = "htmlFor" in ele ? ele.htmlFor : ele.getAttribute(attr);
					break;

				default:
					//默认获取DOM属性，其次再取元素属性，与赋值时的操作保持目的一致性
					//目的一致性：如果需要操作DOM属性，使用node[属性名]进行；如果要操作元素属性，则使用node.setAttribute()和node.getAttribute()进行；
					result = ele[attr] || ele.getAttribute(attr);
			}

			return result;
		},

		//用于attr()设置属性时进行筛选兼容
		/*----------------------------------
		 *说明：IE6、7、8中表单控件的type属性为只读
		 *		IE6、7、8中各焦点元素的tabindex属性设置无效
		 *		IE6、7、8中表单控件的maxlength属性设置无效
		 *		IE6、7中label标签的for属性设置无效
	     *--------------------------------------------------------------------------------------------------------------------*/
		setAttrFilter: function(ele, attr, value)
		{
			switch(attr)
			{
				case "class":
					ele.className = value;
					break;

				case "style":
					ele.style.cssText = value;
					break;

				default:
					//当DOM对象的DOM属性值为空时，使用setAttribute方法进行赋值。因为采用该种方式时，无论目标属性是作为元素属性还是DOM属性，设置的结果值都会是正确的。
					ele[attr] === null || ele[attr] === undefined ? ele.setAttribute(attr, value) : (ele[attr] = value);
			}
		},

		//用于遍历数组、JSON对象，并执行相关操作
		//回调函数传递两个参数：第一个表示索引位置；第二个表示数组或对象当前索引位置的名称或值。
		each: function(obj, callback)
		{
			var name, i, len;

			if(jsApp.isJSON(obj))
			{
				for(name in obj)
				{
					if(callback.call(obj[name], name, obj[name]) === false)
					{
						break; //如果回调函数返回false，则不再往下执行
					}
				}
			}
			else
			{
				for(i = 0, len = obj.length; i < len; i++)
				{
					if(callback.call(obj[i], i, obj[i]) === false)
					{
						break; //如果回调函数返回false，则不再往下执行
					}
				}
			}
		},

		//判断类型是否为：字符串
		isString: function(obj)
		{
			return typeof(obj) === "string";
		},

		//判断类型是否为：数字
		isNumeric: function(obj)
		{
			return !isNaN(obj) && jsApp.type(obj) === "number"
		},

		//判断类型是否为：函数
		isFunction: function(obj)
		{
			return jsApp.type(obj) === "function";
		},

		//判断类型是否为：数组
		isArray: function(obj)
		{
			return jsApp.type(obj) === "array";
		},

		//判断类型是否为：日期（或者是日期字符串，如“2012-03-26”）
		isDate: function(obj)
		{
			return jsApp.type(obj) === "date" ||
				(typeof(obj) === "string" && !isNaN(Date.parse(obj.replace(/-/g, "/"))));
		},

		//判断类型是否为：JSON对象（就是指除内置对象和HTML对象外的自定义对象）
		isJSON: function(obj)
		{
			return obj != null && jsApp.type(obj) === "object" && obj.toString().toLowerCase() === "[object object]";
		},

		//获取类型字符串，各种类型返回的字符串结果如下：
		/*
			数字(含NaN)：  	number
			字符串： 		string
			ture/false：	boolean
			null： 			null
			undefined：		undefined
			数组： 			array
			函数： 			function
			JSON： 			object
			日期对象： 		date
			数学对象：		math
			正则： 			regexp
			window：
				IE6/7/8: 	object
				chrome： 	global
				safari: 	domwindow
				其他：		window
			document.body:
				IE6/7/8: 	object
				其他： 		htmlbodyelement
		*/
		type: function(obj)
		{
			return obj == null ? 
				String(obj) :
				new RegExp("\\[object\\s+(.*)\\]").exec(Object.prototype.toString.call(obj).toLowerCase())[1];
		},

		//trim()方法用于去除目标字符串中的首尾空格，返回值类型：string
		/*----------------------------------
		 *【参数】
		 *1. str：（类型：string，必备）目标字符串，如果缺少该参数则会返回undefined；
		 *2. all：（类型：boolean，可选）是否移除所有空格，默认仅移除两端多余空格；
	     *--------------------------------------------------------------------------------------------------------------------*/
		trim: function(str, all)
		{
			return all ? 
			str.replace(/\s/g, "") : 
			str.replace(/^\s*|\s*$/g, "");
		},

		//padStr()方法用于填充字符以使目标字符串达到指定长度，返回值类型：string
		//如果指定的长度小于目标字符串的长度，则返回原目标字符串
		/*----------------------------------
		 *【参数】
		 *1. str：（类型：string，必备）目标字符串；
		 *2. dir：（类型：string，必备）填充的方向，"left"——左填充，"right"——右填充；
		 *3. len：（类型：number，必备）目标显示长度；
		 *4. character：（类型：string，必备）用来进行填充的字符，如果是以&开头且长度大于1的字符串作为特殊HTML编码字符来使用，如果不是以&开头且长度大于1的字符串将截取第一个字符；
	     *--------------------------------------------------------------------------------------------------------------------*/
		padStr: function(str, dir, len, character)
		{
		    var strLen = str.length,
		        pad = "",
		        i = 0;
		    if(strLen < len)
		    {
		        character = (character.charAt(0) === "&" && character.length > 1) ? character : character.charAt(0);
		        len = len - strLen;

		        for( ; i < len; i++){
		            pad += character;
		        }
		        if(dir === "left"){
		        	return pad + str;
		        }
		        return  str + pad;
		    }
		    return str;
		},

		//dupStr()方法用于返回len个目标字符串的拼接结果，返回值类型：string
		//如果缺少参数则结果返回""
		/*----------------------------------
		 *【参数】
		 *1. str：（类型：string，必备）目标字符串；
		 *2. len：（类型：number，必备）需要拼接的次数；
		 *--------------------------------------------------------------------------------------------------------------------*/
		dupStr: function(str, len)
		{
			var add = "",
				i = 1;
			for( ; i < len; i++)
			{
				add += str;
			}
			return (str + add);
		},

		//添加cookie或者重新给cookie赋值
		/*----------------------------------
		 *【参数】
		 *1. name: （类型：string，必备）需要添加的cookie名称;
		 *2. value: （类型：string，必备）为cookie指定的值;
		 *3. expires: （类型：string，可选）指定当前cookie多长时间后失效（单位：分），默认为回话结束后失效。
		 *4. path: （类型：string，可选）指定可访问cookie的目录名称，默认值为“/”。 假使cookie创建时的页面地址为http://www.xxx.com/syc/ts.html,那么在默认情况下该cookie仅能供sys目录下及其子级目录下的页面进行访问，像http://www.xxx.com/why/jjs.html这样的页面将无法访问该cookie，如果需要使why目录下的页面也能正常访问，则需要将path属性设置为“path=/why”，而如果需要使该网站的所有页面都有权限访问该cookie，则需要将path属性设置为网站根目录，即“path=/”。 说明：一个页面可以根据path路径的不同而创建多个具有相同名称的cookie。
		 *5. domain: （类型：string，可选）指定可访问cookie的主机名，默认值为空。 默认情况下，二级域名之间创建的cookie是不能相互被访问的。比如yes.xxx.com访问不了www.xxx.com域名下创建的cookie，如果需要实现二级域名之间能够互相被访问，则需要设置domain属性值为“domain=.xxx.com”，这样才能保证hyck.xxx.com、osp.xxx.com、yes.xxx.com等域名下的网页也能够正常访问www.xxx.com域名下网页所创建的cookie。 （说明：在www.xxx.com下创建一个cookie时，如果为该cookie的domain值指定为其他二级域名，那么该cookie将创建失败！）
		 *6. secure: （类型：string，可选）用于设置安全性。 默认情况下，使用http协议连接的页面即可访问该cookie；当设置了该属性后（该属性的属性值可以为任何字符，包括""），则只有通过https或者其它安全协议连接的页面才能访问该cookie。
	     *--------------------------------------------------------------------------------------------------------------------*/
		setCookie: function(name, value, expires, path, domain, secure)
		{
			var str = name + "=" + escape(value) + ";path=" + (path === undefined ? "/" : path) + (domain === undefined ? "" : ";domain=" + domain) + (secure === undefined ? "" : ";secure=")  //说明：必须对cookie值进行escape编码处理，从而使空格、汉字、特殊字符呈如“%20”的形式进行保存。
			if(expires > 0)
			{
				var e_date = new Date();
				e_date.setMinutes(e_date.getMinutes() + parseInt(expires));
				str += ";expires=" + e_date.toGMTString();		//过期时间值必须是GMT时间格式，通过toGMTString()方法即可将一个时间值转换为GMT格式;
			}
			document.cookie = str;
		},

		//获取指定cookie的值，返回值类型：string
		//如果没有目标名称的cookie，则返回null
		/*----------------------------------
		 *【参数】
		 *1. name: （类型：string，必备）需要获取的cookie名称;
		 *--------------------------------------------------------------------------------------------------------------------*/
		getCookie: function(name)
		{
		    var reg = new RegExp(name + "=([^;]*)");
		    var result = reg.exec(document.cookie);
		    return result ? unescape(result[1]) : null;	//在返回数据时，必须将编码的源数据解码。
		},

		//删除指定名称的cookie
		//通过将cookie的过期时间设置为一个过去的时间值即可将该cookie删除。
		/*----------------------------------
		 *【参数】
		 *1. name: （类型：string，必备）需要删除的cookie名称;
		 *2. path: （类型：string，可选）添加cookie时所设置的目录名称,默认值为“/”。因为一个页面可以根据path路径的不同而创建多个具有相同名称的cookie，所以在删除的时候也必须指明path路径。（说明：将path参数值指定为“/”，将无法删除path值为“/xxx”创建的cookie，如果需要删除该cookie，则必需指定delCookie方法的path参数值也为“/xxx”。）
		 *3. domain: （类型：string，可选）添加cookie时所设置的主机名称，默认值为空。因为一个页面可以根据domain值的不同而创建多个具有相同名称的cookie，所以在删除的时候也必须指明domain值。
		 *--------------------------------------------------------------------------------------------------------------------*/
		delCookie: function(name, path, domain)
		{
			var e_date = new Date();
			e_date.setTime(e_date.getTime() - 100);
			document.cookie = name + "=;expires=" + e_date.toGMTString() + ";path=" + (path === undefined ? "/" : path) + (domain === undefined ? "" : ";domain=" + domain);
		},

		//将目标NodeList转换为静态的Array
		//节点集合NodeList会随着DOM的更改而被更新，在某种情况下不好控制，需要转换为静态数组后再行处理。
		/*----------------------------------
		 *【参数】
		 *1. eles: （类型：NodeList，必备）需要被转换的NodeList对象;
		 *--------------------------------------------------------------------------------------------------------------------*/
		toArray: function(eles)
		{
			var arr = [],
				len = eles.length,
				i = 0;
			try
			{
				//在非IE浏览器中进行操作，IE浏览器不支持该方法
				arr = Array.prototype.slice.call(eles);
			}
			catch(e)
			{
				//在IE中采用循环赋值的方式来进行
				for(; i < len; i++)
				{
					// arr.push(eles[i]);//在IE中使用索引扩展数组的方式比使用push方法的效率要高些
					arr[i] = eles[i];
				}
			}
			return arr;
		},

		//用于获取当前页面中鼠标选择的文本值
		getSelection: function()
		{
			var str = (document.selection) ? document.selection.createRange().text : document.getSelection();
			return str + "";	//如果不使用该语句返回值，将返回selection的引用。
		},

		//获取十六进制数值A~F所对应的十进制数值
		//返回类型：Number
		getDecimalValue: function(num)
		{
		    switch(num.toString().toLowerCase())
		    {
		        case "a": return 10; break;
		        case "b": return 11; break;
		        case "c": return 12; break;
		        case "d": return 13; break;
		        case "e": return 14; break;
		        case "f": return 15; break;
		        default: return parseInt(num);
		    }
		},

		//获取十进制数值0~15所对应的十六进制表示法
		//返回类型：String
		getHexValue: function(num)
		{
		    switch(num)
		    {
		        case 10: return "A"; break;
		        case 11: return "B"; break;
		        case 12: return "C"; break;
		        case 13: return "D"; break;
		        case 14: return "E"; break;
		        case 15: return "F"; break;
		        default: return "" + num;
		    }
		},

		//返回十进制数转换为十六进制字符串的结果
		/*----------------------------------
		 *【参数】
		 *1. num: （类型：Number，必备）需要被转换的十进制数
		 *2. digit：（类型：Number，必备）最终需要显示的字符串位数，少的用“0”进行填补
		 *--------------------------------------------------------------------------------------------------------------------*/
	    getDecimalToHex: function(num, digit)
	    {
	        var valueStr = new Array(0, 0);  //用于存放十六进制字符串
	        var index = 0;                   //当前索引
	        
	        while(num > 15)
	        {
	            valueStr[index] = jsApp.getHexValue(num % 16);
	            num = parseInt(num / 16);
	            index++;
	        }
	        valueStr[index] = jsApp.getHexValue(num);
	        if(digit === undefined)
        	{
        		digit = valueStr.length;
    		}
	        return jsApp.padStr(valueStr.reverse().join(""), "left", digit, "0");
	    },

	    //返回十六进制数转换为十进制的结果值
		/*----------------------------------
		 *【参数】
		 *1. hex: （类型：String，必备）需要被转换的十六进制数
		 *--------------------------------------------------------------------------------------------------------------------*/
	    getHexToDecimal: function(hex)
	    {
	        var result = 0,
	        	len = hex.length - 1,
	        	i = 0;
	        hex = String(hex).toLowerCase();
	        if(!/[^0-9a-f]/.test(hex)) //先行判断其是否为有效的十六进制数
	        {
	            for(; i < len; i++)
	            {
	                result += Math.pow(16, hex.length - 1 - i) * jsApp.getDecimalValue(hex.charAt(i));
	            }
	            result += jsApp.getDecimalValue(hex.charAt(hex.length - 1));
	        }
	        return result;
	    },

		//创建browser对象用来保存浏览器的相关信息以及与浏览器本身相关的方法。
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
		browser: (function(){
			var browser = {
				//浏览器名称（类型：String）
				name: "",

				//浏览器版本（类型：String）
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
			},
			ua = navigator.userAgent.toLowerCase(),
			match = /ms(ie) ([\d.]+)/.exec(ua) || 
					/(firefox)\/([\d.]+)/.exec(ua) ||
					/(opera).*version\/([\d.]+)/.exec(ua) ||
					/(chrome)\/([\d.]+) safari\/([\d.]+)/.exec(ua) ||
					/apple(webkit).*version\/([\d.]+) safari/.exec(ua) ||
					[],
			name = match[1] || "",
			version = match[2] || "",
			canFlash = false,
			isIE, browserV, tags, i;

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
				browser.isIE = true;
				browser.lessIE9 = true;

				if(!window.XMLHttpRequest)
				{
					//注：IE6不支持XMLHttpRequest对象
			    	version = "6.0";
			    	browser.isIE6 = true;
				}
				else if(window.XMLHttpRequest && !("hasAttribute" in document.createElement("div")))
				{
				    //注：IE6/7不支持hasAttribute方法
			    	version = "7.0";
			    	browser.isIE7 = true;
				}
				else if(!document.getSelection && ("hasAttribute" in document.createElement("div")))
				{
				    //注：IE6/7/8不支持document.getSelection
			    	version = "8.0";
			    	browser.isIE8 = true;
				}
				else
				{
					browser.lessIE9 = false;
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
			if(browser.lessIE9)
			{
			    tags = "header,footer,aside,article,section,hgroup,nav,menu,canvas,output,dialog,datalist,details,figure,figcaption,audio,video,progress,mark,time".split(",");
			    for(i = 0, len = tags.length; i < len; i++)
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
			if(browser.isIE6)
			{
				try
				{
					document.execCommand("BackgroundImageCache", false, true);
				}
				catch(e){}
			}

			browser.name = name;
			browser.version = version;

			return browser;
		}())
	}, true);

	//对jsApp的原型进行扩展：事件绑定的快捷方式
	jsApp.each(eventNames, function(i, name)
	{
		jsApp.fn[name] = function(handler, capture)
		{
			this.bind(name, handler, capture);
		};
	});	

	//Array对象的原型扩展
	if(!("indexOf" in Array.prototype))
	{
		Array.prototype.indexOf = function(val)
		{
		    //返回目标数组中指定值第一次出现所在的位置，不存在则返回-1
		    var result = -1,
		    	len = this.length,
		    	i = 0;

			for(; i < len; i++)
			{
				if(this[i] === val)
				{
					result = i;
					break;
				}
			}
			return result;
		}
	}
	Array.prototype.remove = function(val)
	{
	    //删除数组中与目标值相同的第一个元素
		var idx = this.indexOf(val);
		if(idx !== -1)
		{
			this.splice(idx, 1);
		}
	}
	Array.prototype.removeAll = function(val)
	{
	    //删除数组中与目标值相同的所有元素
	    var idx;
	    while((idx = this.indexOf(val)) !== -1)
	    {
	    	this.splice(idx, 1);
	    }
	}

	window.jsApp = window.$$ = jsApp; //赋予jsApp对象全局作用域！

})(window);

// /*=====================================================================
//  *动画
//  */
// jsApp.prototype.animate = function(attrs, params, callback, delay)
// {
// 	//============================================================================================================================//
// 	//动画外部参数传递接口
// 	/*=================
// 	 *目标：通过调用该方法，将动画相关参数传递给动画参数的配置接口；
// 	 *作者：龙泉
// 	 *QQ：569320261
// 	 *创作时间：2012-07-17
// 	 *修改时间：2012-07-17
// 	          ：2012-07-22
// 	 *-----------------------------------
// 	 *参数说明：
// 	 *1. attrs: 需要更改目标对象的属性集合， 如：{width:200, height:200, left:"+100", top:"-100", opacity:0.5, backgroundColor:"#056279"}
// 	 *			说明：
// 	 *				对于left、width等数值属性支持绝对数值，也支持相对数值。相对数值采用字符串格式进行书写，"+"表示在原来基础进行相加的结果，"-"则表示在原来基础上进行相减的结果。
// 	 *			  	对于颜色color或者backgroundColor属性值采用字符串格式进行书写，如："#ffffff"、"#000000"、"#cc0000"。（注意：在进行颜色值的变换效果中，最终颜色值必须是6位的十六进制值，并且原始颜色值[即通过CSS设置的color或background-color的值]不能为英文单词，但可以是三位的十六进制颜色值。这是因为在非IE浏览器中，无论你的颜色值为“#000”、“balck"、"#000000"中的哪一种，最终都将转为rgb()格式进行保存，而在IE6中，将保留原始值字符串值！）	
// 	 *2. params: 参数设置，以JSON格式存在:
// 	 		tween: 缓动效果
// 	 		duration: 运动持续的总时间（单位：秒）
// 			noZIdx: 是否不进行层叠控制，默认值为true，即不进行层叠控制
// 			zoomFromCenter: 是否以目标对象中心进行缩放，默认值为false
// 	 *3. callback: 回调函数，当移动动画执行完毕后触发
// 	 *4. delay: 回调函数延迟触发的时间（单位：毫秒）
// 	 *==================================================*/
// 	console.time("参数传递接口");
//  	var obj = this.node;
//  	if(obj)
//  	{
// 		var FPS = 75;							//每秒帧数
// 		var SPF = 1000 / FPS;					//每帧执行的间隔时间
// 		duration = params && params.duration ? params.duration : 1;			//设置默认时间为1秒钟
// 		var frames = duration * FPS;			//运动的总次数
// 		tween = params && params.tween ? params.tween : Tween.Quad.easeOut;	//默认缓动效果
// 		delay = delay == undefined ? 0 : delay;	//回调函数的延迟加载时间

// 		//遍历属性
// 	 	for(var name in attrs)
// 	 	{
// 			var begin = $$(obj).getStyle(name);
// 			var suffix = String(begin).indexOf("px") != -1 ? "px" : 0;			//属性值的单位
// 			begin = parseFloat(begin);											//初始值
// 			if(isNaN(begin)){ continue; }										//非数值属性无法使用动画效果
// 			var end = String(attrs[name]).charAt(0) == "+" || String(attrs[name]).charAt(0) == "-" ? begin + parseFloat(attrs[name]) : attrs[name];	//结束值
// 			var change = end - begin;											//变换的量
// 			var times = 0;														//当前运动次数

// 		 	var config = 
// 		 	{
// 		 		app: this,
// 		 		obj: obj,
// 		 		attr:  name,
// 		 		begin: begin,
// 		 		end: end,
// 		 		change: change,
// 		 		times: times,
// 		 		frames: frames,
// 		 		suffix: suffix,
// 		 		tween: tween,
// 		 		SPF: SPF,
// 		 		callback: callback,
// 		 		delay: delay
// 		 	}

// 		 	//初始化动画的一个实例，并执行
// 		 	var fx = new FX(config);
// 		 	fx.custom();
// 	 	}
// 	}
// 	console.timeEnd("参数传递接口");
// 	return this;
// }
// jsApp.prototype.stop = function()
// {
// 	//============================================================================================================================//
// 	//停止目标对象的动画输出
// 	/*=================
// 	 *目标：停止目标对象的动画输出；
// 	 *作者：龙泉
// 	 *QQ：569320261
// 	 *创作时间：2012-07-22
// 	 *修改时间：2012-07-22
// 	 *==================================================*/
// 	clearInterval(this.timerId);
// 	return this;
// }

// /*=====================================================================
//  *动画的构造函数
//  */
// var FX = function()
// {
//  	for(var i in arguments[0])
//  	{
//  		this[i] = arguments[0][i];	//将动画的参数信息保存
//  	}
// }
// //动画的控制
// FX.prototype.custom = function()
// {
// 	// alert(this.attr + ":" + this.begin + ";" + this.end)
// 	// return false;
//  	var _this = this;

//  	//将所有动画保存至一个数组
//  	function fn()
//  	{
//  		_this.step();
//  	}
//  	_this.app.timers.push(fn);

//  	//设置定时器
//  	if(!_this.app.timerId)
// 	{
//  	 	_this.app.timerId = setInterval(function()
// 	 	{
// 	 		// alert(_this.app.timers.length);
// 	 		if(_this.app.timers.length > 0)
// 	 		{
// 	 			for(var i = 0; i < _this.app.timers.length; i++)
// 	 			{
// 	 				_this.app.timers[i].call();
// 	 			}
// 	 		}
// 	 		else
// 	 		{
// 	 			clearInterval(_this.app.timerId);
// 		 		if(_this.callback && typeof(_this.callback) == "function")
// 		 		{
// 		 			setTimeOut(callback, _this.delay);
// 		 		}
// 	 			_this.app.timerId = null;
// 	 		}
// 	 	}, _this.SPF);
//  	}
// }
// //动画的执行
// FX.prototype.step = function()
// {
// 	//console.time("时间");
// 	var _this = this;

//  	$$(_this.obj).setStyle(_this.attr, _this.tween(_this.times, _this.begin, _this.change, _this.frames) + _this.suffix);	//进行缓动运动
// 	_this.times++;
//  	if(_this.times >= _this.frames)
//  	{
//  		//动画执行完毕，将属性重置为目标值
//  		clearInterval(_this.app.timerId);
//  		$$(_this.obj).setStyle(_this.attr, _this.end);
// 		for(var i = 0; i < _this.app.timers.length; i++)
// 		{
// 			// if(_this.app.timers[i] == this)
// 			// {
// 			// 	_this.app.timers.splice(i, 1);
// 			// }
// 			if(_this.app.timers[i] == arguments.callee)
// 			{
// 				alert(true);
// 				_this.app.timers.splice(i, 1);
// 			}
// 		}
//  	}
// 	//console.timeEnd("时间");
// }



// //返回顶部(未作测试，未完成)
// //当浏览器文档显示区低于1024px时，不显示“返回顶部”按钮
// /*----------------------------------
//  *作者：Jerry_小猪
//  *QQ：569320261
//  *创作时间：2012-11-12;
//  *修改时间：2012-11-12;
//  *----------------------------------
//  *参数说明：
//  *1. func：（类型：function，可选）当点击按钮时，执行的附加操作；
//  *----------------------------------------------------------------------------*/
// jsApp.backToTop = function(func){
//     var docWidth = document.documentElement.clientWidth;
//     if(docWidth > 1024){
// 	    //创建“返回顶部”按钮
//         var obj = document.createElement("div");
//         obj.id = "backToTop";
//         obj.style.display = "none";

//         var a = document.createElement("a");
//         a.setAttribute("href", "javascript:void(0);");
//         a.setAttribute("target", "_self");
//         a.setAttribute("title", "\u8fd4\u56de\u9876\u90e8");    //ASCII编码内容为“返回顶部”。
//         a.setAttribute("hidefocus", "true");
//         a.onclick = function(){
//     	    document.body.scrollTop = 0;
//     	    document.documentElement.scrollTop = 0;
// 		    if(func !== undefined){
// 			    func.call();
// 		    }
//     	    return false;
//         }
//         obj.appendChild(a);
//         document.body.appendChild(obj);

//         //监测按钮是否显示
//         jsApp(window).bind("scroll", function(){
// 	        var top = document.body.scrollTop || document.documentElement.scrollTop;
//             obj.style.display = (top > 0) ? "block" : "none";
//         });
//     }
// }