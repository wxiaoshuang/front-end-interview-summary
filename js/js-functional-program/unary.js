// 将函数转换成只接受一个参数
function unary(fn) {
    return function onlyOneArg(arg){
        return fn( arg );
    };
}
['1', '2', '3'].map(parseInt) // [1, NaN, NaN]
['1', '2', '3'].map(unary(parseInt))