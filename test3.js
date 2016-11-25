var graph = [
    { from: 1, to: 2, price: 7  },
    { from: 1, to: 3, price: 9  },
    { from: 6, to: 1, price: 14 },
    { from: 2, to: 3, price: 10 },
    { from: 4, to: 2, price: 15 },
    { from: 4, to: 3, price: 11 },
    { from: 5, to: 4, price: 6  },
    { from: 5, to: 6, price: 9  },
    { from: 6, to: 3, price: 2  }
];


function floyd(paths) {
    function pathes(from, to, paths){
        var prices = {};
        var stack = [from];
        prices[from] = {
            price: 0,
            path: [from]
        };
        while(stack.length){
            var current = stack.shift();
            for (var i = 0; i < paths.length; i++) {
                if (paths[i].from === current || paths[i].to === current) {
                    var target;
                    if (paths[i].from === current) {
                        target = paths[i].to;
                    } else {
                        target = paths[i].from;
                    }
                    if (typeof prices[target] === 'undefined') {
                        prices[target] = {price: Infinity};
                    }
                    if (prices[current].price + paths[i].price < prices[target].price) {
                        prices[target] = {
                            price: prices[current].price + paths[i].price,
                            path: prices[current].path.concat(target)
                        };
                        if (stack.indexOf(target) === -1) {
                            stack.push(target);
                        }
                    }
                }
            }
        }
        return prices[to].path;
    }
    var arr = [];
    paths.forEach(function (item) {
        arr[item.from] = arr[item.from] || [];
        arr[item.to] = arr[item.to] || [];
        arr[item.from][item.to] = item.price;
        arr[item.to][item.from] = item.price;
    });
    for (var l = 1; l < arr.length; l++) {
        arr[l] = arr[l] || [];
        arr[l].length = arr.length;
        for (var d = 1; d < arr[l].length; d++) {
            if (typeof arr[l][d] === 'undefined') {
                arr[l][d] = Infinity;
            }
        }
    }
    var flag = true;
    while(flag){
        flag = false;
        for(var i = 1; i < arr.length; i++){
            for(var j = 1; j < arr.length; j++){
                for(var k = 1; k < arr.length; k++){
                    if(arr[i][j] > arr[i][k] + arr[k][j]){
                        arr[i][j] = arr[i][k] + arr[k][j];
                        flag = true;
                    }
                }
            }
        }
    }
    var str = "";
    for (var i = 1; i < arr.length; i++) {
        for (var j = 1; j < arr[i].length; j++) {
            str += arr[i][j] === Infinity ? '_' : arr[i][j];
            str += ' ';
        }
        str += '\n';
    }
}

console.log(floyd(graph));

var graph = [{ from: 1, to: 2, price: 7  },
    { from: 1, to: 3, price: 9  },
    { from: 6, to: 1, price: 14 },
    { from: 2, to: 3, price: 10 },
    { from: 4, to: 2, price: 15 },
    { from: 4, to: 3, price: 11 },
    { from: 5, to: 4, price: 6  },
    { from: 5, to: 6, price: 8  },
    { from: 6, to: 3, price: 2  }];

function floyd(paths) {

    

    
    //_ 7 9 _ _ 14
    //7 _ 10 15 _ _
    //9 10 _ 11 _ 2
    //_ 15 11 _ 6 _
    //_ _ _ 6 _ 8
    //14 _ 2 _ 8 _

    //_ 2 3 _ _ 6
    //1 _ 3 4 _ _
    //1 2 _ 4 _ 6
    //_ 2 3 _ 5 _
    //_ _ _ 4 _ 6
    //1 _ 3 _ 5 _

    
    console.log(next);

    /*
     console.log(next);
     function getShortestPath(i, j){
     if (arr[i][j] === Infinity){
     console.log('no way');
     }
     var c = i;
     while (c !== j){
     console.log(c);
     c = next[c][j];
     console.log(j);
     }
     }*/
    
    console.log(str);
}

floyd(graph);