import _ from 'lodash';             // 不需要额外loader
import './style.css';               // style-loader + css-loader 
import Icon from './my-image.png';  // file-loader
import xmlData from './data.xml';   // xml-loader
import jsonData from './data.json'; // 不需要额外loader

console.log('data.xml:', xmlData);
console.log('data.json:', jsonData);

function component () {
	var element = document.createElement('div');

	element.innerHTML = _.join(['Hello', 'webpack'], '');
	element.classList.add('box');

	var myIcon = new Image();
	myIcon.src = Icon;
	element.appendChild(myIcon);

	return element;
}

document.body.appendChild(component());