function beautyLine(str) {
    var obj = {};
    var counter = 1;
    var result = 0;
    str = str.toLowerCase().replace(/[^a-z]/g, '').split('').sort();
    for (var i = 0; i < str.length; i++) {
        var key = str[i];
        if (str[i] === str[i + 1]) {
            counter++;
        } else {
            obj[key] = counter;
            counter = 1;
        }
    }
    var arrOfvalue = [];
    for (var key in obj) {
        arrOfvalue.push(obj[key]);
    }
    arrOfvalue.sort();
    var beautySumbol = 26;
    for (var i = arrOfvalue.length; i > 0; i--){
        result += arrOfvalue[i - 1] * beautySumbol;
        beautySumbol--;
    }
    return result;
}
console.log(beautyLine('ABbCcc'));                                          // 152
console.log(beautyLine('Good luck in the Facebook Hacker Cup this year!')); // 754
console.log(beautyLine('Ignore punctuation, please :)'));                   // 491
console.log(beautyLine('Sometimes test cases are hard to make up.'));       // 729
console.log(beautyLine('So I just go consult Professor Dalves'));           // 646

//Done