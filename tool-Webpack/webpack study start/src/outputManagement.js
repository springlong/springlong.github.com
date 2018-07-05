  import _ from 'lodash';
  import printMe from './public/print.js';
  import {randomInt} from './public/math.js';
  import './style2.css';

  function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack', '!'], ' ');

    btn.innerHTML = 'Click me and check the console !!asdfas~' + randomInt(1, 100);
    btn.onclick = printMe;
 
    element.appendChild(btn);


    return element;  
  }

  let element = component();
  document.body.appendChild(element);

  // 模块热替换
  if (module.hot) {
    // 当模块发生变更后执行回调
    module.hot.accept('./public/print.js', function() {
      console.log('Accepting the updated printMe module!');
      document.body.removeChild(element);
      element = new component();
      document.body.appendChild(element);
    });
  }