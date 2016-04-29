var R = {
    _: 'kitty',
    evilBind: function (func, newThis) {
        var arrayOfArg = [].slice.call(arguments);
        return function () {
            var argOfBind = arrayOfArg.concat().splice(2);
            var argOfFunc = [].slice.call(arguments);
            argOfBind.forEach(function (item, i) {
                if (item === 'kitty') {
                    argOfBind.splice(i, 1, argOfFunc[0]);
                    argOfFunc.splice(0, 1);
                }
            });
            var otherArg = argOfBind.concat(argOfFunc);
            return func.apply(newThis, otherArg);
        }
    }
};

function g(a, b, c) {
    console.log(this, a, b, c);
}
g(1, 2, 3);                             //Window, 1, 2, 3
var p1 = R.evilBind(g, 1, 2, 3, R._);
p1();                                   //1, 2, 3, undefined
p1(4);                                  //1, 2, 3, 4
var p2 = R.evilBind(g, 1, R._, 2, 3);
p2();                                   //1, undefined, 2, 3
p2(4);                                  //1, 4, 2, 3
var p3 = R.evilBind(g, 1, R._, R._);
p3();                                   //1, undefined, undefined, undefined
p3(4);                                  //1, 4, undefined, undefined
p3(4, 5);                               //1, 4, 5, undefined
p3(4, 5, 6);                            //1, 4, 5, 6

//Done