# 前端面试题
## html
* ## css  
	* [实现居中的方法](#实现居中的方法)
	* [圣杯布局和双飞翼布局](圣杯布局和双飞翼布局)
	* [实现粘性footer](#实现粘性footer)
* ## [js](#js)
	* [js的数据类型](#js的数据类型)
	* [类型转化](#类型转换)
	* [原生函数](#原生函数) 预解析 作用域
	* [高级函数](#高级函数)
	* [new一个函数的时候发生了什么](#new一个函数的时候发生了什么)
	* 闭包
	* [this](#this)
	* [原型和原型链](#原型和原型链)
	* [如何实现一个对象的深克隆](#如何实现一个对象的深克隆)
	* [事件机制](#事件机制)
	* [垃圾收集](#垃圾收集)
	* dom
	* es6
	* 函数式编程
	* [设计模式](#设计模式)
	* [模块化](#模块化)
* ## [web](#web)
	* [web安全](#web安全)
	* 前端优化方案
	* 浏览器缓存
	* 从在浏览器的地址里面输入url到页面渲染出来发生了什么
* ## [大前端](#大前端)
	* vue
		* 实现数据响应式
		* vue的生命周期
		* 源码解读
		* vuex
		* vue-router
	* webpack
	* babel
* ## [移动端](#移动端)
	* 移动端的适配以及相关知识
	* 小程序
# 答案整理
## js
### 数据类型    
基本数据类型(值类型)： number, string, boolean, symbol, undefined
复杂数据类型(引用类型)：object ( array, function)
```javascript
// 使用typeof 判断基本数据类型
typeof 123 // 'number'
typeof 'abv' // 'string'
typeof true // 'boolean'
typeof undefined // 'undefined'
typeof {} // 'object'
typeof [] // 'object'
typeof condole.log // 'function'
typeof null  // 'object'
// 引用类型的判断
Object.prototype.toString.call({}) // '[object Object]'
Object.prototype.toString.call([]) // '[object Array]'
Object.prototype.toString.call(function {}) // '[object Function]'
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) //"[object Null]"
Object.prototype.toString.call('aer') // "[object String]"
Object.prototype.toString.call(123) // "[object Number]"
Object.prototype.toString.call(true) // "[object Boolean]"
```
### 类型转换    
falsy value: +0 -0 '' undefined null false NaN  
falsy object:

```javascript
// 简单的类型转换
+0 === -0 // true

0 == '' //true
0 == false // true
'' == false // true
100 == '100' // true
null == undefined // true
NaN === NaN // false
1/0 // Infinity
-1/0 // -Infinity
100 + '100' //'100100'
'100' + 100 //'100100'
100 - '50' // 50
100 - true // 99
100 - false // 100
'100' - true // 99
// 复杂的类型转换
[] + [] // ''
[] - [] // 0
[12] + [34] // '1234'
12,45] + [34] // "12,4534"
[] + {} // '[object Object]' ?
{} - {} // NaN
{} + [] // 0 ?
{} + {} //"[object Object][object Object]"


```
### 原生函数    
String
Number
Boolean
Array
Object
Function
RegExp
Date
Error
Symbol
### 高级函数  
1. 惰性载入函数  
```javascript
// 因为浏览器之间行为的差异，多数JavaScript代码包含了大量的if语句，将执行引导到正确的代码中
// 创建ajax对象，每次调用都会重复执行if判断，但是是不必要的
function createXhr() {
	if('XMLHttpRequest' in window) {
		console.log('none-ie');
		return new XMLHttpRequest();
	} else if('ActiveXObject' in window) {
		console.log('ie');
		return new ActiveXObject('Microsoft.XMLHTTP');
	}
}
// 有两种实现惰性载入的方式，第一种就是在函数被调用时再处理函数。在第一次调用的过程中，该函数会被覆盖为另外一个按合适方式执行的函数，这样任何对原函数的调用都不用再经过执行的分支了
function createXhr() {
	if('XMLHttpRequest' in window) {
		createXhr = function() {
			return new XMLHttpRequest();
		}
	} else if('ActiveXObject' in window) {
		createXhr = function() {
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	return createXhr()
}
// 第二种实现惰性载入的方式是在声明函数时就指定适当的函数。这样，第一次调用函数时就不会损失性能
// 了，而在代码首次加载时会损失一点性能
var createXhr = (function () {
	if('XMLHttpRequest' in window) {
		return function() {
			return new XMLHttpRequest();
		}
	} else if('ActiveXObject' in window) {
		return function() {
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	return createXhr()
})();

```
2. 函数节流  
函数节流背后的基本思想是指，某些代码不可以在没有间断的情况连续重复执行, 当达到了一定的时间间隔就会执行一次, 可以理解为是缩减执行频率, 最常用的就是在监听页面元素滚动事件的时候会用到。因为滚动事件，是一个高频触发的事件
```javascript
function throttle(fn, context) {
	clearTimeout(fn.timeId);
	fn.timeId = setTimeout(function() {
		fn.call(context);
	}, 100)
}
```
3. 函数防抖 todo
### new一个函数的时候发生了什么		
1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行[[原型]]连接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

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
￼
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
//call 和apply方法，它们的第一个参数是一个对象，它们会把这个对象绑定到this，接着在调用函数时指定这个this。因为你可以直接//指定this的绑定对象，因此我们称之为显式绑定
function foo() { 
    console.log( this.a );
}

var obj = { 
    a:2
};

foo.call( obj ); // 2
// 注意 如果第一个参数传入的对象调用者是null或者undefined的话，call方法将把全局对象（也就是window）作// 作为this的值
```
4. new绑定
5. es6的箭头函数: 箭头函数不使用this的四种标准规则，而是根据外层（函数或者全局）作用域来决定this。

### 执行上下文  
一个执行的上下文可以抽象的理解为object。每一个执行的上下文都有一系列的属性（我们称为上下文状态），他们用来追踪关联代码的执行进度。这个图示就是一个context的结构。主要的三个属性:变量对象(variable object)，this指针(this value)，作用域链(scope chain), 在一个函数上下文中，变量对象被表示为活动对象(activation object)。

### 原型和原型链    
A prototype chain is a finite chain of objects which is used to implemented inheritance and shared properties.(原型链是由有限对象组成的对象链，用于实现继承和共享属性)
```javascript
function Foo(y) {
    this.y = y
}
// 继承属性"x"
Foo.prototype.x = 10
// 继承方法"calculate"
Foo.prototype.calculate = function(z) {
    this.x + this.y + z
}
var a = new Foo(100)
var b = new Foo(200)
b.__proto__ === Foo.prototype // true
a.__proto__ === Foo.prototype // true
// "Foo.prototype"自动创建了一个特殊的属性"constructor"
// 指向a的构造函数本身
// 实例"b"和"c"可以通过授权找到它并用以检测自己的构造函数
a.constructor === Foo // true
b.constructor === Foo // true
Foo.prototype.constructor === Foo // true
b.calculate === b.__proto__.calculate, // true
b.__proto__.calculate === Foo.prototype.calculate // true

```
上述代码可以用下图表示

![关系](./images/prototype.png)
### 如何实现一个对象的深克隆  
1. 最简单的办法就是`JSON.parse(JSON.stringify(obj))`, 但是会丢失原型链，如果存在循环引用的问题，也会出错, 函数, undefined会忽略，日期对象也转换成了日期字符串
```javascript
var clone = function(obj){
    return JSON.parse(JSON.stringify(obj));
}
var a = {
    a:function(){console.log('hello world')},
    b:{c:1},
    c:[1,2,3],
    d:'tang',
    e:new Date(),
    f:null,
    g:undefined
}
var b = clone(a);
console.log(b)
// {b: {c: 1}
	c: (3) [1, 2, 3]
	d: "tang"
	e: "2019-01-26T07:36:51.020Z"
	f: null}
```
2. 

### 事件机制  
跨浏览器的解决方案
```javscript
var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }

};
```
window的load事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要加载的外部资源过多而颇费周折。而DOMContentLoaded事件则在形成完整的DOM树之后就会触发，不理会图像、JavaScript文件、CSS文件或其他资源是否已经下载完毕。与load事件不同，DOMContentLoaded支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面进行交互。
### 垃圾收集
1. 标记清除  
	垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（当然，可以使用任何标记方式）。然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间。现在浏览器基本都是这个这种方式或者类似策略	
2. 引用计数  
	当这个值的引用次数变成0时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为零的值所占用的内存, 但是会存在一个循环引用的问题
### 设计模式
1. 单例模式  
单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象
### 模块化
## web
### web安全  
1. xss
2. csrf
3. SQL注入




