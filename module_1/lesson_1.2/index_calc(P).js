function calc(n1, op, n2, n3) {

    parseFloat(n1, 10);
    parseFloat(n2, 10);
    parseFloat(n3, 10);
    switch (op) {
        case '+':
            return n1 + n2 === n3;
        case '-':
            return n1 - n2 === n3;
        case '*':
            return n1 * n2 === n3;
        case '/':
            return n1 / n2 === n3;
    }
}

console.log(calc(1, '+', 2, 3));    // true
console.log(calc(2, '-', 8, 5));    // false

//Done