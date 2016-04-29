function goodBind(fn, newThis) {

    return function () {
        fn.apply(newThis, arguments);
    };
}

function g(a, b, c) {
    console.log(this, a, b, c);
}
g(1, 2, 3);                         //Window, 1, 2, 3
var p1 = goodBind(g, 1, 2, 3, R._);
p1();                               //1, 2, 3, undefined
p1(4);                              //1, 2, 3, 4

//Done