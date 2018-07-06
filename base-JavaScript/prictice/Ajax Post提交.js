
    /**
     * Ajax Post提交
     * @param  {String} url      请求的URL
     * @param  {String} [params]   传递的参数值
     * @param  {Function} [callBack] 成功提交时执行的回调函数
     * @return {undefined}
     */
    function ajaxPost(url, params, callBack)
    {
        var XHR, isAsync = true;

        //参数的自我修正
        if(typeof params === "function"){
            callback = params;
            params = "";
        }
        if(typeof callback !== "function"){
            callback = function(){};
        }

        //构建核心对象
        if(window.XMLHttpRequest){
            //为IE7及更高IE版本浏览器以及非IE浏览器创建Ajax核心控制器；
            XHR = new XMLHttpRequest();
        }else{
            try{
                //为较新版本的非7版IE浏览器创建xmlHTTP对象；
                XHR = new ActiveXObject("Msxml2.xmlhttp");
            }catch(e){
                try{
                    //为较老版本的非7版IE浏览器创建xmlHTTP对象；
                    XHR = new ActiveXObject("Microsoft.xmlhttp");
                }catch(e2){}
            }
        }

        //建立请求
        XHR.open("post", url, isAsync);  //参数设置；
        XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //编码方式；
        XHR.onreadystatechange = function(){
            if(XHR.readyState == 4 && XHR.status == 200){
                callBack(XHR.responseText); //当服务器响应成功且数据下载完毕，则调用目标处理函数，并传递返回值作为参数；
            }
        }
        XHR.send(params || "");
    }