# 函数式编程
* 纯函数    
    对于同样的输入，总是会产生同样的输出，没有副作用
* 一元函数, 只有一个输入
```javascript
function unary(fn) {
    return function onlyOneArg(arg){
        return fn( arg );
    };
}
["1","2","3"].map( parseInt );  // [1,NaN,NaN]

// unary(..) creates a function that will ignore all but the first argument passed to it

["1","2","3"].map( unary( parseInt ) ); // [1,2,3]
```
* 偏函数partial    
   固定一个函数的一个或者多个参数，返回一个新的函数，这个函数用于接受剩余的参数,和map结合使用比较多
```javascript
function partial(fn, ...presetArgs) {
    return function partiallyApplied(...laterArgs ) {
       return fn(...presetArgs, ...laterArgs )
   } 
}
// 应用1
var getPerson = partial( ajax, "http://some.api/person" )
var getOrder = partial( ajax, "http://some.api/order" )
// version1
var getCurrentUser = partial(ajax, "http://some.api/person", {user: "hello world"})
// version 2
var getCurrentUser = partial( getPerson, { user: CURRENT_USER_ID } );
// 应用2
function add(x, y){
    return x + y
}
[1,2,3,4,5].map( partial( add, 3 ) )
```
```javascript
    function partialRight(fn, ...presetArgs) {
     return function partiallyApplied(...laterArgs) {
         return fn(...laterArgs, ...presetArgs)
     }   
    }
```
```javascript
function reverseArgs(fn) {
    return function argsReversed(...args) {
        return fn(...args.reverse())
    }
}
```
* 科里化 curry todo 
    柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
```javascript
// 第一版
function curry(fn) {
    var args = [].slice.call(arguments, 1)
    return function () {
        var newArgs = args.concat([].slice.call(arguments))
        return fn.apply(this, newArgs)
    }
}
function add(a, b) {
    return a + b;
}
var addCurry = curry(add, 1, 2);
addCurry() // 3
//或者
var addCurry = curry(add, 1);
addCurry(2) // 3
//或者
var addCurry = curry(add);
addCurry(1, 2) // 3}
```
```javascript
// 第二版
function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

function curry(fn, length) {
    length = length || fn.length;
    var slice = Array.prototype.slice;
    return function() {
        if (arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
        } else {
            return fn.apply(this, arguments);
        }
    };
}

```
* 组合 compose
    函数组合，执行顺序是从右往左
```javascript
    function compose(...fn) {
        return function composed(result){
            var list = [...fn]
            while(list.length > 0) {
                result = list.pop()(result)
            }
            return result
        }
    }
    // 管道函数， 从左向右移动
    function pipe(...fn) {
        return function piped(result) {
            var list = [...fn]
            while(list.length > 0) {
                result = list.shift()(result)
            }
            return result
        }
    }
    // pipe函数的另外一种实现方式
    var pipe = reverseArgs(compose)

```
* value Immutability    
基本数据类型都是不变的,const申明的变量不变性是指不能重复复赋值，Object.freeze()只能冻结对象的第一层(shadow)
* 递归(recursion)
```javascript
// 判断一个数是不是素数
function isPrime(num,divisor = 2){
    if (num < 2 || (num > 2 && num % divisor == 0)) {
        return false;
    }
    if (divisor <= Math.sqrt( num )) {
        return isPrime( num, divisor + 1 );
    }
    return true;
}
// 计算二叉树的深度
function depth(node) {
    if(node) {
            let depthLeft = depth(node.left)
            let depthRight = depth(node.right)
            return 1 + Math.max(depthLeft, depthLeft)
    }
    return 0
}
```
* 尾调用
```javascript
// 解决栈溢出的问题，尾调用优化
// 尾调用的概念非常简单，就是指某个函数的最后一步是调用另一个函数。
// 下面都不是
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 阶乘函数
function factorial(n) {
    if( n === 1) {
        return 1
    }
    return n*factorial(n-1)
}
```
将阶乘函数改成尾调用, 确保最后一步只调用自身, 就是把所有用到的内部变量改写成函数的参数
```javascript
function factorial(n, total) {
    if (n===1) {
      return total  
    }
    return factorial(n - 1, n*total)
}
// 但是这样会传两个参数,用两个函数改写一下
function factorial(n) {
    return tailFactorial(n ,1)
}
function tailFactorial(n, total) {
    if (n===1) {
      return total  
    }
    return tailFactorial(n - 1, n*total)
}

// 继续改写, tailFactorial放在factorial内部
function factorial(n) {
    function tailFactorial(n, total) {
        if (n===1) {
        return total  
        }
        return tailFactorial(n - 1, n*total)
    }
    return tailFactorial(n ,1)
} 

// 也可以使用curry函数，将多参数的函数转换为单参数的形式
function currying(fn, n) {
  return function (m) {
    return fn(m, n);
  };
}
function tailFactorial(n, total) {
    if (n===1) {
      return total  
    }
    return tailFactorial(n - 1, n*total)
} 
var factorial = currying(tailFactorial, 1)
factorial(5)
```
* 函子 functor  
任何具有map方法的数据结构，都可以当作函子的实现，将一种范畴转换为另一种范畴
* monad (很难)


