var list = {
    create: function create(){
        return {value: 'headElement', next: null};
    },

    add: function add(listInstance, value){
        if(listInstance.next === null){
            listInstance.next = {value: value, next: null};
        }else{
            list.add(listInstance.next, value);
        }
    },

    get: function get(listInstance, index) {
        if (index === 0) {
            return listInstance.next;
        }
        if (index > 0) {
            return list.get(listInstance.next, index - 1);
        }
    },

    remove: function remove (listInstance, index) {
        var toBeRemovedList = list.get(listInstance, index);
        var newList = listInstance.next;
        var counter = 0;
        while (counter < index) {
            var prevList = newList.next;
            newList = newList.next;
            counter++;
        }
        prevList.next = toBeRemovedList.next;
        return toBeRemovedList;
    },

    search: function search(listInstance, v) {
        if (listInstance.value === v) {
            return list;
        }else{
            if (listInstance.next === null) {
                return null;
            } else {
                return list.search(listInstance.next, v);
            }
        }
    },

    isEmpty: function isEmpty(listInstance) {
        if(listInstance.value !== null && listInstance.next !== null){
            return false;
        }else{
            return true;
        }
    },

    insertAt: function insertAt(listInstance, v, index) {
        if (listInstance.next === null) {
            return false;
        }else{
            if(index === 0){
                listInstance.next = {value: v, next: listInstance.next};
            }else{
                list.insertAt(listInstance.next, v, index - 1);
            }
        }
    },

    toArray: function toArray (listInstance) {var arr = [];
        if (listInstance.next === null) {
            return listInstance.value;
        } else {
            if (typeof(listInstance.value) !== 'number') {
                var result = list.toArray(listInstance.next);
                arr = arr.concat(result);
            } else {
                arr.push(listInstance.value);
                var result = list.toArray(listInstance.next);
                arr = arr.concat(result);
            }
        }
        return arr;
    },

    size: function size (listInstance) {
        var counter = 0;
        if (list.next === null) {
            return counter;
        }
        var result = size(listInstance.next);
        counter += result;
        return ++counter;
    }
};
var x = {value: null, next: {value: 1, next: {value: 3, next: {value: 5, next: {value: 8, next: {value: 10, next: null}}}}}};
console.log(list.remove(x, 1));
console.log(list.toArray(x)); // [1, 5, 8, 10]
console.log(list.insertAt(x, 2, 11));
console.log(list.toArray(x)); // [1, 5, 11, 8, 10]
console.log(list.search(x, 11)); //{value: 11, next: { value: 8, next: { value: 10, next: null } } }
console.log(list.isEmpty(x));
console.log(list.size(x));

//Done