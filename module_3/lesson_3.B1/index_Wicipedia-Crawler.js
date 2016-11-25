window.onload = function () {

    var socket = new WebSocket("ws://bowling.smartjs.academy");

    var request = new XMLHttpRequest();
    request.open('GET', 'http://bowling.smartjs.academy/list');
    request.send();

    function setT(){
        var request = new XMLHttpRequest();
        request.open('GET', 'http://bowling.smartjs.academy/lane?num=579bf4a.cdce3f');
        request.send();
        setT();
    }

    setInterval(setT, 5000);

    function gameThrows (socket){
        var throws = {
            throw01: [],
            throw02: [],
            throw03: [],
            throw04: [],
            throw05: [],
            throw06: [],
            throw07: [],
            throw08: [],
            throw09: [],
            throw10: []
        };
        var nextThrow = 0;
        for (var key in throws){
            for (var i = 0; i<socket.length;i++) {

                if (socket[i] === 10) {
                    throws.key = [10, 0, 0]
                }
                if (socket[i] + socket[i + 1] === 10) {
                    nextThrow = socket[i + 2];
                    throws.key = [].concat(socket[i]).concat(socket[i + 1]).push(nextThrow);
                }
            }
        }
    }



};