function $(id){return document.getElementById(id);}

//============================================================================================================================//
//图层的移动
function marquee2(wrapper,isParent,inner,direct,distance,step,userStep,speed,delay,percent,directChangeAuto,btnLeft,btnRight,btnTop,btnBottom)
{
    /*======================================
     *目标：实现指定对象的移动效果；
     *作者：Jerry_小猪;
     *创作时间：2011-06-12;
     *修改时间：2011-06-15;
     *--------------------------------
     *参数说明：
     *wrapper：表示移动对象的外围容器；
	 *isParent: 用来判断wrapper对象是否作为目标对象的最终外围容器来使用！取值为true和false；
     *inner：表示移动对象本身；
     *direct：标识移动对象默认的移动方向；取值：left——向左；right——向右；top——向上；bottom——向下；
     *distance：表示组成移动对象的每一个独立部分的宽度；
     *step：表示移动对象每次移动的距离，单位（px）；该参数的某个倍数必须大于distance独立宽度的十分之一且小于distance宽度值，这样才能使对象的移动更加顺利！
     *userStep：表示由用户控制对象移动时的单位移动距离，单位（px）；
     *speed：表示移动对象每次移动的时间间隔，单位（ms）；
     *delay：表示移动对象每移动一个独立部分的宽度后，需要暂停移动的时间，单位（ms）；
     *percent：在暂停移动之前，有一段距离需要缓冲，这段距离的移动速度相对较慢，该参数决定从哪个百分位置起开始进行这个缓冲；取值0~100！
     *directChangeAuto: 决定点击相应方向按钮后，是否自动变更方向；
	 *btnLeft：表示可供用户点击的向左移动的按钮ID；
     *btnRight：表示可供用户点击的向右移动的按钮ID；
     *btnTop：表示可供用户点击的向上移动的按钮ID；
     *btnBottom：表示可供用户点击的向下移动的按钮ID；
     *问题说明：如果有多个对象同时调用这个函数，后调用对象的参数值不会覆盖掉先调用对象的参数值，但是在函数中所声明的所有变量都将被后调用对象的再次使用而被覆盖
     *          因此在实现多对象都能调用该函数并且实现正确效果时，需要对在函数中声明的所有变量都归为某一对象的私有值，这样就不会被后来对象所覆盖了！
     *          一个好的解决方法就是将函数中所需用到的变量作为一个属性值添加到移动对象的外围容器中！
     *==================================================================================*/
	if($(wrapper))
	{
	    //设置参数的默认值
		if(step!=0 && !step){step=20;}			//当step参数为0时，表示目标对象将不进行自动移动，即不对其进行计时上的操作；
		if(! userStep){userStep=20;}
		if(! speed){speed=20;}
		if(! delay && delay!=0){delay=1000;}
		if(! percent && percent!=0){percent=90;}//delay参数和percent参数任意一个为0，则表示不进行对象的暂停移动操作！
		if(directChangeAuto==undefined){directChangeAuto=true;}

		var wrapper=$(wrapper);
		var inner=$(inner);
		var inner2=inner.parentNode.appendChild(inner.cloneNode(true));	//复制移动对象并添加在其后面；
		inner2.id+="2";			                                        //新复制的对象ID在原来的基础加上“2”；

		//用户点击控制按钮时，进行的操作
		wrapper.userMoveLeft=0;				//保存用户点击向左移动的次数
		wrapper.userMoveRight=0;			//保存用户点击向右移动的次数
		wrapper.userMoveTop=0;				//保存用户点击向上移动的次数
		wrapper.userMoveBottom=0;			//保存用户点击向下移动的次数
		if($(btnLeft)){
			$(btnLeft).onclick=function(){
				stopAll();
				wrapper.userMoveRight=0;
				wrapper.userMoveLeft+=1;
				if(directChangeAuto){direct="left";}
				wrapper.stopMove=setInterval(moveStartLeft,speed);
			}
			$(btnLeft).onmouseout=function(){
				wrapper.userMoveLeft=0;
			}
		}
		if($(btnRight)){
			$(btnRight).onclick=function(){
				stopAll();
				wrapper.userMoveLeft=0;
				wrapper.userMoveRight+=1;
				if(directChangeAuto){direct="right";}
				wrapper.stopMove=setInterval(moveStartRight,speed);
			}
			$(btnRight).onmouseout=function(){
				wrapper.userMoveRight=0;
			}
		}
		if($(btnTop)){
			$(btnTop).onclick=function(){
				stopAll();
				wrapper.serMoveBottom=0;
				wrapper.userMoveTop+=1;
				if(directChangeAuto){direct="top";}
				wrapper.stopMove=setInterval(moveStartTop,speed);
			}
			$(btnTop).onmouseout=function(){
				wrapper.userMoveTop=0;
			}
		}
		if($(btnBottom)){
			$(btnBottom).onclick=function(){
				stopAll();
				wrapper.userMoveTop=0;
				wrapper.userMoveBottom+=1;
				if(directChangeAuto){direct="bottom";}
				wrapper.stopMove=setInterval(moveStartBottom,speed);
			}
			$(btnBottom).onmouseout=function(){
				wrapper.userMoveBottom=0;
			}
		}

		if(step!=0){moveDir(direct);}   //如果step参数不等于0，则开始对象的自动移动

		wrapper.stopDelay=0;
		wrapper.stopTimeout=0;

		if(isParent)	//wrapper作为目标对象的最终外围容器来使用
		{
			wrapper.onmouseover=function(){mouseover();}
			wrapper.onmouseout=function(){mouseout();}
		}
		else
		{
			wrapper.parentNode.onmouseover=function(){mouseover();}
			wrapper.parentNode.onmouseout=function(){mouseout();}
		}
	}
	function mouseover(){
		//鼠标滑过时，停止对象的移动
		if(step!=0){
			setZero();
		}
	}
	function mouseout(){
		//鼠标移出时，恢复对象的移动
		if(step!=0){
			setZero();
			moveDir(direct);
		}
	}
	//确定对象移动的方向
	function moveDir(direct)
	{
	    if(direct=="left"){
			wrapper.stopMove=setInterval(moveStartLeft,speed);
		}else if(direct=="right"){
			wrapper.stopMove=setInterval(moveStartRight,speed);
		}else if(direct=="top"){
			wrapper.stopMove=setInterval(moveStartTop,speed);
		}else if(direct=="bottom"){
			wrapper.stopMove=setInterval(moveStartBottom,speed);
		}
	}
	//用户点击控制次数计零
	function setZero()
	{
		stopAll();
		wrapper.userMoveLeft=0;
		wrapper.userMoveRight=0;
		wrapper.userMoveTop=0;
		wrapper.userMoveBottom=0;
	}
	//停止所有计时器的操作
	function stopAll()
	{
		clearInterval(wrapper.stopMove);
		clearInterval(wrapper.stopDelay);
		clearTimeout(wrapper.stopTimeout);
	}

	//向左移动
	function moveDelayLeft(){wrapper.stopMove=setInterval(moveStartLeft,speed);}
	function moveStartLeft()
	{
		if(wrapper.userMoveLeft>0){wrapper.scrollLeft+=userStep;}else{wrapper.scrollLeft+=step;}
		if(wrapper.scrollLeft>=inner.offsetWidth){wrapper.scrollLeft-=inner.offsetWidth;}
		if(delay!=0 && percent!=0 && wrapper.scrollLeft%distance>=(distance*percent/100))            //如果移动的单独宽度还剩下大约指定的百分点，则停止当前计时器的运作，而转向第二种移动方案！
		{
			clearInterval(wrapper.stopMove);
			if(wrapper.userMoveLeft>0){
				wrapper.stopDelay=setInterval(moveStartLeft2,1);
			}else{
				wrapper.stopDelay=setInterval(moveStartLeft2,speed+10);
			}
		}
	}
	function moveStartLeft2()
	{
		if(wrapper.scrollLeft%distance==0){
			clearInterval(wrapper.stopDelay);
			if(wrapper.userMoveLeft>0){wrapper.userMoveLeft-=1;}
			if(wrapper.userMoveLeft==0){
				if(step!=0){
					if(directChangeAuto){
						wrapper.stopTimeout=setTimeout(moveDelayLeft,delay);
					}else{
						if(direct=="left"){
							wrapper.stopTimeout=setTimeout(moveDelayLeft,delay);
						}else{
							wrapper.stopTimeout=setTimeout(moveDelayRight,delay);
						}
					}
				}
			}else{
				wrapper.stopMove=setInterval(moveStartLeft,speed);
			}
		}else{
			wrapper.scrollLeft+=1;
		}
	}
	//向右移动
	function moveDelayRight(){wrapper.stopMove=setInterval(moveStartRight,speed);}
	function moveStartRight()
	{
		if(wrapper.userMoveRight>0){wrapper.scrollLeft-=userStep;}else{wrapper.scrollLeft-=step;}
		if(wrapper.scrollLeft<=inner.offsetWidth-wrapper.offsetWidth){wrapper.scrollLeft+=inner.offsetWidth;}
		if(delay!=0 && percent!=0 && wrapper.scrollLeft%distance<=(distance*(1-percent/100)))            //如果移动的单独宽度还剩下大约指定的百分点，则停止当前计时器的运作，而转向第二种移动方案！
		{
			clearInterval(wrapper.stopMove);
			if(wrapper.userMoveRight>0){
				wrapper.stopDelay=setInterval(moveStartRight2,1);
			}else{
				wrapper.stopDelay=setInterval(moveStartRight2,speed+10);
			}
		}
	}
	function moveStartRight2()
	{
		if(wrapper.scrollLeft%distance==0){
			clearInterval(wrapper.stopDelay);
			if(wrapper.userMoveRight>0){wrapper.userMoveRight-=1;}
			if(wrapper.userMoveRight==0){
				if(step!=0){
					if(directChangeAuto){
						wrapper.stopTimeout=setTimeout(moveDelayRight,delay);
					}else{
						if(direct=="right"){
							wrapper.stopTimeout=setTimeout(moveDelayRight,delay);
						}else{
							wrapper.stopTimeout=setTimeout(moveDelayLeft,delay);
						}
					}
				}
			}else{
				wrapper.stopMove=setInterval(moveStartRight,speed);
			}
		}else{
			wrapper.scrollLeft-=1;
		}
	}
	//向上移动
	function moveDelayTop(){wrapper.stopMove=setInterval(moveStartTop,speed);}
	function moveStartTop()
	{
		if(wrapper.userMoveTop>0){wrapper.scrollTop+=userStep;}else{wrapper.scrollTop+=step;}
		if(wrapper.scrollTop>=inner.offsetHeight){wrapper.scrollTop-=inner.offsetHeight;}
		if(delay!=0 && percent!=0 && wrapper.scrollTop%distance>=(distance*percent/100))            //如果移动的单独宽度还剩下大约指定的百分点，则停止当前计时器的运作，而转向第二种移动方案！
		{
			clearInterval(wrapper.stopMove);
			if(wrapper.userMoveTop>0){
				wrapper.stopDelay=setInterval(moveStartTop2,1);
			}else{
				wrapper.stopDelay=setInterval(moveStartTop2,speed+10);
			}
		}
	}
	function moveStartTop2()
	{
		if(wrapper.scrollTop%distance==0){
			clearInterval(wrapper.stopDelay);
			if(wrapper.userMoveTop>0){wrapper.userMoveTop-=1;}
			if(wrapper.userMoveTop==0){
				if(step!=0){
					if(directChangeAuto){
						wrapper.stopTimeout=setTimeout(moveDelayTop,delay);
					}else{
						if(direct=="top"){
							wrapper.stopTimeout=setTimeout(moveDelayTop,delay);
						}else{
							wrapper.stopTimeout=setTimeout(moveDelayBottom,delay);
						}
					}
				}
			}else{
				wrapper.stopMove=setInterval(moveStartTop,speed);
			}
		}else{
			wrapper.scrollTop+=1;
		}
	}
	//向下移动
	function moveDelayBottom(){wrapper.stopMove=setInterval(moveStartBottom,speed);}
	function moveStartBottom()
	{
		if(wrapper.userMoveBottom>0){wrapper.scrollTop-=userStep;}else{wrapper.scrollTop-=step;}
		if(wrapper.scrollTop<=inner.offsetHeight-wrapper.offsetHeight){wrapper.scrollTop+=inner.offsetHeight;}
		if(delay!=0 && percent!=0 && wrapper.scrollTop%distance<=(distance*(1-percent/100)))            //如果移动的单独宽度还剩下大约指定的百分点，则停止当前计时器的运作，而转向第二种移动方案！
		{
			clearInterval(wrapper.stopMove);
			if(wrapper.userMoveBottom>0){
				wrapper.stopDelay=setInterval(moveStartBottom2,1);
			}else{
				wrapper.stopDelay=setInterval(moveStartBottom2,speed+10);
			}
		}
	}
	function moveStartBottom2()
	{
		if(wrapper.scrollTop%distance==0){
			clearInterval(wrapper.stopDelay);
			if(wrapper.userMoveBottom>0){wrapper.userMoveBottom-=1;}
			if(wrapper.userMoveBottom==0){
				if(step!=0){
					if(directChangeAuto){
						wrapper.stopTimeout=setTimeout(moveDelayBottom,delay);
					}else{
						if(direct=="bottom"){
							wrapper.stopTimeout=setTimeout(moveDelayBottom,delay);
						}else{
							wrapper.stopTimeout=setTimeout(moveDelayTop,delay);
						}
					}
				}
			}else{
				wrapper.stopMove=setInterval(moveStartBottom,speed);
			}
		}else{
			wrapper.scrollTop-=1;
		}
	}
}