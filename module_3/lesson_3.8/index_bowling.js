window.addEventListener("load", function () {

    var request = new XMLHttpRequest();
    request.open("GET", "http://bowling.smartjs.academy/list");
    request.send();

    request.addEventListener("readystatechange", function () {
        if (request.readyState === request.DONE) {
            var list = JSON.parse(request.responseText);
            cb(list);
        }
    });

    function cb(list) {
        var lanes = document.querySelector('select.lanes');
        for (var i = 0; i < list.length; i++) {
            var option = document.createElement('option');
            var id = list[i];
            option.textContent = id;
            option.value = id;
            lanes.appendChild(option);
        }
    }

    var interval;
    var trTrows = document.querySelector('.throws');
    var trScore = document.querySelector('.score');

    document.querySelector('button').addEventListener('click', function (e) {

        var lanes = document.querySelector('select.lanes');
        var laneNumber = lanes.options[lanes.options.selectedIndex].value;

        clearInterval(interval);
        interval = setInterval(function () {
            var request2 = new XMLHttpRequest();
            request2.open("GET", "http://bowling.smartjs.academy/lane?num=" + laneNumber);
            request2.send();

            request2.addEventListener('readystatechange', function () {
                if (request2.readyState === request2.DONE) {
                    var throws = JSON.parse(request2.responseText); //ответ с сервера

                    callback2(throws);

                }
            });
        }, 3000);
    }, false);
    
    function callback2(throws) {
        var allGame = [];
        var round = [];
        throws.forEach(function (item) {
            round.push(item);

            if (item === 10) {
                allGame.push(round);
                round = [];
            }
            else {
                if (round.length === 2) {
                    allGame.push(round);
                    if (round.length === 2) {
                        round = [];
                    }
                }
            }
        });
        function render(array) {
            trTrows.innerHTML = '';
            var score = [];
            var strike = 0;
            var spare = 0;
            var nextStrike = 0;
            array.forEach(function (item) {
                var td = document.createElement('td');
                var td2 = document.createElement('td');
                var tdScore = document.createElement('td');
                if (item[0] === 10) {
                    td.textContent = 'X';
                    if(strike === 20){
                        strike = strike + 10;//30
                        score.push(strike);//30
                        strike = nextStrike + 10;//20
                        nextStrike = 10;
                    }
                    if (strike === 10) {
                        strike = strike + 10;//20
                        nextStrike = 10;
                    }

                    if(spare === 10){
                        spare = spare + 10;
                        score.push(spare);
                        spare = 0;
                        strike = 10;
                    }
                    if(strike === 0) {
                        strike = 10;
                    }
                }
                else {
                    td.textContent = item[0];
                    if (item[0] + item[1] === 10) {
                        td2.textContent = '/';
                        if (spare === 10) {
                            spare = spare + item[0];
                            score.push(spare);
                            spare = 10;
                        }
                        if(spare === 0) {
                            spare = 10;
                        }
                        if (strike === 10) {
                            strike = strike + spare;
                            score.push(strike);
                            strike = 0;
                            spare = 10;
                        }
                        if(strike === 20){
                            strike = strike + item[0];//26
                            score.push(strike);
                            strike = 0;
                            nextStrike = nextStrike + item[0] + item[1];
                            score.push(nextStrike);
                            nextStrike = 0;
                            spare = 10;
                        }
                    }
                    else {
                        td2.textContent = item[1];
                        score.push(item[0] + item[1]);
                        tdScore.textContent = item[0] + item[1];
                        if (spare !== 0) {
                            spare = spare + item[0];
                            score.push(spare);
                            spare = 0;
                        }
                        if (strike === 10) {
                            strike = strike + item[0] + item[1];
                            score.push(strike);
                            strike = 0;
                        }
                        if(strike === 20){
                            strike = strike + item[0];
                            nextStrike = nextStrike + item[0] + item[1];
                            score.push(strike);
                            score.push(nextStrike);
                            strike = 0;
                            nextStrike = 0;
                        }
                    }
                }
                trTrows.appendChild(td);
                trTrows.appendChild(td2);
            });
            if(array.length === score.length){
                score.reduce(function (prev, item) {
                    return prev + item;
                }, 0);
            }
        }
        render(allGame);
    }
});