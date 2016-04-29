function search(needle, haystack) {

    for (var key in haystack) {
        if (needle === haystack[key]) {
            return true;
        }
        else {
            var valueOfKey = haystack[key];
            if (Array.isArray(valueOfKey) === true) {
                for (var i = 0; i < valueOfKey.length; i++) {
                    if (needle === valueOfKey[i]) {
                        return true;
                    }
                    else if (typeof valueOfKey[i] === 'object') {
                        return search(needle, valueOfKey[i]);
                    }
                }
            }
            else if (typeof (valueOfKey) === "object") {
                return search(needle, valueOfKey);
            }
        }
    }
    return false;
}

console.log(search(5, {a: 3, b: 5, c: 9}));                             // true
console.log(search('5', {a: 3, b: 5, c: 9}));                           // false
console.log(search(5, {a: 3, b: {u: 8, '5': 'c', s: 5}, c: 9}));        // true
console.log(search(5, {a: 3, b: {u: 8, '5': 'c', s: 7}, c: 9}));        // false
console.log(search(5, {a: [1, 2, 3, 5, 7, 9], c: 8, s: 6}));            // true
console.log(search(5, {a: [1, 2, {s: 4, c: {u: 5}}], s: 9}));           // true

//Done