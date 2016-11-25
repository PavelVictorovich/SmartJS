var Tree = {
    create: function create (value) {
        return {value: value, left: null, right: null};
    },
    add: function add (tree, value) {
        if(value < tree.value){
            if(tree.left === null){
                tree.left = {value: value, left: null, right: null};
            }else{
                Tree.add(tree.left, value);
            }
        }else{
            if(tree.right === null){
                tree.right = {value: value, left: null, right: null};
            }else{
                Tree.add(tree.right, value);
            }
        }
    },
    search: function search (tree, value) {
        if (tree.left === null || tree.right === null) {
            return false;
        }
        if (tree.value === value) {
            return true;
        }else{
            if (tree.value < value) {
                return Tree.search(tree.right, value);
            } else {
                return Tree.search(tree.left, value);
            }
        }
        return false;
    },
    print: function print (tree) {
        if (tree.left) {
            Tree.print(tree.left);
        }
        console.log(tree.value);
        if (tree.right) {
            Tree.print(tree.right);
        }
    },
    remove: function remove (tree, value) {
        if (tree.value === value) {
            if (tree.left === null && tree.right === null) {
                return false;
            }
            if (tree.left === null) {
                return tree.right;
            }
            if (tree.right === null) {
                return tree.left;
            }
            var tempNode = function (tree) {
                var current = tree.value;
                while (current.left !== null) {
                    current = current.left;
                }
                return current.value;
            };
            tree.value = tempNode.value;
            tree.right = Tree.remove(tree.right, tempNode.value);
            return tree;
        }
        else if (tree < value) {
            tree.left = Tree.remove(tree.left, value);
        }
        else {
            tree.right = Tree.remove(tree.right, value);
            return tree;
        }
    }
};
var t = Tree.create(8);
Tree.add(t, 10);
Tree.add(t, 3);
Tree.add(t, 1);
Tree.add(t, 6);
Tree.add(t, 4);
Tree.add(t, 7);
Tree.add(t, 14);
Tree.add(t, 13);
//Tree.print(t); // 1 3 4 6 7 8 10 13 14
console.log(t = Tree.search(12));
console.log(t = Tree.search(6));
console.log(Tree.remove(t, 10));