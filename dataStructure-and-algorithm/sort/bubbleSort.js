// 比较相邻的元素。如果第一个比第二个大，就交换他们两个。

// 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。

// 针对所有的元素重复以上的步骤，除了最后一个。

// 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        // 设定一个标记，若为true，则表示此次循环没有进行交换，也就是待排序列已经有序，排序已经完成。
        var flag = true
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                flag = false
            }
        }
        if (flag) {
            break
        }
    }
    return arr;
}
var arr = [100, 30, 10, 40, 20, 68]
console.log(bubbleSort(arr))