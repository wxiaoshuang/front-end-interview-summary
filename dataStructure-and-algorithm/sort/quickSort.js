function quickSort(arr) {
     quick(arr, 0, arr.length - 1)
}
function quick(arr, l, r) {
    if (l < r) {
        var pivot = partition(arr, l, r)
        quick(arr, l, pivot - 1)
        quick(arr, pivot + 1, r)
    }
}
// 分区，小于基准的在前面，大于基准的在后面
function partition(arr, l, r) {
    var pivot = arr[l]
    while (l < r) {
        // 顺序很重要，要先从右边开始找, 因为基准是从第一个元素开始的，
        // 如果基准是最后一个元素， 那么要从左忘右找
        while (l < r && arr[r] >= pivot) {
            r--
        }
        arr[l] = arr[r] // 将较大的值放在左边，如果没有比基准值大的值就是自己赋值给自己
        while (l < r && arr[l] <= pivot) {
            l++
        }
        arr[r] = arr[l] // 同理
    }
    // 将基准数归位
    arr[l] = pivot;
    return l
}
var arr = [100, 30, 10, 30, 40, 20, 68]
quickSort(arr)
console.log(arr)