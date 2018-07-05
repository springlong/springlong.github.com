
console.log("script-start");

setTimeout(function () {
	console.log("script-setTimeout-100");
}, 100);

setTimeout(function () {
	console.log("script-setTimeout-0");
}, 0);

Promise.resolve().then(function() {
	console.log('script-promise1');
}).then(function() {
	console.log('script-promise2');
});

var button = document.getElementById("button");

function foo(){
	console.log("script-foo");
}

button.addEventListener("click", function (event) {
	setTimeout(function (){
		console.log("script-setTimeout");
	}, 0);

	foo();
}, false);

console.log("script-end");