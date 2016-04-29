function generateTable(l, w) {

    var result, str = "", maxSpace = "";
    var maxLine = (l * w) + " ";
    for (var i = 1; i <= l; i++) {
        for (var j = 1; j <= w; j++) {
            result = i * j;
            maxSpace = " ".repeat(String(maxLine).length - String(result).length);
            str = str + maxSpace + result + " ";
        }
        str += '\n';
    }
    return str;
}

console.log(generateTable(12, 12));

//Done