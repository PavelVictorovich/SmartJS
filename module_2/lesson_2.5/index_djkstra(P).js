var graph = [   { from: 1, to: 2, price: 7  },
                { from: 1, to: 3, price: 9  },
                { from: 6, to: 1, price: 14 },
                { from: 2, to: 3, price: 10 },
                { from: 4, to: 2, price: 15 },
                { from: 4, to: 3, price: 11 },
                { from: 5, to: 4, price: 6  },
                { from: 5, to: 6, price: 9  },
                { from: 6, to: 3, price: 2  }];

function djkstra(from, to, paths){
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

console.log(djkstra( 1, 4, graph)); //[ 1, 3, 4]
console.log(djkstra( 1, 5, graph)); //[ 1, 3, 6, 5]

//Done