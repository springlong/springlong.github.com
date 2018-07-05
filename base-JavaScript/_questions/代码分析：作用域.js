function a(x, y) {

    y = function() { x = 2; };

    (function() {
        var x = 3;
        y();
        console.log(x);
    }).apply(this, arguments);

    console.log(x);
}

a();

//求最后的输出
//题目来自
//https://gist.github.com/ruanyf/cae49b92b0bd43c4d57d