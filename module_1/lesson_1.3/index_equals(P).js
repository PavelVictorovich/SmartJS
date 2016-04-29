function equals(obj1, obj2) {

    if (obj2 === null && obj1 === obj2) {
        return true;
    }
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    for (var key in obj1) {
        if (obj1[key] === obj2[key]) {
            continue;
        }
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            if (Array.isArray(obj1[key]) !== Array.isArray(obj2[key])) {
                return false;
            }
            if (!equals(obj1[key], obj2[key])) {
                return false;
            }
        }
    }
    return true;
}

console.log(equals(
    {a: [1, 2, {s: 4, c: {u: 5}}], s: 9},
    {a: [1, 2, {s: 4, c: {u: 5}}], s: 9}
));

//Done