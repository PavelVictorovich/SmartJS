function permutationIterative(n) {

    function getRange(n) {

        var res = [];
        for (var i = 0; i < n; i++) {
            res.push(i);
        }
        return res;
    }

    var solutions = [];
    solutions[1] = [[0]];
    solutions[2] = [[0, 1], [1, 0]];
    for (var currentN = 2; currentN <= n; currentN++) {
        var currentResults = [];
        for (var i = 0; i < currentN; i++) {
            var myNumbers = getRange(currentN);
            myNumbers.splice(i, 1);
            var goodSolutions = solutions[currentN - 1];
            for (var j = 0; j < goodSolutions.length; j++) {
                var currentSolution = [];
                for (var k = 0; k < goodSolutions[j].length; k++) {
                    currentSolution.push(myNumbers[goodSolutions[j][k]]);
                }
                currentResults.push([i].concat(currentSolution));
            }
        }
        solutions[currentN] = currentResults;
    }
    return solutions[n];
}

//Done