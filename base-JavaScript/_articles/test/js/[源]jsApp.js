
(function(window){


	//构建基类jsApp对象
	jsApp.fn = jsApp.prototype = {
		
		//============================================================================================================================//
		//设置或获取HTML元素的CSS属性
		//如果属性不存在，则获取样式时返回undefined，而设置样式时则不会返回任何结果
		//注意：value参数值可以是字符串值，也可以是一个函数调用。当为函数调用时，调用函数中的this指向的是目标元素，而第一个参数为index——表示元素在匹配集合中的索引。
		css: function(name, value)
		{
			return map(this, function(index, ele)
			{
				var isJSON = jsApp.isObject(name),  //是否通过JSON值对进行设置
					items = {},
					i,
					ieOpacity,
					result;

				if(!isJSON && value === undefined)
				{
					ieOpacity = name === "opacity" && ele.style.opacity === undefined; //是否需要进行IE的透明度兼容
					result = ieOpacity ? jsApp.ieOpacity(ele) : (ele.currentStyle ? ele.currentStyle[name] : window.getComputedStyle(ele,null)[name]);
					return result === "auto" ? "0px" : result;
				}

				isJSON ? (items = name) : (items[name] = value);
				for(i in items)
				{
					ieOpacity = i === "opacity" && ele.style.opacity === undefined;
					result = jsApp.filterValue.call(ele, index, items[i]);
					ieOpacity ? jsApp.ieOpacity(ele, result) : (ele.style[i] = result);
				}
				return this;
			});
		},

		//============================================================================================================================//
		//设置或获取HTML元素的标签属性（如果要表示自定义属性，其名称必须添加“data-”前缀）
		//说明：如果获取的属性没有被设置则返回null。
		//注意：value参数值可以是字符串值，也可以是一个函数调用。当为函数调用时，调用函数中的this指向的是目标元素，而第一个参数为index——表示元素在匹配集合中的索引。
		attr: function(name, value)
		{
			return map(this, function(index, ele)
			{
				var isJSON = jsApp.isObject(name),  //是否通过JSON值对进行设置
					items = {},
					i;

				if(!isJSON && value === undefined)
				{
					return jsApp.getAttrFilter(ele, name);
				}

				isJSON ? (items = name) : (items[name] = value);
				for(i in items)
				{
					jsApp.setAttrFilter(ele, i, jsApp.filterValue.call(ele, index, items[i]));
				}
				return this;
			});
		},

		//============================================================================================================================//
		//返回目标HTML元素中是否设置了相关属性
		hasAttr: function(name)
		{
			return this.attr(name) !== null;
		},

		//============================================================================================================================//
		//移除HTML元素的相关属性
		removeAttr: function(name)
		{
			return map(this, function(index, ele)
			{
				name === "class" ? ele.className = "" : ele.removeAttribute(name);
				return this;
			});
		},
	}
	jsApp.fn.init.prototype = jsApp.fn;


	//对jsApp对象进行扩展
	jsApp.extend({

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

		//用于css()获取属性时进行帅选兼容
		filterCSS: function(ele, attr, value)
		{
			switch(attr)
			{
				case "opacity":

					break;

				case "float":

					if(ele.style.styleFloat === undefined)
					{

					}
					else
					{
						window.getComputedStyle(ele,null)["cssFloat"];
					}
					break;

				default:

					//
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

			return result || null;
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

		//用于attr、css等方法中value参数值的筛选工作，判断其是字符串值还是函数。
		//该函数在执行时，this关键字指向的是目标元素的引用。
		/*----------------------------------
		 *参数说明：
		 *1. index：（类型：Number，必填）即目标元素在匹配集合中的索引位置；
		 *2. value：（类型：String/Function，必填）即需要进行赋值的目标值；
		 *=================================================================================*/
		filterValue: function(index, value)
		{
			if(jsApp.isFunction(value))
			{
				return value.call(this, index);
			}
			return value;
		}
		
	}, true);

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