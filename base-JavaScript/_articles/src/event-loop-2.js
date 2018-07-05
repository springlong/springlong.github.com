
// Promise 和 MutationObserver属于Microtask（微任务）
// Microtask（微任务），应该属于JS执行栈的附加队列，将在执行栈的代码执行完毕之后，浏览器渲染之前立即执行
// MutationOvserver的优先级比Promise要低
// 
// Macrotask（宏任务），是存放在事件队列中的任务


console.log('test-start');

// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() { 
	console.log('test-MutationObserver');
}).observe(outer, { 
	attributes: true
});

// Here's a click listener…
function onClick() { 
	console.log('test-click'); 

	setTimeout(function() { 
		console.log('test-timeout'); 
	}, 0); 

	Promise.resolve().then(function() { 
		console.log('test-promise'); 
	}); 

	outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);

console.log('test-end');