function foo (x, y, z, ...args) {
    console.log(x, y, z, args);
}
foo(1, 2) // 1 2 undefined []
foo(1, 2, 3) // 1 2 3 []
foo(1, 2, 3, 4) // 1 2 3 []