// 插入排序是一种最简单直观的排序算法，它的工作原理是通过构建有序序列，

// 对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

// 将待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。

// 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置

//（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）
// 感觉自己还有点不是很懂
function insertSort(arr) {
    // 第0个元素有序,从第一个位置开始考察
    for (var i = 1; i < arr.length; i++) {
        // 寻找元素arr[i]合适的插入位置
        var e = arr[i];
        var j = i;
        for (; j > 0 && e < arr[j - 1]; j--) {
            arr[j] = arr[j-1]
        }
        if (j !== i) {
            arr[j] = e;
        }
    }
    return arr;
}
var arr = [100, 30, 10,30, 40, 20, 68]
console.log(insertSort(arr))