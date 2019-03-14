// 缓存代理，将结果缓存起来，尤其是处理大量重复的运算
function add(...args) {
    return args.reduce(function (prev, next) {
        return prev + next
    }, 0)
}
var proxyFnFactory = function (fn) {
    var cache = {}
    return function (...args) {
        var params = args.join(',')
        if (params in cache) {
            console.log('利用缓存')
            return cache[params] // 从缓存中取值
        } else {
            console.log('第一次计算')
            cache[params] = fn.apply(this, args) // 放入缓存
            return cache[params]
        }
    }
}
var proxyAdd = proxyFnFactory(add)
console.log(proxyAdd(1,2,3,4,5));
console.log(proxyAdd(1,2,3,4,5));
console.log(proxyAdd(1,2,3,4,5));