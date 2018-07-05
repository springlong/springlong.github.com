//幻灯片播放，效果仅支持IE，其他高级浏览器无效果
/*----------------------------------
 *编写者：龙泉
 *QQ：569320261
 *创作日期：2012-10-20
 *完成日期：2012-10-31
 *----------------------------------
 *参数说明：
 *1. id：（类型：string，必备）目标容器ID
 *2. width: （类型，number，必备）容器宽度
 *3. height：（类型：number，必备）容器高度
 *2. param：（类型：json，必备）参数设置：
 *		type：		（类型：number）效果的类型；0——无效果，1——随机效果，2——调整性渐变效果，3——标准性渐变
 *		event: 		（类型：string）数字标签的触发事件，mouseover——鼠标悬浮时触发，click——鼠标点击时触发，默认为click
 *		duration：	（类型：number，单位：秒）单个切换总时间
 *		delay：		（类型：number，单位：毫秒）切换之间停留的时间
 *		auto: 		（类型：boolean）是否自动进行切换
 *		custom:    	（类型：boolean）是否自定义CSS样式代码。
 *		showNext: 	（类型：number）对上一张和下一张的控制，0——不显示，1——显示且自由定位，2——在1的基础上增加功能：鼠标移至图片上方显示按钮，鼠标移出图片将其隐藏
 *		showText:   （类型：boolean）是否显示文本，默认为true
 *		showNum：   （类型：boolean）是否显示数字标签，默认为true
 *=================================================================================*/
function revealTrans(id, width, height, param){
	this.id = id;
	this.obj = document.getElementById(id);
	this.width = width;
	this.height = height;
	this.type = param && param.type ? param.type : 0;
	this.event = param && param.event === "mouseover" ? "mouseover" : "click";
	this.duration = param && param.duration ? param.duration : 0.6;
	this.delay = param && param.delay ? param.delay : 5000;
	this.auto = param && param.auto ? param.auto : false;
	this.custom = param && param.custom === true ? true : false;
	this.showNext = param && param.showNext ? param.showNext : 0;
	this.showText = param && param.showText === false ? false : true;
	this.showNum = param && param.showNum === false ? false : true;
	this.list = []; //图片列表集合
	this.cur = 0;	//当前序号
	this.stopID = 0; //计时器ID
	this.image = null;//图片链接节点
	this.text = null; //文本展示节点
	this.num = null;  //数字标签节点
	this.css = {
		//数字标签的外围容器
		num: ";position:absolute;right:10px;bottom:5px;z-index:4;overflow:hidden;height:20px;",
		//数字标签本身
		num_a: ";float:left;display:inline;width:18px;height:18px;border:1px solid #ccc;margin-left:3px;font-family:Verdana;font-size:12px;line-height:18px;text-indent:0px;text-align:center;text-decoration:none;color:#000;background:#fff;opacity:0.7;filter:alpha(opacity=70);cursor:pointer;",
		//数字标签悬浮时
		num_a_h: ";border:1px solid #1188C0;font-size:14px;color:#fff;background:#1072AA;",
		//数字标签每单位总宽度(包括width+padding+border+margin），如果在默认样式的基础上修改了标签盒模型的属性时，务必重新给该属性赋值。
		num_width: 23,
		//上一张
		prev: ";position:absolute;left:0;top:50%;width:40px;height:40px;margin-top:-20px;background:url(/images/public/prev.png) no-repeat;_background-image:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/images/public/prev.png');cursor:pointer;",
		//下一张
		next: ";position:absolute;right:0;top:50%;width:40px;height:40px;margin-top:-20px;background:url(/images/public/next.png) no-repeat;_background-image:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/images/public/next.png');cursor:pointer;",
		//文本外围容器
		text: ";position:absolute;left:0px;bottom:0px;_bottom:-1px;z-index:3;width:100%;height:35px;line-height:35px;background:#08355C;opacity:0.5;filter:alpha(opacity=50);overflow:hidden;",
		//文本strong
		text_s: ";display:block;height:100%;padding-left:10px;font-size:14px;color:#fff;text-align:left;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;"
	}
}
revealTrans.prototype = {
	//初始化构建
	init: function(){
		var _this = this, 
			id = _this.id,
			obj = _this.obj,
			list = _this.list,
			bind = _this.bind,
			css = _this.css,
			showNext = _this.showNext,
			type = _this.type,
			domF = document.createDocumentFragment(),
			labelA = _this.event === "mouseover",
			custom = _this.custom,
			dom1, dom2, domF, span, image, text, num;

		if(list.length < 1){ obj.style.display = "none"; return 0; } //如果图片小于1张，则不执行后续代码

		//调整文本strong的宽度
		css.text_s += "width:" + (_this.width - css.num_width * list.length - 40) + "px";

		//图片链接节点
		obj.innerHTML = '<a style="display:block;" href="' + list[0][2] + '" target="' + (list[0][3] || "") + '"><img style="display:block;vertical-align:baseline;" src="' + list[0][0] + '" width="' + _this.width + '" height="' + _this.height + '" alt="' + list[0][1] + '" /></a>';
		image = obj.children[0];
		if(document.all && type !== 0){
			//添加动画滤镜（每次添加滤镜，都会使IE占用内存更多，所以一个动画效果仅添加一次滤镜）
			image.children[0].style.cssText += ";filter:" + _this.getFilter(type);
		}

		if(list.length < 2){ return 0; } //如果图片小于2张，则不执行后续代码

		//文本展示
		text = document.createElement("div");
		text.id = id + "_text";
		text.innerHTML = "<strong" + (!custom ? " style=\"" + css.text_s + "\"" : "") + "></strong>";
		text.style.display = _this.showText ? "block" : "none";
		domF.appendChild(text);

		//数字标签
		num = document.createElement("div");
		num.id = id + "_num";
		num.style.display = _this.showNum ? "block" : "none";
		for(i = 0, l = list.length; i < l; i++){
			span = document.createElement(labelA ? "a" : "span");
			span.i = i;
			span.className = "span_" + i + (i === 0 ? " sele" : "");
			if(!custom){
				span.style.cssText = css.num_a;
				i === 0 && (span.style.cssText += css.num_a_h);
			}
			span.innerHTML = i + 1;
			if(labelA){
				span.href = list[i][2];
				span.target = list[i][3] || "";
			}
			bind(span, _this.event, function(e){
				e = e || window.event;
				var target = e.target || e.srcElement;
				_this.play(target.i);
			});
			num.appendChild(span);
		}
		domF.appendChild(num);

		//上一张
		dom1 = document.createElement("div");;
		dom1.id = id + "_prev";
		bind(dom1, "click", function(){
			_this.prev();
		});
		domF.appendChild(dom1);

		//下一张
		dom2 = document.createElement("div");;
		dom2.id = id + "_next";
		bind(dom2, "click", function(){
			_this.next();
		});
		domF.appendChild(dom2);

		//添加到DOM
		if(!custom){
			//默认样式的添加
			text.style.cssText += css.text;
			text = text.children[0];
			text.innerHTML = list[0][1];
			num.style.cssText += css.num;
			dom1.style.cssText += css.prev;
			dom2.style.cssText += css.next;
		}
		obj.appendChild(domF);

		//控制上一张与下一张按钮
		if(showNext !== 1){
			dom1.style.display = "none";
			dom2.style.display = "none";
			if(showNext === 2){
				bind(obj, "mouseover", function(){
					dom1.style.display = "block";
					dom2.style.display = "block";
				});
				bind(obj, "mouseout", function(){
					dom1.style.display = "none";
					dom2.style.display = "none";
				});
			}
		}

		//是否自动切换
		if(_this.auto){
			_this.autoChange();
			bind(obj, "mouseover", function(){
				_this.pause();
			});
			bind(obj, "mouseout", function(){
				_this.autoChange();
			});
		}
		
		_this.image = image;
		_this.text = text;
		_this.num = num;
	},

	//自动切换
	autoChange: function(){
		var _this = this;
		_this.stopID = setInterval(function(){
			_this.next();
		}, _this.duration + _this.delay);
	},

	//暂停
	pause: function(){
		clearInterval(this.stopID);
	},

	//播放
	play: function(index){
		var _this = this,
			list = _this.list,
			len = list.length,
			cur = _this.cur,
			image = _this.image,
			type = _this.type,
			text = _this.text,
			css = _this.css,
			custom = _this.custom,
			numChild = _this.num.children;

		index = (index >= len) ? 0 : (index < 0 ? len - 1 : index);	//校正index值
		if(index != cur){
			numChild[cur].className = numChild[cur].className.replace(/\s+sele/g, "");
			numChild[index].className += " sele";
			if(!custom){
				numChild[cur].style.cssText = css.num_a;
				numChild[index].style.cssText += css.num_a_h;
			}
			image.href = list[index][2];
			image.target = list[index][3] || "";
			image.children[0].alt = list[index][1];
			if(type !== 0){
				_this.show(index);
			}else{
				image.children[0].src = list[index][0];
			}
			text.innerHTML = list[index][1];
			_this.cur = index;
		}
	},

	//效果显示
	show: function(index){
		var _this = this,
			list = _this.list,
			child = _this.image.children[0];

		if(document.all){
			var	duration = _this.duration, 
				img = _this.image.children[0];

			try{
				var filter = img.filters[0],
					num = [1,10,12,17,19,1,10,12,17,19]; //减少重复次数

				_this.type === 1 && (filter.transition = num[parseInt(Math.random()*10)]);
				filter.duration = duration;
				filter.apply();
				child.src = list[index][0];
				filter.play();
			}catch(e){
				child.src = list[index][0];
			}
		}else{
			child.src = list[index][0];
		}
	},

	//上一张
	prev: function(){
		this.play(this.cur - 1);
	},

	//下一张
	next: function(){
		this.play(this.cur + 1);
	},

	//绑定事件
	bind: function(obj, eventName, func, isCapture){
		"addEventListener" in document ? obj.addEventListener(eventName, func, isCapture) : obj.attachEvent("on" + eventName, func);
	},

	//添加图片列表
	add: function(data){
		this.list.push(data);
	},

	//获取滤镜信息
	getFilter: function(type){
		var filterTrans = [];
		switch(type){
			case 1:
				//随机变换效果
				filterTrans = ["progid:DXImageTransform.Microsoft.RevealTrans(enabled=true,transition=23);"];
				break;
			case 2:
				//可调整渐变
				filterTrans = ["progid:DXImageTransform.Microsoft.Fade(enabled=ture,overlap=0.2);"]; 
				break;
			case 3:
				//标准渐变
				filterTrans = ["BlendTrans(enabled=true,percent=10)"];
				break;
			default:
				//模糊推进
				filterTrans = ["progid:DXImageTransform.Microsoft.GradientWipe(GradientSize=0.5,wipestyle=0,motion=forward)"];
		}
		return filterTrans;
	}
}