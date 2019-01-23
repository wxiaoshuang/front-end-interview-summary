# 前端面试题
## html
## css
## js
- [js的数据类型](#js的数据类型)
- [类型转化](#类型转换)
- [原生函数](#原生函数)
- 预解析 作用域
- new一个函数的时候发生了什么
- 闭包
- this
- 原型继承
- 事件机制
- dom
- es6
- 函数式编程
## web
- 前端安全
- js的模块化方案
- 前端优化方案
- 从在浏览器的地址里面输入url到页面渲染出来发生了什么


# 答案整理
### js的数据类型    
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
