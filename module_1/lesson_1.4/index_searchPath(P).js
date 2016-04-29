function searchPath(needle, haystack) {

    var result = "";
    for (var key in haystack) {
        if (needle === haystack[key]) {
            result += key;
        }
        else {
            var valueOfKey = haystack[key];
            if (Array.isArray(valueOfKey) === true) {
                for (var i = 0; i < valueOfKey.length; i++) {
                    if (needle === valueOfKey[i]) {
                        result = key + '[' + i + ']';
                    }
                    else if (typeof valueOfKey[i] === 'object') {
                        result = key + '[' + i + '].' + (searchPath(needle, valueOfKey[i]));
                    }
                }
            }
            else if (typeof (valueOfKey) === "object") {
                result = key + '.' + (searchPath(needle, valueOfKey));
            }
        }
    }
    if (result.length > 0) {
        return result;
    } else {
        return false;
    }
}

console.log(searchPath(5, {a: 3, b: 5, c: 9}));                             // b
console.log(searchPath('5', {a: 3, b: 5, c: 9}));                           // false
console.log(searchPath(5, {a: 3, b: {u: 8, '5': 'c', s: 5}, c: 9}));        // b.s
console.log(searchPath(5, {a: 3, b: {u: 8, '5': 'c', s: 7}, c: 9}));        // false
console.log(searchPath(5, {a: [1, 2, 3, 5, 7, 9], c: 8, s: 6}));            // a[3]
console.log(searchPath(5, {a: [1, 2, {s: 4, c: {u: 5}}, 9], s: 9}));        // a[2].c.u

//Done