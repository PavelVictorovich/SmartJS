function funcBit(n, p1, p2) {

    var bitArray = [0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < 8; i++) {
        bitArray[i] = n % 2;
        n = (n - (n % 2)) / 2;
    }
    p1 = bitArray[p1 - 1];
    p2 = bitArray[p2 - 1];
    return p1 === p2;
}

console.log(funcBit(86, 2, 3));  //true

//Done