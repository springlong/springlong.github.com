function $(id){return (typeof(id) == "string") ? document.getElementById(id) : id;}

//=====================================================================================================================================
//声明webApp对象，用于对目标对象进行扩展
function webApp(){}

//============================================================================================================================//
//常用方法集合
var method = 
{
    //获取一组Radio按钮的值
    //--------------------------
    //参数name：该组Radio按钮的name属性的值
    //=============================================
    getRadioValue:function(name)
    {
        var radioButton = document.getElementsByName(name);
        for(var i = 0; i < radioButton.length; i++)
        {
            if(radioButton[i].checked)
            {
                return radioButton[i].value;
            }
        }
    }
}

//============================================================================================================================//
//用于方法扩展
var Extend = {};

//============================================================================================================================//
//AS中的Tween缓动算法Javascript实现方案（参考地址：http://www.cnblogs.com/cloudgamer/archive/2009/01/06/tween.html）
/*=================
 *目标：实现目标对象的缓动效果；
 *说明：返回x时间坐标上的没一点所对应的y轴的值。
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2011-11-24
 *修改时间：2011-11-24
 *---------------------------
 *一、Tween算法中共分为以下几种缓动效果：
 *  1. Linear: 无缓动效果
 *  2. Quad: 二次方的缓动(t^2)
 *  3. Cubic: 三次方的缓动(t^3)
 *  4. Quart: 四次方的缓动(t^4)
 *  5. Quint：五次方的缓动(t^5)
 *  6. Sine: 正弧曲线的缓动(sin(t))
 *  7. Expo: 指数曲线的缓动(2^t)
 *  8. Circ: 圆形曲线的缓动(sqrt(1-t^2)
 *  9. Elastic: 指数衰减的正弧曲线缓动
 *  10. Back: 超过范围的三次方缓动
 *  11. Bounce: 指数衰减的反弹缓动
 *二、以上每种效果都分三个缓动方式：
 *  1. easeIn: 从0开始加速的缓动
 *  2. easeOut: 减速到0的缓动
 *  3. easeInOut: 前半段从0开始加速，后半段减速到0的缓动
 *三、调用该对象时，需要传递4个参数值：
 *  1. t: currentTime —— 当前运动次数（起始值为0）
 *  2. b: beginingValue —— 初始值
 *  3. c: changeValue —— 需要变更的量(即最终值-初始值)
 *  4. d: durationTime —— 运动的总次数
 *四、推荐使用：
 *  1. 缓冲-加速       Tween.Quart.easeIn
 *  2. 缓冲-加速-缓冲  Tween.Quart.easeInOut
 *==================================================*/
var Tween = {
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
}

//============================================================================================================================//
//变换效果通用接口
/*=================
 *目标：通过调用该方法，实现目标对象大小、位置、透明度的任意改变（该方法支持所有单位为“px”的属性、颜色值、透明度的变换效果）；
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2011-11-24
 *修改时间：2011-11-24;2011-11-25;2012-03-27;
 *-----------------------------------
 *参数说明：
 *1. id: 目标对象的引用或ID属性值
 *2. params: 目标属性值参数集合，采用JSON的格式进行传递（如：{left:200, top:100, width:500, height:400, color:"#ff0000", opacity:0.8, duration:2}）
 *           left: 目标对象left的最终值，可以是绝对数值（如：left:200），也可以是相对值字符串（如：left:"+100"）; 注：top、width、height这三个参数值同left！
 *           top: 目标对象top的最终值。
 *           width: 目标对象width的最终值。
 *           height: 目标对象height的最终值。
 *           defaultAlpha: 目标对象默认透明值，默认为1（完全不透明）。
 *           opacity: 目标对象透明度的最终值，取值为0~1。
 *           color/backgroundColor: 目标对象的前景色或背景色值，格式为字符串，如："#ffffff"、"#000000"、"#cc0000"。（注意：在进行颜色值的变换效果中，最终颜色值必须是6位的十六进制值，并且原始颜色值[即通过CSS设置的color或background-color的值]不能为英文单词，但可以是三位的十六进制颜色值。这是因为在非IE浏览器中，无论你的颜色值为“#000”、“balck"、"#000000"中的哪一种，最终都将转为rgb()格式进行保存，而在IE6中，将保留原始值字符串值！）
 *           noZIdx: 是否不进行层叠控制，默认值为true，即不进行层叠控制。
 *           hideEle: 动画播放完毕之后是否隐藏目标元素，默认值为false，即不隐藏元素。
 *           duration: 此次变换所需历经的总体时间，默认为1（单位：秒）。
 *           zoomFromCenter: 是否以目标对象中心进行缩放。
 *3. TweenChoose: 所选择的缓动效果。
 *4. runAtLast: 本次变换执行完毕之后接着所执行的动作，即执行变换操作所调用的函数；
 *5. delay: 如果runAtLast参数有效，则在本次变换执行完毕之后延时多少毫秒方才执行接下来的动作；
 *==================================================*/
Extend.transform=function(id, params, TweenChoose, runAtLast, delay)
{
	var obj = $(id);
	if(obj)
	{
		var FPS = 25;                           //每秒帧数
		var SPF = 1000 / FPS;                   //每次执行过渡操作的间隔时间（单位：秒）
		var duration = params.duration || 1;    //整个变换所需历经的总体时间，默认值为1秒
		var frames = parseInt(duration * FPS);  //总帧数，变值
		var totalTimes = frames;                //总帧数，不变值
		var noZIdx = (params.noZIdx == undefined) ? true : params.noZIdx;     //某些操作无需进行层叠控制,此时需要将该参数值设置为true,否则可能引发程序错误。因为该版程序的层叠效果控制仅用于relative定位元素下的直属子级absolute元素。
		var hideEle = (params.hideEle == undefined) ? false : params.hideEle;  //某些操作在运动完毕之后，需要进行隐藏操作，通常通过设置“display:none”来解决,如果需要实现该功能则需要设置该属性值为true；
		var desObj = {};                        //目标属性集合
		var srcObj = {};                        //当前属性集合
		var stepObj = {};                       //所有属性每帧步长
		var desValue, srcValue;                 //用来保存目标值和当前值
		var opacity = parseFloat((params.defaultAlpha || params.defaultAlpha == 0)? params.defaultAlpha : Extend.getCurrentStyle(obj, "opacity"));//透明度的默认值
		var currentStyle = window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle;     //运行时样式对象
		obj.style.cssText += ";opacity:" + opacity + ";filter:alpha(opacity=" + opacity*100 + ");";             //设置目标对象的默认透明度(注意：在追加的属性名称首部必须添加分号，因为在IE浏览器中赋值style.cssText属性后，最末尾的样式值是不带有分号的，切记！）
		TweenChoose = (TweenChoose) ? TweenChoose : Tween.Linear;                                               //选择缓动效果，默认为无效果；
        
		//z-index层叠解决方案
		if(!noZIdx)
		{
			if(!obj.offsetParent.maxZIndex_obj)
			{
				var max = 0;
				var chdNodes = obj.offsetParent.children;
				obj.offsetParent.maxZIndex_obj = obj.offsetParent.children[0];
				for(var i=0; i < chdNodes.length; i++)
				{
					var ele = chdNodes[i];
					ele.oldZIndex = Extend.getCurrentStyle(ele,"zIndex");
					if(ele.oldZIndex > max)
					{
						max = ele.oldZIndex;
						obj.offsetParent.maxZIndex_obj = ele;
					}
				}
				obj.offsetParent.maxZIndex_num = max;
			}
			obj.style.zIndex = obj.offsetParent.maxZIndex_num + 1;                                  //使当前对象最上层显示
			if(obj.offsetParent.maxZIndex_obj != obj)
			{
				obj.offsetParent.maxZIndex_obj.style.zIndex = obj.offsetParent.maxZIndex_obj.oldZIndex; //原最上层容器恢复zIndex值
				obj.offsetParent.maxZIndex_obj = obj;                                                   //重新赋值最上层容器为当前对象
			}
		}

		//是否以目标对象中心进行缩放
		if(params.zoomFromCenter && params.width && !params.left)
		{
			if(/^\D{1}/.test(params["width"])){
				params.left = parseFloat(currentStyle["left"]) - parseFloat(params.width)/2;
			}else{
				params.left = parseFloat(currentStyle["left"]) - (params.width - parseFloat(currentStyle["width"]))/2;
			}
		}
		if(params.zoomFromCenter && params.height && !params.top)
		{
			if(/^\D{1}/.test(params["height"])){
				params.top = parseFloat(currentStyle["top"]) - parseFloat(params.height)/2;
			}else{
				params.top = parseFloat(currentStyle["top"]) - (params.height - parseFloat(currentStyle["height"]))/2;
			}
		}

		//遍历params对象中的属性
		for(var i in params)
		{
			//获取当前属性值
			if(/opacity/i.test(i))
			{
				srcValue = "" + opacity;
			}
			else if(/color/i.test(i))
			{
			    //获取前景色和背景色的原始十六进制值，并拆分为红绿蓝三组
			    var colorValue = currentStyle[i];
			    try
			    {
			        if(colorValue.indexOf("rgb") >= 0)
                    {
                        //Chrome、Safari、Firefox浏览器的RGB值
                        var leftIdx = colorValue.indexOf("(");
                        var rightIdx = colorValue.indexOf(")");
                        var value = colorValue.substring(leftIdx+1, rightIdx);
                        srcValue = value.split(",");
                        srcValue = [parseInt(srcValue[0]), parseInt(srcValue[1]), parseInt(srcValue[2])];
                    }
                    else
                    {
                        //IE、Opera浏览器的#值
                        if(colorValue.length == 4)
                        {
                            //当原始颜色值为"#333”格式时
                            srcValue = [method.getDecimal(colorValue.substring(1,2) + "" + colorValue.substring(1,2)), method.getDecimal(colorValue.substring(2,3) + "" + colorValue.substring(2,3)), method.getDecimal(colorValue.substring(3,4) + "" + colorValue.substring(3,4))];
                        }
                        else
                        {
                            srcValue = [method.getDecimal(colorValue.substring(1,3)), method.getDecimal(colorValue.substring(3,5)), method.getDecimal(colorValue.substring(5,7))];
                        }
                    }
                }
                catch(e)
                {
                    srcValue = null;
                }
			}
			else
			{
				srcValue = Extend.getCurrentStyle(obj, i);
			}
			
			//获取目标属性值
			if(/color/i.test(i))
			{
			    if(params[i].indexOf("rgb") >= 0)
                {
                    var leftIdx = params[i].indexOf("(");
                    var rightIdx = params[i].indexOf(")");
                    var value = params[i].substring(leftIdx+1, rightIdx).split(",");
                    params[i] = "#" + method.getHex(parseInt(value[0]), 2) + method.getHex(parseInt(value[1]), 2) + method.getHex(parseInt(value[2]), 2);
			    }
			    desValue = [method.getDecimal(params[i].substring(1,3)), method.getDecimal(params[i].substring(3,5)), method.getDecimal(params[i].substring(5,7))];
			}
			else if(/^\D{1}/.test(params[i]) && typeof(params[i]) == "string")
			{
				desValue = parseFloat(params[i]) + parseFloat(srcValue);        //用于负数变换
			}
			else
			{
				desValue = params[i];
			}
			
			//如果运行时样式中没有该属性，可能是不合法的属性名
			if(srcValue)
			{
			    if(/color/i.test(i))
			    {
			        desObj[i] = desValue;
			        srcObj[i] = srcValue;
			        stepObj[i] = [(desValue[0] - srcValue[0]) / frames, (desValue[1] - srcValue[1]) / frames, (desValue[2] - srcValue[2]) / frames];
				}
				else
				{
				    srcValue = srcValue.replace(/auto/i, "0");      //如果属性值为auto，则改为0
				    if(!/[0-9]+/i.test(srcValue) || (srcValue.indexOf(" ") != -1))
				    {
					    continue;                                   //如果当前属性值不是数字或者为空，则无法进行动画处理
				    }
				    desObj[i] = parseFloat(desValue || 0);          //将属性i的值分当前值和目标值进行存放
				    srcObj[i] = parseFloat(srcValue || 0);
				    stepObj[i] = (desObj[i] - srcObj[i]) / frames;  //获取每个属性每帧的脚步值
				}
			}
		}

		//动画核心控制
		var timer = setInterval(function()
		{
			//停止动画时，将相关属性设置为最终的目标属性值，避免因误差而使效果失色
			if(frames <= 0)
			{
				clearInterval(timer);
				for(var i in stepObj)
				{
					if(/opacity/i.test(i))
					{
						try{
							obj.filters.alpha.opacity = desObj[i] * 100;
						}catch(e){
							obj.style[i] = desObj[i];
						}
					}
					else if(/color/i.test(i))
					{
					    obj.style[i] = params[i];
					}
					else
					{
						obj.style[i] = desObj[i] + "px";
					}
				}
				//是否隐藏元素
				if(hideEle)
				{
					obj.style.display = "none";
				}
				//是否执行后续操作
				if(runAtLast)
				{
				    if(delay)
				    {
				        setTimeout(function(){
				            runAtLast.call(obj);
				        },delay);
				    }
				    else
				    {
				        runAtLast.call(obj);
				    }
				}
				return false;
			}
			frames--;

			//针对每个属性进行值的重新设定
			for(var i in stepObj)
			{
				if(/opacity/i.test(i))//透明度值的改变
				{
					opacity += parseFloat(stepObj[i]);
					if(document.all){
						obj.filters.alpha.opacity = opacity*100;
					}else{
						obj.style.opacity = opacity;
					}
				}
				else if(/color/i.test(i))
				{
				    var r = method.getHex(parseInt(TweenChoose(totalTimes-frames,srcObj[i][0],desObj[i][0]-srcObj[i][0],totalTimes)), 2);
				    var g = method.getHex(parseInt(TweenChoose(totalTimes-frames,srcObj[i][1],desObj[i][1]-srcObj[i][1],totalTimes)), 2);
				    var b = method.getHex(parseInt(TweenChoose(totalTimes-frames,srcObj[i][2],desObj[i][2]-srcObj[i][2],totalTimes)), 2);
				    obj.style[i] = "#" + r + g + b;
				}
				else//width、height、left、top等带“px”单位的值的改变
				{
					try{
						obj.style[i] = (obj.style[i] ? TweenChoose(totalTimes-frames,srcObj[i],desObj[i]-srcObj[i],totalTimes) : srcObj[i] + stepObj[i]) + "px";
					}catch(e){
						obj.style[i] = "0px";
					}
				}
			}
		}, SPF);
		return timer;
	}
}

//============================================================================================================================//
//单图片预加载操作
/*=================
 *目标：实现单个图片的预加载操作
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-01-15
 *修改时间：2012-01-15
 *-----------------------------------
 *参数说明：
 *1. url: 需要预加载图片的地址；
 *2. callback: 图片加载完毕之后所需执行的回调函数；
 *3. num: （可取舍）在一些循环操作中，用于对目标图片进行标识；
 *==================================================*/
Extend.loadImg = function(url, callback, num)
{
	/*创建一个Image对象，实现图片的预下载*/
	var img = new Image();

	/*当图片下载完毕时异步调用callback函数*/
	img.onload = function()
	{
		img.onload = null;
		callback.call(img);	//将回调函数中的this指向img对象
	}

	/*对Image对象进行赋值(其中num值用于对该对象进行标识！)*/
	img.num = num;
	img.src = url;
}

//============================================================================================================================//
//实现整个页面图片的预加载操作
/*=================
 *目标：实现整个页面图片的预加载操作
 *说明：使用该函数时，必须将图片img的init_src自定义属性值设置为目标图片路径，这样才能实现后续的一些操作！
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2012-01-15
 *修改时间：2012-01-15
 *==================================================*/
Extend.reloadImg = function()
{
	//创建urls数组，保存页面中所有图片的链接地址(urls)和索引地址(nums)
	var stopRead = setInterval(function(){
		if(!window.RDImg)
		{
			window.RDImg = {};
			window.RDImg.images = [];
			window.RDImg.nums = [];
			window.RDImg.delEle = [0];
			for(var i = 0; i < document.images.length; i++)
			{
			    if(!isIE9 && document.images[i].getAttribute("init_src") != null && document.images[i].getAttribute("init_src") != "")
			    {
			        //默认设置图片的不透明度为0.
			        Extend.setStyle(document.images[i], "opacity", "0");
			    }
			    window.RDImg.images[i] = document.images[i];    //将图片引用转移到指定的集合
				window.RDImg.nums[i] = i;	//保存图片集合的序号
			}
		}

		for(var i = 1; i < window.RDImg.delEle.length; i++)
		{
			window.RDImg.nums.remove(window.RDImg.delEle[i]);
		}
		if(window.RDImg.nums.length <= 0)
		{
			clearInterval(stopRead);
			return false;
		}

		//实现图片随文档显示区域的变化而显示，文档显示在哪里，就仅只加载当前区域所在的图片
		window.RDImg.delEle = [0];
		for(var i = 0; i < window.RDImg.nums.length; i++)
		{
			if(Extend.isShow(window.RDImg.images[window.RDImg.nums[i]]) && (window.RDImg.images[window.RDImg.nums[i]].getBoundingClientRect().top < document.documentElement.clientHeight + 100))
			{
				Extend.loadImg(window.RDImg.images[window.RDImg.nums[i]].getAttribute("init_src"), function(){
				    if(!isIE9){
				        Extend.transform(window.RDImg.images[this.num], {opacity:1, duration:(isIE8 ? 0.2 : 0.3)}, Tween.Elastic.easeOut);
				    }
					window.RDImg.images[this.num].src = this.src;
				}, window.RDImg.nums[i]);
				window.RDImg.delEle[window.RDImg.delEle.length] = window.RDImg.nums[i];
			}
		}
	},200);
}

//============================================================================================================================//
//IE6下多级导航的JS代码实现
/*==============================
 *目标：IE6下多级导航的JS代码实现；
 *说明：本JS仅只负责类名的切换操作，关于二级菜单显示时的样式一律通过CSS来设置；
         导航标题选中时的样式，其类名为“sele”；
         导航内容显示时的样式，其类名为“show”；
         后期还需要添加淡入淡出、由上至下平滑下移的效果；
 *作者：Jerry_小猪;
 *创作时间：2012-01-17;
 *修改时间：2012-01-17;
 *--------------------------------
 *参数说明：
 *1. id：目标容器的ID值或对象引用；
 *==============================================*/
Extend.subNavShow = function(id)
{
    var ele = $(id);
    if(ele)
    {
        //为目标容器下所有的li标签添加事件，实现IE6下二级导航乃至多级导航的实现！
        var childs = ele.getElementsByTagName("li");
        for(var i = 0; i < childs.length; i++)
        {
            //仅当在li元素下还有二级菜单时添加事件
            if(childs[i].children.length == 2)
            {
                childs[i].onmouseover = function()
                {
                        this.children[0].className += " sele";  //鼠标悬浮时，为标题添加sele类名
                        this.children[1].className += " show";  //鼠标悬浮时，为内容添加show类名
                }
                childs[i].onmouseout = function()
                {
                    //鼠标移除时，移除sele和show类名
                    this.children[0].className = this.children[0].className.replace(/\s*sele/g,"")
                    this.children[1].className = this.children[1].className.replace(/\s*show/g,"")
                }
            }
        }
    }
}

//============================================================================================================================//
//选项卡切换
/*=================
 *目标：实现选项卡的切换
 *说明：选项卡标题与内容容器依次位于tab选项卡下，其中偶次元素为标题，奇次元素为内容。选中的标题的样式类名为“sele”，内容图层的样式类名为“show”。
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2011-06-03
 *修改时间：2011-12-07;2012-04-12;2012-05-01;
 *--------------------------------
 *参数说明：
 *1. id: 目标对象引用或ID属性值（也可以是一组id组，用于非规范布局时实现选项卡切换效果）;
 *2. eventName: 事件名称，在此可选择onclick和onmouseover，分别表示鼠标单击时触发和鼠标悬浮时触发,默认值为onmouseover;
 *3. defaultAlpha：切换时是否需要添加淡出效果，取值为0~1之间的任意小数，赋值为undefined或null则表示不需要此效果！
 *4. duration：当切换时是否需要添加淡出效果时，该属性值表示目标对象淡出过程所持续的总时间，默认为：（单位：秒）
 *==================================================*/
Extend.tabChange = function(id, eventName, defaultAlpha, duration)
{
    var tabIds = null;
    if(typeof(id) == "string" && String(id).indexOf(",") != -1)
    {
        //当为非规范布局时，传递对值ID来实现选项卡的切换（如：“容器ID,标题ID1,内容ID1,...,标题IDn,内容IDn”）
        tabIds = String(id).split(',');
        id = tabIds[0];
    }
    var obj = $(id);
    if(obj)
    {
        eventName = eventName == "onclick" ? "onclick" : "onmouseover";
        
        //保存元素集合
        var tabEles = [];				
        if(tabIds)
        {
            //非规则布局，通过ID值实现选项卡切换
            for(var i = 0; i < tabIds.length - 1; i++)
            {
                tabEles[i] = $(tabIds[i+1]);
            }
        }
        else if(obj.children.length > 1 && obj.children[0].tagName.toLowerCase() == "section")
        {
            /*
                结构为：
                <div>
                    <section>
                        <h2></h2>
                        <div></div>
                    </section>
                    <section>
                        <h2></h2>
                        <div></div>
                    </section>
                </div>
            */
            for(var i = 0; i < obj.children.length; i++)
            {
                if(obj.children[i].children.length == 2)
                {
                    tabEles[i*2] = obj.children[i].children[0];
                    tabEles[i*2 + 1] = obj.children[i].children[1];
                }
            }
        }
        else
        {
            /*
                结构为：
                <div>
                    <h2></h2>
                    <div></div>
                    <h2></h2>
                    <div></div>
                </div>
            */
            tabEles = obj.children;
        }
		
		//为元素添加事件监听器
        for(var i=0; i<tabEles.length; i+=2)
        {
            var ele = tabEles[i];
            ele.num = i;
            if(eventName == "onclick")
            {
                ele.onclick = function(){
                    tab_start(this.num);
                }
            }
            else
            {
                ele.onmouseover = function(){
                    tab_start(this.num);
                }
            }
            if(/sele/.test(ele.className)){ obj.choose = i; }   //保存当前选中项的标题序号
        }
	    
	    //选项卡切换的执行
        function tab_start(num)
        {
            if(obj.choose != num)
            {
                tabEles[obj.choose].className = tabEles[obj.choose].className.replace(/\s*sele/g,"");       //去掉原先被选中的标题元素的"sele"类名
                tabEles[obj.choose+1].className = tabEles[obj.choose+1].className.replace(/\s*show/g,"");   //去掉原先被选中的内容元素的"show"类名
                tabEles[num].className += " sele";	    //设置当前标题元素加上"sele"类名
                tabEles[num + 1].className += " show";  //设置当前内容容器加上“show”类名
                obj.choose = num;                       //记录当前被选中标题的序号值
            }
        }
    }
}
            
//============================================================================================================================//
//目标元素跟随浏览器的滚动条进行滑动
/*=================
 *目标：针对侧栏的高度与主体内容的高度之间的悬差，为了保证侧栏始终都有内容显示，特此设定侧栏的模块的位置将随着浏览器滚动条的滚动而进行相应的调整！
 *说明：因为此种方法会改变目标对象的定位方式，所以对于位于左侧的元素来说，必须在其原来的基础上，再添加一个容器，来保留目标对象原有的占用位置！
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2011-11-18
 *修改时间：2011-11-18; 2011-11-19; 2011-11-20; 2011-11-21;2012-01-29;2012-01-30;2012-01-31;2012-02-01;
 *-----------------------------------
 *参数说明：
 *1. id: 目标对象的引用或ID属性值
 *2. direction：标识目标对象位于父元素的哪一侧！“left”——左侧； “right“——右侧
 *==================================================*/
Extend.scrollWith=function(id, direction)
{
    var obj = $(id);
    if(obj)
    {
        var sizeHeight,parentHeight,locationWidth,parentBorderBottom,docHeight;
        Extend.addEvent(window, "onload", function()
        {
            locationWidth = obj.getBoundingClientRect().left - obj.parentNode.getBoundingClientRect().left; //目标对象距离父元素的水平距离
            parentBorderBottom = parseInt(Extend.getCurrentStyle(obj.parentNode, "borderBottomWidth"));     //目标父元素的下边框
            parentBorderBottom = (parentBorderBottom)?parentBorderBottom:0;
            if(Extend.getCurrentStyle(obj.parentNode, "position") == "static")
            {
                obj.parentNode.style.position = "relative";                                                 //设置目标父元素为定位元素
            }
            
            //预备操作：符合条件时，即进行调整工作
            var stopScrollWith = setInterval(prepare, 50);
        });
    }
    
    function prepare()
    {
        docHeight = document.documentElement.clientHeight;      //文档可视区域的高度
        sizeHeight = obj.offsetHeight;                          //目标对象的高度
        if(direction == "left")
        {
            //当目标对象位于左侧时，需要另外添加一个外围容器来辅助，此时设置这个外围容器的高度为目标对象原本父元素的有效高度
            var numR = (obj.parentNode == obj.parentNode.parentNode.children[0]) ? obj.parentNode.parentNode.children[1].offsetHeight : obj.parentNode.parentNode.children[0].offsetHeight;
            obj.parentNode.style.height = ((sizeHeight < numR) ? numR : sizeHeight) + "px"; 
        }
        parentHeight = obj.parentNode.offsetHeight;                                         //目标父元素的高度

        var positionNowY = obj.getBoundingClientRect().top;                                 //目标对象当前相对于文档顶端的绝对Y坐标 
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;      //浏览器滚动条位置
        var parentNowX = obj.parentNode.getBoundingClientRect().left;                       //父元素当前相对于body的x坐标
        var parentNowY = obj.parentNode.getBoundingClientRect().top;                        //父元素当前相对于body的y坐标
        if(!isIE6) obj.style.left = (parentNowX + locationWidth) + "px";                    //始终保持正确的水平位置
        if(!obj.disFromTop){obj.disFromTop = positionNowY + scrollTop;}                     //目标对象距离body顶端的距离
                
        if(scrollTop > obj.disFromTop)
        {
            goScroll(scrollTop, positionNowY, parentNowX, parentNowY);
        }
        else if(scrollTop <= obj.disFromTop )
        {
            obj.style.position = "static";
        }
    }
    
    //对目标对象的定位进行相应调整：
    function goScroll(scrollTop, positionNowY, parentNowX, parentNowY)
    {
        /*实现说明：
        *-----------------------------------------------------------
        *一、 当目标对象的高度小于浏览器文档显示区高度时
        *   1. 当浏览器滚动条的scrollTop值小于等于目标对象的原始位置disFromTop时，则默认为静态定位；
        *   2. 当目标对象的位置y小于等于0时，固定定位至文档显示区顶端；
        *   3. 当目标对象父元素的位置y小于（父元素的高度-目标对象的高度）的相反数时，则将其定位在父元素的底部；
        *
        *二、 当目标对象的高度大于浏览器文档显示区高度时
        *   1. 当浏览器滚动条的scrollTop值大于（目标对象至文档顶端的距离+目标父元素的高度-文档显示区高度）时，则将目标对象定位在父元素的底部；
        *   2. 当浏览器滚动条的scrollTop值大于（目标对象至文档顶端的距离+目标对象的高度-文档显示区高度）时，则将目标对象定位在文档显示区的底部；
        *   3. 否则，目标对象默认为静态定位显示！
        *=============================================================*/
        if(isIE6)
        {
            if(sizeHeight > docHeight)
            {
                if(scrollTop >= obj.disFromTop + parentHeight - docHeight)
                {
                    obj.status = 1;
                    obj.style.cssText = "position:absolute;left:auto;top:auto;right:0px;bottom:0px;";
                    obj.style.removeExpression("top");//移除关于top属性的expression表达式；
                }
                else if(scrollTop > obj.disFromTop + sizeHeight - docHeight)
                {
                    if(obj.status != 2) //在必要的时候方才执行以下操作，否则因为频繁的赋值而将导致最终效果偏离目标需求！
                    {
                        obj.status = 2;
                        obj.style.cssText = "position:absolute;left:auto;bottom:auto;right:0px;";
                        obj.style.setExpression("top","eval(document.documentElement.scrollTop + document.documentElement.clientHeight - this.offsetHeight - " + obj.disFromTop + ")");//添加关于top属性的expression表达式
                        document.documentElement.scrollTop += 1;   //触发目标对象进行重新定位
                    }
                    obj.style.position = "absolute";
                }
                else
                {
                    obj.status = 3;
                    obj.style.position = "static";
                }
            }
            else if(sizeHeight < docHeight)
            {
                if(parentNowY < 0 - (parentHeight - sizeHeight))
                {
                    obj.status = 4;
                    obj.style.cssText = "position:absolute;left:auto;top:auto;right:0px;bottom:0px;";
                    obj.style.removeExpression("top");
                }
                else if((obj.status == 4 && positionNowY > 0) || positionNowY < 0)
                {
                    obj.status = 5;
                    obj.style.cssText = "position:absolute;left:auto;bottom:auto;right:0px;";
                    obj.style.setExpression("top","eval(document.documentElement.scrollTop - " + obj.disFromTop +")");
                    document.documentElement.scrollTop += 1;
                }
            }
        }
        else
        {
            if(sizeHeight > docHeight)
            {
                if(scrollTop >= obj.disFromTop + parentHeight - docHeight)
                {
                    obj.style.position = "absolute";
                    obj.style.left = "auto";
                    obj.style.top = "auto";
                    obj.style.right = "0px";
                    obj.style.bottom = "0px";
                }
                else if(scrollTop > obj.disFromTop + sizeHeight - docHeight)
                {
                    obj.style.position = "fixed";
                    obj.style.top = "auto";
                    obj.style.left = (parentNowX + locationWidth) + "px"; 
                    obj.style.bottom = "0px";
                }
                else
                {
                    obj.style.position = "static";       
                }
            }
            else if(sizeHeight < docHeight)
            {
                if(parentNowY < 0 - (parentHeight - sizeHeight))
                {
                    obj.style.position = "fixed";
                    obj.style.bottom = "auto";
                    obj.style.top = (parentHeight - sizeHeight + parentNowY - parentBorderBottom) + "px";
                }
                else if(positionNowY < 0)
                {
                    obj.style.position = "fixed";
                    obj.style.bottom = "auto";
                    obj.style.right = "auto";
                    obj.style.left = (parentNowX + locationWidth) + "px"; 
                    obj.style.top = "0px";
                }
            }
        }  
    }
}

//============================================================================================================================//
//搜索跳转
/*=========================================
 *目标：传递相关文本框的ID，点击按钮后跳转到搜索页并传递搜索关键字;
 *说明：1.  在将关键字文本作为链接字符串的一部分上传到服务器上去时，应将其进行加密编码;
 *			针对Firefox、Opera、Safari、Chrome等浏览器使用escape()进行URL的编码，解码函数对应为unescape()；
 *			而IE6、7、8不支持使用escape方法对URL进行编码，所以使用encodeURL()来进行编码，解码函数对应为decodeURI()！
 *			注：Firefox、Opera、Safari、Chrome等浏览器使用encodeURL()方法对URL进行编码访问后地址栏中显示的地址结果是编码之前的地址，故才使用escape对URL进行编码。
 *      2.  IE6浏览器的onkeydown不支持文本框的“回车”事件，而onkeypress则支持；另外在其他所有浏览器中，onkeydown和onkeypress均支持“回车”事件！
 *作者：Jerry_小猪;
 *创建时间：2011-09-11;
 *修改日期：2011-09-11;
 *------------------------
 *1. text：文本框的ID值，默认值：“textKey”;
 *2. button: 按钮的ID值，默认值：“btnSearch”;
 *3. defaultText：文本框默认文本，默认值为：“请输入您所需了解的内容...”;
 *4. isKey：文本框默认的文本是否为有效的搜索关键字，默认值：false——表示为提示文本;
 *5. prefix：链接文本字符串的前缀，默认值：“/search/”;
 *6. suffix：链接文本字符串的后缀，默认值：“.html”;
 *7. openWithNewPage: 是否在新的页面中进行打开，默认值为true;
 *默认的搜索页链接字符串："/search/关键字文本.html";
 *=====================================================*/
Extend.search = function(text,button,defaultText,isKey,prefix,suffix,openWithNewPage)
{
	if(! text){text="txtKey";}
	if(! button){button="btnSearch";}
	if($(text) && $(button))
    {
		if(defaultText==undefined || defaultText==null){defaultText="请输入您所需查询的内容...";}
		if(prefix==undefined || suffix==null){prefix="/search/";}
		if(suffix==undefined || suffix==null){suffix=".html";}
		if(openWithNewPage == null || openWithNewPage == undefined){openWithNewPage = true;}
			
		var objText=$(text);
		var objButton=$(button);

		Extend.placeHolder(text,defaultText);   //设置文本框默认文本！
		objButton.onclick=function(){gotoSearch(false);}//点击按钮将进行跳转！
		objText.onkeypress=function(e){//输入文本框按回车键将进行跳转！
			e=(e)?e:event;
			if(e.keyCode==13){gotoSearch(true);return false;}
		}
	}

	function gotoSearch(isByEnter)
	{
        objText.value=objText.value.replace(/^\s*/,""); 
	    objText.value=objText.value.replace(/\s*$/,"");//去掉关键字输入框中的前尾空格！
    	if((!isKey && objText.value==defaultText)|| objText.value=="") {
    	    alert("请输入您所需查询的内容...");
    	    objText.focus();
		}else{
    	    try{//Firefox
    	        if(openWithNewPage){
    	            window.open(prefix+escape(objText.value)+suffix, "_blank");
    	        }else{
    	            location.href=prefix+escape(objText.value)+suffix;
    	        }
    	    }catch(e){//IE6、7、8
    	        if(openWithNewPage){
    	            window.open(prefix+encodeURI(objText.value)+suffix, "_blank");
    	        }else{
    	            location.href=prefix+encodeURI(objText.value)+suffix;
    	        }
            }
        }
    }
}

//============================================================================================================================//
//设置输入框的占位文本
/*==============================
 *目标：设置输入框的占位文本；
 *作者：Jerry_小猪;
 *创作时间：2011-05-28;
 *修改时间：2011-06-28;2012-05-23;
 *--------------------------------
 *参数说明：
 *1. id：目标输入框的ID值；
 *2. holderText：目标输入框的占位文本；
 *3. holderColor：目标输入框占位文本的颜色，颜色值必须是“#000000”、“#333fff”的格式值；
 *==============================================*/
Extend.placeHolder = function(id,holderText,holderColor)
{
	if($(id))    //如果存在目标对象
	{
		var txtBox = $(id);	//获取目标对象的引用
		var oldColor = txtBox.style.color;							//保存目标对象原有的颜色，oc表示“oldColor”的缩写。
		var holderColor = holderColor ? holderColor : "#AEAEAE";	//保存目标对象占位文本颜色，默认值为灰色，hc表示“holderColor”的缩写。

		txtBox.style.color = holderColor;							//设置占位文本的颜色
		txtBox.value = holderText;									//设置占位文本为当前输入框的值

		txtBox.onfocus = function(){						//当输入框接受焦点时，如果值与占位文本一致则设置为空，并恢复字体颜色
			if(this.value == holderText)
			{
				this.value = "";
				this.style.color = oldColor;
			}
		}
		txtBox.onblur=function(){							//当输入框失去焦点时，如果值为空，则显示占位文本，并设置占位文本颜色
			this.value = this.value.replace(/^\s*/,"");     //去掉前导空格
			this.value = this.value.replace(/\s*$/,"");     //去掉后导空格
			if(this.value == "")
			{
				this.value = holderText;
				this.style.color = holderColor;
			}
		}
	}
}

//============================================================================================================================//
//对象的拖动
/*=================
 *目标：实现对象的拖动操作
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2011-11-12
 *修改时间：2011-11-12;
 *--------------------------------
 *参数说明：
 *1. isParent:目标容器是否作为父级元素来使用；取值true或false，默认值为false；取值为true时，则表示删除目标容器下所有的空格文本节点；否则则删除目标容器的父级容器下的所有空格文本节点；
 *==================================================*/
//webApp.prototype.drag = function()
//{
//    var obj = this.obj;
//    obj.onmousedown = function(e)
//    {
//        e = e || window.event;
//        obj.x = e.clientX;
//        obj.y = e.clientY;
//        obj.style.left = webApp(obj).getCurrentStyle("left");
//        obj.style.top = webApp(obj).getCurrentStyle("top");
//        obj.move = true;
//    }
//    obj.onmousemove = function(e)
//    {
//        if(obj.move)
//        {
//            e = e || window.event;
//            var distanceX = e.clientX - obj.x;
//            var distanceY = e.clientY - obj.y;
//            obj.x = e.clientX;
//            obj.y = e.clientY;
//            
//            obj.style.left = (parseInt(obj.style.left) + distanceX) + "px";
//            obj.style.top = (parseInt(obj.style.top) + distanceY) + "px"; 
//        }
//    }
//    obj.onmouseup = function(e)
//    {
//        obj.move = false;
//    }
//}

//============================================================================================================================//
//弹出对话框
/*=================
 *目标：实现window.alert()方法相同的功能
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2011-11-04
 *修改时间：2011-11-04
 *--------------------------------
 *参数说明：
 *1. 
 *==================================================*/
//webApp.prototype.messageBox=function(title, text, showButton, useDefaultStyle, FuncOK, FuncCancel)
//{
//   /* if($("MessageBox"))
//    {
//        $("MessageBox").style.display = "block";
//    }
//    else
//    {
//        if(!useDefaultStyle){
//            
//        }
//        
//        var newEle = document.createElement("div");
//        newEle.id = "MessageBox";
//        var textHTML = "<div id=\"msgBG\"></div>";
//        textHTML += "<div class=\"content\">";
//        textHTML += "<strong id=\"msgTitle\">" + title + "</strong>";
//        textHTML += "<p id=\"msgContent\">" + text + "</p>";
//        textHTML += "<button id=\"msgOK\">确定</button>";
//        textHTML += "<button id=\"msgCancel\">取消</button>";
//        textHTML += "<button id=\"msgClose\">X</button>";
//        textHTML += "</div>";
//        newEle.innerHTML = textHTML;
//        document.body.appendChild(newEle);
//        
//        $("msgClose").onclick = function(){
//            
//            newEle.style.display = "none";
//        }
//        $("msgOK").onclick = function(){
//            if(FuncOK){ FuncOK();}
//            newEle.style.display = "none";
//        }
//        $("msgCancel").onclick = function(){
//            if(FuncCancel){FuncCancel();}
//            newEle.style.display = "none";
//        }
//    }
//    $("msgTitle").innerHTML = title;
//    $("msgContent").innerHTML = text;
//    if(!showButton){
//        $("msgOK").style.display = $("msgCancel").style.display = "none";
//    }else{
//        $("msgOK").style.display = $("msgCancel").style.display = "inline";
//    }
//    
//    if(!SH){var SH = new webApp.showHide("msgBG", "普通")}
//    
//    SH.defaultValue = 0;
//    SH.stopValue = 60;
//    SH.onInit();
//    SH.goStart();*/
//}

//============================================================================================================================//
//Ajax的操作实现
/*-----------------------
 *编写者：Jerry_小猪
 *QQ：569320261
 *创作日期：2011-10-26
 *修改日期：2011-10-27
 *-----------------------
 */
webApp.Ajax = function(method, target, send, callBack)
{
    this.method = method;           //请求的传送方式，大多数为“POST”方式，注意这里的POST应HTTP规范必须使用大写格式
    this.target = target;           //请求的目标页面
    this.send = send;               //请求所传递的数据参数（如：“name=yangtuan&psw=yt123”，在ASP.NET中通过Request.Params[]来获取该值），如果没有所需的数据参数，则设置该属性值为null
    this.encode = "application/x-www-form-urlencoded";  //编码方式；
    this.callBack = callBack;       //回调函数，当服务器响应成功且数据下载完毕之后，则执行该回调函数，并传递服务器的返回值responseText
}
webApp.Ajax.prototype=
{
    newXMLHttpRequest:function()
    {
        var XHR = null;
        if(window.XMLHttpRequest)
        {
            XHR = new XMLHttpRequest();                             // 为IE7及更高IE版本浏览器以及非IE浏览器创建Ajax核心控制器；
        }
        else
        {
            try
            {
                XHR = new ActiveXObject("Msxml2.xmlhttp");          //为较新版本的非7版IE浏览器创建xmlHTTP对象；
            }
            catch(e)
            {
                try
                {
                    XHR = new ActiveXObject("Microsoft.xmlhttp");   //为较老版本的非7版IE浏览器创建xmlHTTP对象；
                }
                catch(e2)
                {}
            }
        }
        return XHR;
    },
    onInit:function()
    {
        var thisobj = this;
        var xmlHttp = this.newXMLHttpRequest();                                             //Ajax核心控制器——XMLHttpRequest对象
        xmlHttp.open(this.method, this.target, true);                                       //参数设置；
        xmlHttp.setRequestHeader("Content-Type", this.encode);                              //编码方式；
        xmlHttp.onreadystatechange = function()                                             //回调处理函数；
        {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                thisobj.callBack(xmlHttp.responseText);                                     //当服务器响应成功且数据下载完毕，则调用目标处理函数，并传递返回值作为参数；
            }
        }
        xmlHttp.send(this.send);                                                            //提交请求；
    }
}

//============================================================================================================================//
//图层的移动
/*-----------------------
 *作者：Jerry_小猪
 *QQ：569320261
 *创作日期：2011-10-24
 *修改日期：2011-10-27;2011-10-28;2011-10-29
 *			2011-08-07：增加自动播放参数的设置autoChange.
 *-----------------------
 *目前该版本程序还有待改进...
 *其中将按钮替换为div表示以及按钮的渐显渐隐操作必须在第一时间解决！
 */
webApp.marquee=function(id, direct, totalTime, delay, btnInside, chgDirect, mouseoutDelay)
{
	if(!$(id)){ this.isExist = false; return false;}
	this.isExist = true;            //返回目标容器是否存在；
	/*只读属性*/
	this.obj = $(id);				//目标容器对象；
	this.id = this.obj.id;          //目标容器ID；
	this.FPS = 25;                  //每秒帧数；
	this.SPF = 1000/this.FPS;       //每帧间隔，即每移动一帧所需要的时间（单位：毫秒）；
	/*可读写属性*/
	this.totalTime = (totalTime) ? totalTime : 2.5;               //目标对象移动完每单位距离所需的时间（单位：秒）；
	this.direct = (direct) ? direct : "left";		            //对象移动的方向：“left”——向左；“right”——向右；“top”——向上；“bottom”——向下；
	this.delay = (delay) ? delay : 0;                           //每移动完每单位距离后所停留的时间；
	this.divLen = "100000px";                                   //用于装放移动对象的DIV的宽度或高度，通常为一个相对较大的值，以使移动对象的单个目标呈水平或垂直摆放；
	this.btnInside = (btnInside) ? btnInside : false;           //按钮是否在容器的内部
	this.chgDirect = (chgDirect) ? chgDirect : false;           //是否可由用户控制方向
	this.mouseoutDelay = (mouseoutDelay) ? mouseoutDelay : 0;   //鼠标从目标容器滑出后继续滚动前的延时
	this.autoChange = true;										//是否自动切换
	this.isInDelay = false;                                     //在允许延时的情况下，判定是否处于延时运动中
	this.isMoveInUser = false;                                  //是否处于用户控制的滚动之中
}
webApp.marquee.prototype=
{
	stopAll:function()
	{
		clearInterval(this.stopID);
		clearInterval(this.stopID2);
	},
	moveStart:function()
	{
		var thisobj = this;
		this.stopAll();
		this.stopID = setInterval(function(){ thisobj.moveGo(); }, this.SPF);
	},
	moveGo:function()
	{
		var thisobj = this;
		this.moveByUser();  //由用户控制进行移动
		this.moveDelay();   //是否进行延缓移动的前期处理
		this.moveDirect();  //确认移动方向并移动
		if(this.isInDelay && !this.isMoveOnMouseDown && ((this.direct == "left" || this.direct == "right") ? (this.wrapper.scrollLeft % this.aim.width == 0) : (this.wrapper.scrollTop % this.aim.height == 0)))
		{
			this.button1.hit = this.button2.hit = 0;
			this.step = this.stepBak;
			this.SPF = 1000/this.FPS;
			this.isInDelay = false;
			this.stopAll();
			if(this.isStopFromUser){
				this.isStopFromUser = false;
			}else{
				if(this.autoChange)
				{
					this.stopID2 = setTimeout(function(){thisobj.moveStart() }, thisobj.delay);
				}
			}
		}
	},
	moveByUser:function()
	{
		btnTimes = this.button1.hit || this.button2.hit;
		if(btnTimes > 0  && !this.isMoveInUser)
		{
			var isUserControlOpposite = false;
			this.step = parseInt((this.aim.width || this.aim.height) / (0.4*this.FPS));
			this.isMoveInUser = true;
			if(this.button1.hit > 0)
			{
				isUserControlOpposite = (this.direct == "right" || this.direct == "bottom") ? true : false;
				this.direct = (this.directBak == "left" || this.directBak == "right") ? "left" : "top";
			}
			else if(this.button2.hit > 0)
			{
				isUserControlOpposite = (this.direct == "left" || this.direct == "top") ? true : false;
				this.direct = (this.directBak == "left" || this.directBak == "right") ? "right" : "bottom";
			}

			var leftDistance = (this.wrapper.scrollLeft || this.wrapper.scrollTop) % (this.aim.width || this.aim.height);
			if(this.isStopFromUser)
			{
				this.distanceUserMove = (this.aim.width || this.aim.height) + ((this.direct == "right" || this.direct == "bottom") ? leftDistance : ((this.aim.width || this.aim.height) - leftDistance));
				this.isStopFromUser = false;
			}
			else if(this.distanceUserMove)
			{
				this.distanceUserMove += (this.aim.width || this.aim.height);
			}
			else if(isUserControlOpposite)
			{
				this.distanceUserMove = (this.aim.width || this.aim.height) + ((this.direct == "right" || this.direct == "bottom") ? leftDistance : ((this.aim.width || this.aim.height) - leftDistance));
			}
			else
			{
				this.distanceUserMove = (this.aim.width || this.aim.height) * ((this.direct == "right" || this.direct == "bottom")&&(leftDistance != 0) ? btnTimes-1 : btnTimes) + ((this.direct == "right" || this.direct == "bottom") ? leftDistance : -leftDistance);
			}
		}
		else if(this.isMoveOnMouseDown)
		{
			this.step = (this.aim.width || this.aim.height) * 0.6;
			this.SPF = 1;
			this.isMoveInUser = true;
			this.distanceUserMove = 0;
		}
		else if(!this.isMoveInUser)
		{
			this.step = (this.step == 1 || this.isMoveInUser) ? this.step : this.stepBak;
			this.direct = (this.chgDirect || this.isInDelay) ? this.direct : this.directBak;
		}
	},
	moveDelay:function()
	{
		if(this.delay && !this.isInDelay && !this.isMoveInUser)
		{
			switch(this.direct)
			{
				case "left":this.step = (this.wrapper.scrollLeft % this.aim.width >= this.aim.width * 0.9) ? 1 : ((this.isMoveInUser) ? this.step : this.stepBak); break;
				case "right":this.step = (this.wrapper.scrollLeft % this.aim.width <= this.aim.width * 0.1 && this.wrapper.scrollLeft % this.aim.width >= 1) ? 1 : ((this.isMoveInUser) ? this.step : this.stepBak); break;
				case "top":this.step = (this.wrapper.scrollTop % this.aim.height >= this.aim.height * 0.9) ? 1 : ((this.isMoveInUser) ? this.step : this.stepBak); break;
				case "bottom":this.step = (this.wrapper.scrollTop % this.aim.height <= this.aim.height * 0.1 && this.wrapper.scrollTop % this.aim.height >= 1) ? 1 : ((this.isMoveInUser) ? this.step : this.stepBak); break;
			}
			this.SPF = (this.step == 1) ? 1 : (1000/this.FPS);
			this.isInDelay = (this.step == 1) ? true : false;
		}
	},
	moveDirect:function()
	{
		var scrollLeft = (this.direct == "left" || this.direct == "right") ? (this.wrapper.scrollLeft % this.aim.width) : (this.wrapper.scrollTop % this.aim.height);
		if(this.isMoveInUser && this.distanceUserMove - this.step <= 0 && (scrollLeft != 0 || this.distanceUserMove != 0) && !this.isMoveOnMouseDown)
		{
			this.distanceUserMove = 0;
			this.step = 1;
			this.button1.hit = this.button2.hit = 0;
			this.isStopFromUser = true;
			this.isInDelay = true;
			this.isMoveInUser = false;
		}
		else if(this.isMoveInUser && this.distanceUserMove > 0)
		{
			this.distanceUserMove -= this.step;
		}

		switch(this.direct)
		{
			case "left":
			{
				if(this.wrapper.scrollLeft <= this.inner.offsetWidth){
					this.wrapper.scrollLeft += this.step;
				}else{
					this.wrapper.scrollLeft -= this.inner.offsetWidth;
				}
				break;
			}
			case "right":
			{
				if(this.wrapper.scrollLeft >= this.inner.offsetWidth - this.wrapper.offsetWidth){
					this.wrapper.scrollLeft -= this.step;
				}else{
					this.wrapper.scrollLeft += this.inner.offsetWidth;
				}
				break;
			}
			case "top":
			{
				if(this.wrapper.scrollTop <= this.inner.offsetHeight){
					this.wrapper.scrollTop += this.step;
					this.wrapper.scrollTop = (this.wrapper.scrollTop > this.inner.offsetHeight) ? 0 : this.wrapper.scrollTop;
				}else{
					this.wrapper.scrollTop -= this.inner.offsetHeight;
				}
				break;
			}
			case "bottom":
			{
				if(this.wrapper.scrollTop >= this.inner.offsetHeight - this.wrapper.offsetHeight){
					this.wrapper.scrollTop -= this.step;
				}else{
					this.wrapper.scrollTop += this.inner.offsetHeight;
				}
				break;
			}
		}
	},
	onInit:function()
	{
		var newEle = document.createElement("button");
		var newEle2 = document.createElement("button");
		newEle.id = this.id + "_Btn1";
		newEle2.id = this.id + "_Btn2";
		this.obj.appendChild(newEle);
		this.obj.appendChild(newEle2);
		this.button2 = this.obj.children[2]; this.button2.hit = 0;               //第二个控制按钮（右、下）
		this.button1 = this.obj.children[1]; this.button1.hit = 0;               //第一个控制按钮（左、上）
		this.wrapper = this.obj.children[0];                                    //移动对象的直属外围容器
		this.wrapper.innerHTML = "<div>" + this.wrapper.innerHTML + this.wrapper.innerHTML + "</div>";
		this.wrapper.children[0].style.cssText = (this.direct == "left" || this.direct == "right")?"float:left;width:" + this.divLen:"height:" + this.divLen;
		this.wrapper.moveStart = this.button1.moveStart = this.button2.moveStart = this.moveStart;
		this.wrapper.thisobj = this.button1.thisobj = this.button2.thisobj = this;
		if(this.btnInside)
		{
			var btn1 = this.button1;
			var btn2 = this.button2;
			btn1.style.cssText += ";filter:alpha(opacity=0);opacity:0;";
			btn2.style.cssText += ";filter:alpha(opacity=0);opacity:0;";
			Extend.addEvent(btn1, "onmouseover", function(){
				Extend.transform(btn1, {defaultAlpha:0,opacity:1,duration:0.3});
			});
			Extend.addEvent(btn2, "onmouseover", function(){
				Extend.transform(btn2, {defaultAlpha:0,opacity:1,duration:0.3});
			});
			Extend.addEvent(btn1, "onmouseout", function(){
				Extend.transform(btn1, {opacity:0,duration:0.3});
			});
			Extend.addEvent(btn2, "onmouseout", function(){
				Extend.transform(btn2, {opacity:0,duration:0.3});
			});

			this.obj.onmouseover = function()
			{
				this.children[0].thisobj.stopAll(this.children[0].thisobj);
			}
			this.obj.onmouseout = function()
			{
				this.children[2].hit = 0;
				this.children[1].hit = 0;
				this.children[0].thisobj.isMoveInUser = false;
				this.children[0].moveStart.call(this.children[0].thisobj);
				this.children[0].thisobj.button1.onmouseup.call(this.children[0].thisobj.button1);
			}
		}
		else
		{
			if(this.autoChange)
			{
				this.wrapper.onmouseover = this.button1.onmouseover = this.button2.onmouseover = function()
				{
					this.thisobj.stopAll(this.thisobj);
					clearInterval(this.stopDelayID);
				}
				this.wrapper.onmouseout = this.button1.onmouseout = this.button2.onmouseout = function()
				{
					this.thisobj.stopAll(this.thisobj);
					this.hit = 0;
					this.thisobj.isMoveInUser = false;
					this.thisobj.isStopFromUser = false;
					this.thisobj.button1.onmouseup.call(this.thisobj.button1);
					var thisobj = this;
					thisobj.stopDelayID = setTimeout(function(){thisobj.moveStart.call(thisobj.thisobj)},thisobj.thisobj.mouseoutDelay);
				}
			}
		}
		this.button1.onclick = this.button2.onclick = function()
		{
			clearInterval(this.thisobj.stopID2);
			this.thisobj.isMoveInUser = false;
			if(this.id.contains("_Btn1")){
				this.thisobj.button2.hit = 0;
			}else{
				this.thisobj.button1.hit = 0;
			}
			++this.hit;
			this.thisobj.moveStart.call(this.thisobj);
		}
		this.button1.onmousedown = this.button2.onmousedown= function(e)
		{
			var event = e || window.event;
			if(event.button != 2) //左键按下时
			{
				var thisobj = this;
				clearInterval(thisobj.thisobj.stopID2);
				thisobj.thisobj.moveStart.call(thisobj.thisobj);
				this.stopOnMouseDown = setTimeout(function(){
					if(thisobj.id.contains("_Btn1"))
					{
						if(thisobj.thisobj.direct == "right"){
							thisobj.thisobj.direct = "left";
						}else if(thisobj.thisobj.direct == "bottom"){
							thisobj.thisobj.direct = "top";
						}
					}
					else
					{
						if(thisobj.thisobj.direct == "left"){
							thisobj.thisobj.direct = "right";
						}else if(thisobj.thisobj.direct == "top"){
							thisobj.thisobj.direct = "bottom";
						}
					}
					thisobj.thisobj.isMoveOnMouseDown = true;
					clearInterval(thisobj.thisobj.stopID);
					thisobj.thisobj.moveStart.call(thisobj.thisobj);
				}, 200);
			}
		}
		this.button1.onmouseup = this.button2.onmouseup = function()
		{
			if(this.hit > 0 && this.thisobj.isMoveOnMouseDown){
				this.hit = 0;
			}
			clearInterval(this.stopOnMouseDown);
			this.thisobj.SPF = 1000 / this.thisobj.FPS;
			this.thisobj.isInDelay = false;
			if(this.thisobj.isMoveOnMouseDown){
				this.thisobj.isMoveOnMouseDown = false;
				this.thisobj.isMoveInUser = false;
				return false;
			}
		}
		this.inner = this.wrapper.children[0].children[0];  //移动对象的内围容器
		this.aim = this.inner.children[0];                  //移动对象的单个实体
		if(this.direct == "left" || this.direct == "right"){
			this.aim.width = parseInt(this.aim.offsetWidth + parseInt(Extend.getCurrentStyle(this.aim, "marginLeft")) + parseInt(Extend.getCurrentStyle(this.aim, "marginRight")));
		}else{
			this.aim.height = parseInt(this.aim.offsetHeight + parseInt(Extend.getCurrentStyle(this.aim, "marginTop")) + parseInt(Extend.getCurrentStyle(this.aim, "marginBottom")));
		}
		this.frames = this.FPS * this.totalTime;            //需要移动的总帧数
		this.step = parseInt((this.direct == "left" || this.direct == "right")?this.aim.width / this.frames : this.aim.height / this.frames); //每帧所需移动的单位距离
		this.step = (this.step <= 0) ? 1 : this.step;
		this.stepBak = this.step; //step值的备份
		this.directBak = this.direct; //direct值的备份
		this.delayBak = this.delay; //delay值的备份
		this.isInit = true; //确定已初始化
		if(this.autoChange){
			this.moveStart() //开始工作
		}
	}
}

//============================================================================================================================//
//幻灯片焦点图
/*=================
 *目标：实现常用的幻灯片焦点图效果以及选项卡切换，简化前端的工作复杂度；
 *说明：1. 图片与控制栏分离，控制栏由程序设置，结构只需图片； 
 *       2. 控制栏提供用户自定义接口，可用于设置控制栏的颜色、透明度、高度、标题提示以及序号标签等的表现；
 *       3. 切换效果包括无、渐变切换、上下滚动、左右滚动；
 *       4. 切换方式包括手动切换、自动切换；手动切换又分为鼠标悬浮时切换和鼠标点击时切换；鼠标点击时切换数字标签没有链接，而鼠标悬浮时切换数字标签则包含链接；
 *       5. 目标对象仅只一张图片或没有图片时，则不进行切换操作！
 *要点：1. 根据切换效果决定其布局方式
 *       2. 根据外观参数值设定界面显示效果
 *       3. 根据切换触发方式进行事件的监听
 *       4. 鼠标滑到图片或数字标签上时，暂停切换，鼠标移出则恢复切换状态
 *勿忘——该程序后期需要添加的功能：
 *       1. 数字标签自定义位置和样式；
 *       2. 按钮点击式切换；
 *       3. 幻灯片切换特效的实现；
 *作者：Jerry_小猪
 *QQ：569320261
 *创作时间：2011-11-27
 *修改时间：2011-11-27; 2011-11-30; 2011-12-01; 2011-12-02; 2011-12-05; 2011-12-06; 2011-12-07;
 *---------------------------------
 *参数说明：
 *1. id: 目标对象的引用或ID属性值（必参)
 *2. width: 幻灯片区域的宽度（必参，不带单位)
 *3. height: 幻灯片区域的高度（必参，不带单位)
 *4. direction: （可选参数）（取值为：left-向左；right-向右；up-向上；down-向下；left和right表示水平移动；up和down表示垂直移动）（没有该参数时，表示默认采用淡入淡出切换效果！）
 *----------------------------------
 *注：该版本程序在IE7中进行移动切换时，会在右侧或底部留有上一张幻灯图片的残余图像；另外该版本程序在IE浏览器中的切换速度与其他Firefox和Chromne浏览器相比相对较缓慢！
 *===========================================*/
webApp.slideshow = function(id, width, height, direction)
{
    if(!$(id)){ this.isExist = false; return false;}
    this.isExist = true;            //返回目标容器是否存在；
    //只读属性
    this.obj = $(id);               //目标对象
    this.id = this.obj.id;          //目标对象ID
    this.width = parseInt(width);   //宽度
    this.height = parseInt(height); //高度
    //可读写属性
    this.direction = direction;     //移动切换效果时的方向
    this.autoChange = true;         //是否自动切换
    this.totalTime = 1000;          //切换动作的间隔时间（单位：毫秒）
    this.delay = 3000;              //每次切换动作完毕之后所暂停的时间（单位：毫秒）
    this.duration = (this.direction == "left" || this.direction == "right") ? 0.6 : ((this.direction == "up" || this.direction == "down") ? 0.4 : 0.3);    //切换动作所持续的时间（单位：秒）（注：淡入淡出时默认为1秒；水平移动时推荐默认0.6秒；垂直移动时推荐默认0.4秒；如果没有达到目标效果，则自行设置其他的值！）
    this.tween = (this.duration == 0.6) ? Tween.Quart.easeOut : (!this.direction) ? Tween.Bounce.easeOut : Tween.Circ.easeInOut;                             //默认缓动效果（水平移动Tween.Quart.easeOut；垂直移动Tween.Circ.easeInOut）
    this.currentIndex = 0;          //当前显示幻灯片的索引序号
    this.oldIndex = 0;              //原先幻灯片的索引序号
    this.defaultStyle = 1;          //默认幻灯片显示样式(取值为1和2)
    this.eventName = "onmouseover"; //默认切换触发事件
    this.canMove = true;            //canMove设置为False时，用于暂停切换操作
    this.controlBar =               //控制栏属性设置
    {
        visible:true,
        height:"35px",
        fontSize:"14px",
        color:"#FFFFFF",
        background:"#08355C",
        opacity:0.5
    }
    this.label =                    //数字标签属性设置
    {
        visible:true,
        width:"18px",
        height:"18px",
        border:"1px solid #CCCCCC",
        marginLeft:"3px",
        fontSize:"12px",
        fontFamily:"Verdana",
        color:"#000000",
        background:"#FFFFFF",
        opacity:0.7
    }
    this.labelCurrent =             //当前数字标签属性设置
    {
        width:"18px",
        height:"18px",
        border:"1px solid #1188C0",
        fontSize:"14px",
        color:"#FFFFFF",
        background:"#1072AA"   
    }
}
webApp.slideshow.prototype=
{
    //切换方式的选择
    tab_Start:function(obj, userChoose, isDblClick)
    {
        obj.oldIndex = obj.currentIndex;
        obj.currentIndex = (userChoose || userChoose == 0) ? userChoose : ((obj.currentIndex == obj.amount -1) ? 0 : obj.currentIndex + 1);
        if(obj.oldIndex == obj.currentIndex && !isDblClick){
            return false;   //如果目标索引位置同当前位置相同，则不进行后续操作
        }
        if(obj.controlBar.visible){
            obj.eleControlBar.innerHTML = "<strong>" + obj.eleContent.children[(obj.direction == "right" || obj.direction == "down") ? (obj.amount - 1 - obj.currentIndex) : obj.currentIndex].children[0].alt + "</strong>";
            obj.eleControlBar.children[0].style.cssText = "display:block;width:"+ (obj.width - 60 - (parseInt(obj.label.width) + parseInt(obj.label.marginLeft))*obj.amount ) +"px;padding-left:10px;font-size:" + obj.controlBar.fontSize + ";color:" + obj.controlBar.color + ";text-align:left;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;";
        }
        if(obj.label.visible){
            obj.eleLabelNum.children[obj.oldIndex].style.cssText = obj.labelOldStyle;
            obj.eleLabelNum.children[obj.currentIndex].style.cssText += obj.labelCurrentStyle;
        }
        var eleOld = obj.eleContent.children[obj.oldIndex];
        var eleNow = obj.eleContent.children[obj.currentIndex];
        switch(obj.direction)
        {
            case "left":case "right":obj.tab_Horizontal(obj);break;
            case "up":case "down":obj.tab_Vertical(obj);break;
            default:obj.tab_Disslve(obj, eleOld, eleNow);break;
        }
    },
    //水平移动
    tab_Horizontal:function(obj)
    {
        var distance = -this.width*this.currentIndex;
        if(this.direction == "right"){
            distance = -this.width*(this.amount - 1 - this.currentIndex);
        }
        this.stopTrans1 = Extend.transform(this.eleContent, {left:distance, duration:obj.duration, noZIdx:true}, this.tween);
        this.tab_Auto(obj);
    },
    //垂直移动
    tab_Vertical:function(obj)
    {
        var distance = -this.height*this.currentIndex;
        if(this.direction == "down"){
            distance = -this.height*(this.amount - 1 - this.currentIndex);
        }
        this.stopTrans1 = Extend.transform(this.eleContent, {top:distance, duration:obj.duration, noZIdx:true}, this.tween);
        this.tab_Auto(obj);
    },
    //淡入淡出
    tab_Disslve:function(obj, eleOld, eleNow)
    {
        eleOld.style.zIndex = "1";
        eleNow.style.zIndex = "2";
        this.stopTrans1 = Extend.transform(eleOld, {defaultAlpha:1, opacity:0, duration:obj.duration, noZIdx:true}, this.tween);
        this.stopTrans2 = Extend.transform(eleNow, {defaultAlpha:0.2, opacity:1, duration:obj.duration, noZIdx:true}, this.tween);
        this.tab_Auto(obj);
    },
    //自动切换处理
    tab_Auto:function(obj)
    { 
        if(obj.autoChange)
        {
            clearInterval(obj.stopAuto);
            if(obj.canMove){
                obj.stopDelay = setTimeout(function(){ obj.tab_Start(obj) }, obj.delay);
            }
        }
    },
    //暂停切换
    tab_Pause:function(obj, moveGoOn)
    {
        obj.canMove = false;
        clearInterval(obj.stopAuto);
        if(!moveGoOn)
        {
            clearInterval(this.stopTrans1);
            clearInterval(this.stopTrans2);
            if(!this.direction){
                this.eleContent.children[this.oldIndex].style.cssText += "opacity:0;filter:alpha(opacity=0);";
            }
        }
        clearTimeout(obj.stopDelay);   
    },
    //继续切换
    tab_GoOn:function(obj)
    {
        obj.canMove = true;
        if(this.autoChange){
            obj.stopAuto = setInterval(function(){ obj.tab_Start(obj) },obj.totalTime);
        }
    },
    //初始化
    onInit:function()
    {
        var obj = this;
        this.amount = this.obj.children.length; //幻灯片总数
        if(this.amount < 1){
            return false; //如果图片数量为0，则不进行后续操作
        }
        if(isIE6 || isIE7 || isIE8){this.duration *= 0.75;}
        //当默认为第二种样式时
        if(this.defaultStyle == 2)
        {
            this.controlBar.background = "#000000";
            this.label.border = "1px solid #999999";
            this.label.color = "#CCCCCC";
            this.label.background = "#666666";
            this.labelCurrent.border = "1px solid #FF0000";
            this.labelCurrent.color = "#000A11";
            this.labelCurrent.background = "#CC0000";
        }
        
        //幻灯片文档结构的生成
        var eleWrapper = document.createElement("div");
        this.eleControlBar = document.createElement("div");
        this.eleContent = document.createElement("div");
        this.eleLabelNum = document.createElement("div");
        
        //图片区域结构
        this.eleContent.style.cssText = "position:absolute;left:0;top:0;width:" + this.width + "px;height:" + this.height + "px;overflow:hidden;";
        if(this.direction == "right" || this.direction == "down")
        {
            var childNodes = this.obj.children;
            for(var i = childNodes.length - 1; i >= 0; i--)
            {
                this.eleContent.appendChild(childNodes[i]); //当为向右、向下进行移动切换时，图片的文档结构顺序将进行逆序排列
            }
        }
        else
        {
            this.eleContent.innerHTML = this.obj.innerHTML;
        }
        var child_content = this.eleContent.children;
        for(var i = 0; i < this.amount; i++)
        {
            child_content[i].style.cssText = "display:block;width:" + this.width + "px;height:" + this.height + "px;overflow:hidden;";
            if(child_content[0].nodeName.toLowerCase() == "a")
            {
                child_content[i].children[0].width = this.width;
                child_content[i].children[0].height = this.height;
                child_content[i].children[0].style.cssText = "position:relative;display:block;width:" + this.width + "px;height:" + this.height + "px;border:none;";
            }
                       
            switch(this.direction)
            {
                case "left":case "right":
                    //水平移动
                    child_content[i].style.cssText += "position:static;float:left;display:inline;";
                    this.eleContent.style.width = (this.width * this.amount + 100) + "px";
                    break;
                case "up":case "down":
                    //垂直移动
                    child_content[i].style.cssText += "position:static;display:block;";
                    this.eleContent.style.height = (this.height * this.amount + 100) + "px";
                    break;
                default:
                    //淡入淡出
                    child_content[i].style.cssText = "position:absolute;left:0;top:0;z-index:0;display:block;width:100%;height:100%;opacity:0;filter:alpha(opacity=0);";
            }
        }
        switch(this.direction)
        {
            case "left":
                this.eleContent.style.left = -this.width*this.currentIndex + "px";
                break;
            case "right":
                this.eleContent.style.left = -this.width*(this.amount - 1 - this.currentIndex) + "px";
                break;
            case "up":
                this.eleContent.style.top = -this.height*this.currentIndex + "px";
                break;
            case "down":
                this.eleContent.style.top = -this.height*(this.amount - 1 - this.currentIndex) + "px";
                break;
            default:
                child_content[this.currentIndex].style.zIndex = "2";
                child_content[this.currentIndex].style.cssText += "opacity:1;filter:alpha(opacity=100);";
        }
        //鼠标滑上暂停切换   鼠标滑出继续切换
        this.eleContent.obj = this;
        this.eleContent.onmouseover = function(){
            this.obj.tab_Pause(this.obj, true);
        }
        this.eleContent.onmouseout = function(){
            this.obj.tab_GoOn(this.obj);
        }
        
        //数字标签区域结构
        if(this.label.visible)
        {
            this.labelOldStyle = "float:left;display:inline;width:" + this.label.width +";height:" + this.label.height + ";border:" + this.label.border +";margin-left:" + this.label.marginLeft +";font-size:" + this.label.fontSize +";line-height:" + this.label.height +";font-family:" + this.label.fontFamily +";text-align:center;text-decoration:none;color:" + this.label.color +";background:" + this.label.background +";cursor:pointer;opacity:" + this.label.opacity +";filter:alpha(opacity=" + this.label.opacity*100 +");";
            this.labelCurrentStyle = "text-decoration:none;width:" + this.label.width +";height:" + this.label.height + ";border:" + this.labelCurrent.border +";font-size:" + this.labelCurrent.fontSize + ";color:" + this.labelCurrent.color +";background:" + this.labelCurrent.background +";";
        
            this.eleLabelNum.style.cssText = "position:absolute;right:10px;bottom:5px;z-index:3;";
            if(this.eventName == "onmouseover")
            {
                for(var i = 0; i < this.amount; i++)
                {
                    var child_choose = document.createElement((child_content[0].nodeName.toLowerCase() == "a")? "a" : "span");
                    child_choose.style.cssText = this.labelOldStyle;
                    child_choose.innerHTML = String(i + 1);
                    if((child_content[0].nodeName.toLowerCase() == "a"))
                    {
                        if(this.direction == "right" || this.direction == "down"){
                            child_choose.href = child_content[this.amount - 1 - i].href;
                        }else{
                            child_choose.href = child_content[i].href;
                        }
                    }
                    
                    child_choose.obj = this;
                    child_choose.num = i;
                    child_choose.onmouseover = function(){
                        var obj = this.obj;
                        
                        obj.canMove = false;
                        clearInterval(obj.stopAuto);
                        clearInterval(obj.stopTrans1);
                        clearInterval(obj.stopTrans2);
                        if(!obj.direction && obj.oldIndex != this.num){
                            obj.eleContent.children[obj.oldIndex].style.cssText += "opacity:0;filter:alpha(opacity=0);";
                        }
                        clearTimeout(obj.stopDelay);
                        
                        obj.tab_Start(obj, this.num, false)
                    }
                    child_choose.onmouseout = function(){
                        this.obj.tab_GoOn(this.obj);
                    }
                    this.eleLabelNum.appendChild(child_choose);
                }
            }
            else if(this.eventName == "onclick")
            {
                for(var i = 0; i < this.amount; i++)
                {
                    var child_choose = document.createElement("span");
                    child_choose.style.cssText = "float:left;display:inline;width:" + this.label.width +";height:" + this.label.height +";border:" + this.label.border +";margin-left:" + this.label.marginLeft +";font-size:" + this.label.fontSize +";line-height:" + this.label.height +";font-family:" + this.label.fontFamily +";text-align:center;text-decoration:none;color:" + this.label.color +";background:" + this.label.background +";cursor:pointer;opacity:" + this.label.opacity +";filter:alpha(opacity=" + this.label.opacity*100 +");";
                    child_choose.innerHTML = String(i + 1);
                    
                    child_choose.obj = this;
                    child_choose.num = i;
                    child_choose.onmouseover = function(){
                        this.obj.tab_Pause(this.obj, true);
                    }
                    child_choose.onmouseout = function(){
                        this.obj.tab_GoOn(this.obj);
                    }
                    child_choose.onclick = function(){
                        var obj = this.obj;
                        
                        obj.canMove = false;
                        clearInterval(obj.stopAuto);
                        clearInterval(obj.stopTrans1);
                        clearInterval(obj.stopTrans2);
                        clearTimeout(obj.stopDelay); 
                        if(!obj.direction){
                            obj.eleContent.children[obj.oldIndex].style.cssText += "opacity:0;filter:alpha(opacity=0);";
                        }
                        
                        obj.tab_Start(obj, this.num, true);
                    }
                    this.eleLabelNum.appendChild(child_choose);
                }
            }
            this.eleLabelNum.children[this.currentIndex].style.cssText += this.labelCurrentStyle;
        }
               
        //控制栏区域结构
        if(this.controlBar.visible)
        {
            this.eleControlBar.innerHTML = "<strong>" + child_content[(this.direction == "right" || this.direction == "down") ? (this.amount - 1 - this.currentIndex) : this.currentIndex].children[0].alt +"</strong>";
            this.eleControlBar.style.cssText = "position:absolute;left:0;bottom:0;z-index:3;width:" + this.width + "px;height:" + this.controlBar.height + ";line-height:" + this.controlBar.height + ";background:" + this.controlBar.background + ";opacity:" + this.controlBar.opacity + ";filter:alpha(opacity=" + this.controlBar.opacity*100 + ");overflow:hidden;";
            this.eleControlBar.children[0].style.cssText = "display:block;width:"+ (this.width - 60 - (parseInt(this.label.width) + parseInt(this.label.marginLeft))*this.amount ) +"px;padding-left:10px;font-size:" + this.controlBar.fontSize + ";color:" + this.controlBar.color + ";text-align:left;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;";
        }
        
        //文档结构最终合成
        eleWrapper.style.cssText = "position:relative;z-index:10;width:" + this.width + "px;height:" + this.height + "px;overflow:hidden;";
        eleWrapper.appendChild(this.eleContent);
        if(this.controlBar.visible){
            eleWrapper.appendChild(this.eleControlBar);
        }
        if(this.label.visible && this.amount >= 2){
            eleWrapper.appendChild(this.eleLabelNum);
        }
        this.obj.innerHTML = "";
        this.obj.appendChild(eleWrapper);
        
        if(this.amount < 2){
            return false; //如果图片数量小于2，则不进行切换操作
        }
        
        //进行自动切换
        if(this.autoChange)
        {
            this.stopAuto = setInterval(function(){ obj.tab_Start(obj) },this.totalTime);
        }
    }
}

//============================================================================================================================//
//列表页页码跳转
function jumpPage(id, currentPage, totalPage, url)
{
	/*=========================================
	 *目标：实现列表页码的跳转
	 *作者：Jerry_小猪;
	 *创建时间：2012-01-11;
	 *修改日期：2012-01-11;
	 *------------------------
	 *1. id: 跳转页码输入的文本框ID;
	 *2. currentPage: 当前页码;
	 *3. totalPage: 分页的总数量;
	 *4. url: 目标跳转页面（地址中的目标页码默认为@@，在进行跳转之前需要进行替换！）
	 *=====================================================*/
    var txtPage = $(id);
    if(txtPage)
    {
        var pageNo = parseInt(txtPage.value,10);
                
        if(isNaN(pageNo) || pageNo <= 0 || pageNo > totalPage){
            alert("请输入正确的页码...");
            txtPage.focus();
            txtPage.select();
            return false;
        }
        if(pageNo == parseInt(currentPage,10))
        {
            return false;
        }
        location.href = url.replace("@@",pageNo);
    }
}

//============================================================================================================================//
/*垂直二级导航的实现*/
function navShow(id)
{
    if($(id))
    {
        var navEles=$(id).children;
        var currentShow=navEles[0];
        
        for(var i=0;i<navEles.length;i++)
        {
            navEles[i].id=id+(i+1);
            navEles[i].onmouseover=function(){
                for(var i=0;i<navEles.length;i++)//设置所有标题的透明度：带"alpha0"的透明度为半透明，否则为不透明！
                {
                    navEles[i].children[0].className+="alpha0";
                    if(! ("hasAttribute" in document.body)){navEles[i].children[0].className+=" hidden";}//IE6/7中二级导航被遮暂时解决方案
                }
                this.children[0].className=this.children[0].className.replace(/\s*alpha0/,"").replace(/\s*hidden/,"");//单独设置当前选中标题的透明度
                
                
                currentShow.children[1].style.display="none";
                this.children[1].style.display="block";
                currentShow=this;
            }
            navEles[i].onmouseout=function(){
                this.alphaValue=0;
                currentShow.children[1].style.display="none";
                
                for(var i=0;i<navEles.length;i++)//恢复所有标题的透明度
                {
                    navEles[i].children[0].className=navEles[i].children[0].className.replace(/\s*alpha0/,"").replace(/\s*hidden/,"");
                }
            }
        }
    }
}

//============================================================================================================
//鼠标点击文章页内容，在鼠标点击处显示咨询按钮，再次点击则隐藏，又点击则再次显示：
//作者：郑东伟
//时间：未知
function mouseCoords(ev) 
{
    if (ev.pageX || ev.pageY)
	{
        return{
            x: ev.pageX,
            y: ev.pageY
        };
    }
    if (window.ActiveXObject)
	{
        return{
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.documentElement.scrollTop - document.documentElement.clientTop
        };
    }
	else
	{
        return{
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }
}
var ImgBox = false;
function showImgBox(pos)
{
    if (document.getElementById("showInfoImg") == null)
	{
        var Cdiv = document.createElement("div");
        Cdiv.id = "showInfoImg";
        Cdiv.innerHTML = "<div style=\"float:left;\"><a href=\"javascript:void(0)\" target=\"_self\" onclick=\"zixun(\'newsclick\')\"\><img src=\"/images/showszixun.gif\" alt=\"在线咨询\" /></a></div>";
        styleStr = "left:" + (((pos.x + 2) > 0) ? (pos.x + 2) : pos.x) + "px;top:" + (pos.y) + "px;position:absolute;width:" + 102 + "px;";
        Cdiv.style.cssText = styleStr;
        document.body.appendChild(Cdiv);
        ImgBox = true;
    }
	else
	{
        if (ImgBox)
		{
            document.getElementById("showInfoImg").style.display = "none";
            ImgBox = false;
        }
		else
		{
            styleStr = "left:" + (((pos.x + 2) > 0) ? (pos.x + 2) : pos.x) + "px;top:" + (pos.y) + "px;position:absolute;width:" + 102 + "px;display:block;";
            document.getElementById("showInfoImg").style.cssText = styleStr;
            document.getElementById("showInfoImg").style.display = "block";
            ImgBox = true;
        }
    }
}
function showImg(ev)
{
    var objPos = mouseCoords(ev);
    showImgBox(objPos);
}
function show_newsbtn()
{
    if ($("_#newsInfo") != null)
	{
        if (document.all)
		{
            $("_#newsInfo").onmouseup = function()
			{
                showImg(event);
            }
        }
		else
		{
            $("_#newsInfo").setAttribute("onmouseup", "showImg(event);");
        }
    }
}


//============================================================================================================
//去掉其他漂浮框
(function hideSomething()
{
    var obj = $("EG0phD8f");
    if(obj)
    {
        obj.innerHTML = "";
        obj.style.display = "none";
        var objPar = obj.parentNode;
        objPar.removeChild(obj);
    }
    else
    {
        setTimeout(function(){ hideSomething(); }, 20);
    }
})();
document.write("<style type='text/css'>#EG0phD8f{display:none !important;}</style>");