/**
 * @file        基于jQuery的侧栏跟随插件
 * @version     1.0.0
 * @update      2014-12-04
 * @author      龙泉 <yangtuan2009@126.com>
 */

/* 实现说明：
 * =========================================================================================
 * 一、 当浏览器滚动条的scrollTop值小于等于目标元素位于文档Y轴的坐标位置时，则默认为静态定位
 *
 * 二、 当目标元素的高度小于等于文档可视区高度时
 *   1. 当（浏览器滚动条的scrollTop值+目标元素的高度值）大于内容容器底部距离文档最顶部的距离时，将其定位在侧栏容器的底部
 *   2. 否则，将目标元素固定定位至文档可视区的顶部！
 *
 * 三、 当目标元素的高度大于文档可视区高度时
 *   1. 当（浏览器滚动条的scrollTop值+文档可视区高度）大于内容容器底部距离文档最顶部的距离时，将其定位在侧栏容器的底部
 *   2. 当（浏览器滚动条的scrollTop值+文档可视区高度）大于目标元素底部距离文档最顶部的距离时，将定位在文档可视区的底部
 */
    
/**
 * 侧栏跟随（不支持IE6、7）
 * @param  {Object} [options]  配置选项
 * @param  {Number} options.distanceToTop 侧栏跟随时，模块需要距离文档可视区顶部的位置偏移量，默认为0
 * @param  {Number} options.distanceToBottom 侧栏跟随时，模块需要距离文档底部的最小高度，默认为0，表示不做规定
 */
jQuery.fn.scrollWith = function(options)
{
    //不提供对IE6、7的支持（截止2014-12-04，大陆IE6、7的用户约占比10%）
    if(!document.querySelectorAll) return this;

    //参数匹配
    options = jQuery.extend({
        distanceToTop: 0,
        distanceToBottom: 0
    }, options);

    //公共对象
    var $win = jQuery(window),
        $doc = jQuery(document);

    return this.each(function(index, ele)
    {
        var
            $ele = jQuery(ele),                         //目标元素
            $aside = $ele.parent(),                     //侧栏容器
            $content = $aside.parent(),                 //内容容器
            asideH = $aside.outerHeight(true),              //侧栏初始高度
            asideMT = parseInt($aside.css('marginTop')),    //侧栏容器的顶部边距
            asideMB = parseInt($aside.css('marginBottom')), //侧栏容器的顶部边距
            eleH = $ele.outerHeight(),                  //目标元素的整体高度（包括padding、border）
            eleHT = eleH + options.distanceToTop,       //目标元素高度+侧栏跟随时顶部偏移距离
            eleTop = $ele.offset().top,                 //目标元素距离文档最顶部的距离
            positionTop = eleTop,                       //目标元素距离文档最顶部的距离需要达到多少才会进行top定位
            stateNum = 0,                               //定位状态，0表示静态定位，1表示非静态定位
            isLast = ("nextElementSibling" in ele ? ele.nextElementSibling : ele.nextSibling) === null, //目标元素是否位于侧栏的最末尾
            bodyH = $win.height(),
            conH, conTop, conB2Top;

        $aside.css("position") === "static" && ($aside.css("position", "relative"));

        //如果目标元素不是位于侧栏的末尾，则需要做相关兼容处理
        !isLast && (positionTop = eleTop = $aside.offset().top + $aside.height());

        //如果目标元素的高度大于文档可视区高度时，同样需要做相关兼容处理
        eleHT > bodyH && (positionTop += eleH - bodyH);

        $win.bind({
            "scroll": doFollow,
            "resize": function(){
                var height = $win.height();
                if(bodyH !== height){
                    bodyH = height;
                    eleHT > bodyH && (positionTop = eleTop + eleH - bodyH);
                    doFollow();
                }
            }
        });
        doFollow();

        //调整相关变量的值
        function doAdjust()
        {
            conH = $content.outerHeight();  //内容容器的整体高度（包括padding、border）
            conTop = $content.offset().top; //内容容器距离文档最顶部的距离
            conB2Top = conTop + conH;       //内容容器底部距离文档最顶部的距离（变量名可读为：content bottom to top）
            setAsideHeight();
        }

        //将侧栏高度保持为整个内容主体的高度
        function setAsideHeight()
        {
            var height = asideH, temp;
            $aside.siblings().each(function(i, ele){
                height = (temp = $(ele).outerHeight(true)) > height ? temp : height;
            });
            $aside.height(height - asideMT - asideMB);
        }

        //执行跟随处理
        function doFollow()
        {
            var bodyST = $doc.scrollTop(),              //文档滚动条的距离
                conB2Bottom,                            //内容容器底部距离文档最底部的距离（变量名可读为：content bottom to Bottom）
                eleB2Bottom;                            //目标元素底部需要与侧栏容器底部保持的距离（变量名可读为：ele bottom to bottom）

            doAdjust();

            //恢复静态定位
            if(bodyST <= positionTop){
                if(!isLast && stateNum === 1){
                    stateNum = 0;
                }
                $ele.css({position: "static"});
                return;
            }

            conB2Bottom = $doc.height() - conB2Top;
            eleB2Bottom = (eleB2Bottom = options.distanceToBottom - conB2Bottom) > 0 ? eleB2Bottom : 0;

            //当目标元素的高度小于等于文档可视区高度时
            if(eleHT <= bodyH){
                (bodyST + eleHT > conB2Top - eleB2Bottom) ?
                    $ele.css({position: "absolute", top: "auto", bottom: eleB2Bottom + "px"}) :
                    $ele.css({position: "fixed", top: (options.distanceToTop - parseInt($ele.css("marginTop"))) + "px", bottom: "auto"});
            }
            //当目标元素的高度大于文档可视区高度时
            else{
                if(bodyST + bodyH > conB2Top - eleB2Bottom){
                    $ele.css({position: "absolute", top: "auto", bottom: eleB2Bottom + "px"});
                }
                else if(bodyST + bodyH > eleTop + eleH){
                    $ele.css({position: "fixed", top: "auto", bottom: "0"});
                }
            }

            //如果不是最后一个侧栏模块进行跟随，则在定位的时候实现淡入效果
            if(!isLast && stateNum === 0){
                $ele.hide().stop().fadeIn();
                stateNum = 1;
            }
        }
    });
};