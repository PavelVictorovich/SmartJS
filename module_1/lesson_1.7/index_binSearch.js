function binSearch(arr, value) {
    for (var i in arr) {
        if (value === arr[(arr.length) / 2]){
            return i;
        }else {
            if (value < arr[(arr.length) / 2]) {
                binSearch(arr.slice(0, (arr.length) / 2), value);
                return i;
            } else {
                binSearch(arr.slice((arr.length) / 2, arr.length), value);
                return i;
            }
        }
        return -1;
    }
}

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var val = 5;
console.log(binSearch(array, val));

//решить с помощью замыкания