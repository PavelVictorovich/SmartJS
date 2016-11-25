function clone(obj) {
    var copy;

    if (obj === null || typeof obj !== 'object'){
        return obj;
    }
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0; i < obj.length; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }
}

var obj3 = {a: 2, b: ['v', 'd', 'f']};
console.log(clone(obj3));

var obj = {c: [{c: '1'}, {b: '2'}]};
console.log(clone(obj));