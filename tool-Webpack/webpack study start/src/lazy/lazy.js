  import _ from 'lodash';

  function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console !!';

    // Webpack中的懒加载模块默认命名按照先后顺序从0开始依次命名
    // 可以通过注释的方式指定模块的name：webpackChunkName: "print"
    btn.onclick = e => import(/* webpackChunkName: "print" */'../public/print').then(module => {
      var print = module.default;
      
      print(); 
    });
 
    element.appendChild(btn); 
    return element;
  }

  document.body.appendChild(component()); 