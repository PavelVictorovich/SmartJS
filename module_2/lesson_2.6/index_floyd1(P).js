function floyd(paths) {
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
    return str;
}
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
console.log(floyd(graph));

//Done