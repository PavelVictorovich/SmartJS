function permutations(n) {

    function generatePermutations(list) {

        if (list.length === 1) {
            return [list];
        }
        var results = [];
        for (var i = 0; i < list.length; i++) {
            var newList = [].concat(list);
            newList.splice(i, 1);
            var smallerResult = generatePermutations(newList);
            for (var j = 0; j < smallerResult.length; j++) {
                results.push([list[i]].concat(smallerResult[j]));
            }
        }
        return results;
    }

    var initial = [];
    for (var c = 1; c <= n; c++) {
        initial.push(c);
    }
    return generatePermutations(initial);
}

console.log(permutations(3));

//Done