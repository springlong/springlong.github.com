
var $doc = $('body'),
	$win = $(window),
	cacheType = null,
	screenSm = 768,
	screenMd = 992,
	screenLg = 1200;

// 折叠面板
$doc.on('click', '.j_collapseSwitch', function(){

	var $that = $(this),
		$box = $that.closest('.j_collapseBox')
		$cont = $that.next('.j_collapseCont'),
		className = 'stateShow',
		isShow = $cont.hasClass(className);

	if(isShow) {
		$cont.slideUp(function(){
			$cont.removeClass(className);
		});
	}else{
		$cont.addClass(className).slideDown();
	}
});


// 根据网页宽度不同展示不同图片
$win.on('resize', changePicByScreen);

function changePicByScreen()
{
	var width = document.documentElement.clientWidth,
		type = '';
		
	if(width >= screenLg) {
		type = '-lg';
	}else if(width >= screenMd) {
		type = '-md';
	}else if(width >= screenSm) {
		type = '-sm';
	}

	if(cacheType === type) {
		return;
	}

	cacheType = type;

	$('.j_loadImg').each(function(){
		var $item = $(this),
			imgSrc = $item.attr('data-image' + type);

		$item.attr('src', imgSrc);
	});
	
}
changePicByScreen();