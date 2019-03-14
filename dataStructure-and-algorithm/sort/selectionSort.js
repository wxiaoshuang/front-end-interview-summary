// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置

// 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

// 重复第二步，直到所有元素均排序完毕。
function selectionSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var min = i;
        // 每轮需要比较的次数 N-i
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[min], arr[i]] = [arr[i], arr[min]]
        }
    }
    return arr;
}
var arr = [100, 30, 10, 40, 20, 68]
console.log(selectionSort(arr))