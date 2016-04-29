function badBind(fn, newThis) {
    var arrayOfArg = [].slice.call(arguments).splice(2);
    return function () {
        var argOfFunc = [].slice.call(arguments);
        for (var i = 0; i < arrayOfArg.length; i++){
            argOfFunc.splice();
        }
        return fn.apply(newThis, arrayOfArg.concat(argOfFunc));
    }
}

function g(a, b, c) {
    console.log(this, a, b, c);
}
g(1, 2, 3);                         //Window, 1, 2, 3
var p1 = badBind(g, 1, 2, 3);
p1();                               //1, 2, 3
p1(4);                              //1, 2, 3, 4

//Done