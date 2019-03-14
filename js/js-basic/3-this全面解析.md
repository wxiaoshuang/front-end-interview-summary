### this    
this是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。    
当一个函数被调用时，会创建一个活动记录（有时候也称为[执行上下文](#执行上下文)。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。this就是记录的其中一个属性，会在函数执行的过程中用到

绑定规则
1. 默认绑定
```javascript
function foo() { 
    console.log( this.a );
}

var a = 2; // 声明在全局作用域中的变量（比如var a = 2）就是全局对象的一个同名属性

foo(); // 2
//如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定，因此this会绑定到undefined
function foo() { 
    "use strict";

	console.log( this.a ); 
	}

var a = 2;

foo(); // TypeError: this is undefined
```
2. 隐式绑定
```javascript
function foo() { 
    console.log( this.a );
}

var obj = { 
    a: 2,
    foo: foo 
};

obj.foo(); // 2

// 一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定也就是说它会应用// 默认绑定，从而把this绑定到全局对象或者undefined上，取决于是否是严格模式

function foo() { 
    console.log( this.a );
}

var obj = { 
    a: 2,
    foo: foo 
};

var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a是全局对象的属性

bar(); // "oops, global"

// 另外一种隐私丢失的情况是回调函数
function foo() { 
    console.log( this.a );
}

var obj = { 
	a: 2,
	foo: foo 
};

var a = "oops, global"; // a是全局对象的属性

setTimeout(obj.foo, 100 ); // "oops, global"
```
3. 显式绑定
```javascript
//call 和apply方法，它们的第一个参数是一个对象，它们会把这个对象绑定到this，接着在调用函数时指定这个this。因为你可以直接指定this的绑定对象，因此我们称之为显式绑定
function foo() { 
    console.log( this.a );
}

var obj = { 
    a:2
};

foo.call( obj ); // 2
// 注意 如果第一个参数传入的对象调用者是null或者undefined的话，call方法将把全局对象(在node中是global, 在浏览器环境中是window)作为this的值
```
4. new 绑定
使用new操作构造函数的时候，构造函数的this绑定到创建的实例对象
5. 箭头函数
箭头函数的this不是在运行的时候绑定的，而是在函数申明的时候绑定在父级的执行上下文