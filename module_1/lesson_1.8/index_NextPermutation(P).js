function nextPermutation (string) {

    var str = string.split('');
    var currentPosition = str.length - 2;
    var goodNumbers = [str[str.length - 1]];
    while (currentPosition >= 0 && str[currentPosition] > str[currentPosition + 1]) {
        goodNumbers.push(str[currentPosition]);
        currentPosition--;
    }
    if (currentPosition === -1) {
        return false;
    }
    goodNumbers.sort();
    var newNumber;
    for (var i = 0; i < goodNumbers.length; i++) {
        if (goodNumbers[i] > str[currentPosition]) {
            newNumber = goodNumbers[i];
            break;
        }
    }
    goodNumbers[i] = str[currentPosition];
    str[currentPosition] = newNumber;
    goodNumbers.sort();
    return str.slice(0, currentPosition + 1).concat(goodNumbers).join('');
}

//Done