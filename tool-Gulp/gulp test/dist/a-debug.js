define("static/system/detail/1.0.0/a" ,["static/global/scripts/2.0.0/jquery.slide","static/global/common/2.0.0/common.fun","static/global/scripts/2.0.0/products","static/system/browser/1.0.0/browser"], function(require , exports , module){

	require("static/global/scripts/2.0.0/jquery.slide.js");
	var CMF = require("static/global/common/2.0.0/common.fun.js");
	var proModule = require("static/global/scripts/2.0.0/products.js");
	var browser = require("static/system/browser/1.0.0/browser.js");

	console.info("browser.js: \n" + browser);
	console.info("123");

    return {
        a: 1,
        b: 2
    }
});
