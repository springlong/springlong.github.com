
//====================================================================================================================
//浏览器信息表示以及兼容处理
window.Browser = (function()
{
    var browser = {

        /**
         * 浏览器名称（如：IE、Firefox、Safari、Chrome、Opera）
         * @type {String}
         */
        name: "",

        /**
         * 浏览器版本
         * @type {String}
         */
        version: "",

        /**
         * 是否为IE6浏览器（IE6不支持window.XMLHttpRequest属性）
         * @type {Boolean}
         */
        isIE6: !window.XMLHttpRequest,         

        /**
         * 是否为IE6~8浏览器（IE6~8不支持document.getSelection属性）
         * @type {[type]}
         */
        isLessIE9: !document.getSelection
    },
    ua = navigator.userAgent,
    match = /(Trident).*rv:([\d.]+)/i.exec(ua) ||
            /(MSIE) ([\d.]+)/i.exec(ua) || 
            /(Firefox)\/([\d.]+)/i.exec(ua) ||
            /(Opera).*version\/([\d.]+)/i.exec(ua) ||
            /(OPR)\/([\d.]+)/i.exec(ua) ||
            /(Chrome)\/([\d.]+) safari\/([\d.]+)/i.exec(ua) ||
            /apple(Webkit).*version\/([\d.]+) safari/i.exec(ua) ||
            [],
    name = match[1] || "",
    nameLower = name.toLowerCase(),
    version = match[2] || "",
    tags, i, len;

    if(nameLower !== "chrome" && nameLower === "webkit")
    {
        name = "Safari";
    }
    else if(nameLower === "opr")
    {
        name = "Opera"; //Opera自14.0版本后就使用了Webkit内核，UA字符串中的Opera也因此变更为OPR
    }
    else if(nameLower === "trident" || nameLower === "msie")
    {
        name = "IE"; //IE浏览器从11.0版本开始，在UA中不再包含“MSIE 10.0”类似的信息，与之替代的是：Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
    }

    browser.name = name;
    browser.version = version;
    return browser;
}());