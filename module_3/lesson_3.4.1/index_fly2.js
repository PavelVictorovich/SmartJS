window.addEventListener('load', function() {

    var container = document.querySelector('#container');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < (Math.random() * 10) + 10; i++){
        var div = document.createElement('div');
        div.dataset.dx = Math.random() * 45 + 5;
        div.dataset.dy = Math.random() * 45 + 5;
        div.classList.add('flyer');
        div.style.left = (Math.random() * 1000) + 'px';
        div.style.top = (Math.random() * 1000) + 'px';
        div.style.backgroundColor = '#' + (parseInt(Math.random() * 256 * 256 * 256).toString(16));
        var randomSize = parseInt(Math.random() * 50 + 50);
        div.style.width = randomSize + 'px';
        div.style.height = randomSize + 'px';
        var radius = randomSize/2;
        div.dataset.radius = radius;
        div.style.borderRadius = randomSize/2 + 'px';
        fragment.appendChild(div);
    }

    container.appendChild(fragment);

    var circles = Array.from(document.querySelectorAll('.flyer'));

    setInterval(function fly() {

        circles.forEach( function (flier) {
            var dx = flier.dataset.dx;
            var dy = flier.dataset.dy;
            flier.style.left = (parseInt(flier.style.left, 10) + ~~dx) + 'px';
            flier.style.top = (parseInt(flier.style.top, 10) + ~~dy) + 'px';
            var left = flier.offsetLeft;
            var top = flier.offsetTop;
            var right = left + flier.offsetWidth;
            var bottom = top + flier.offsetHeight;
            if (right > container.offsetWidth) {
                flier.style.left = (container.offsetWidth - flier.offsetWidth) + 'px';
                flier.dataset.dx = -dx;
            }
            if (bottom > container.offsetHeight) {
                flier.style.top = (container.offsetHeight - flier.offsetHeight) + 'px';
                flier.dataset.dy = -dy;
            }
            if (left < 0) {
                flier.style.left = '0px';
                flier.dataset.dx = -dx;
            }
            if (top < 0) {
                flier.style.top = '0px';
                flier.dataset.dy = -dy;
            }

            circles.forEach(function (i) {
                var x1 = parseInt(i.dataset.dx) + parseInt(i.dataset.radius);
                var y1 = parseInt(i.dataset.dy) + parseInt(i.dataset.radius);

                circles.forEach(function (j) {
                    if (i !== j) {

                        var x2 = parseInt(j.dataset.dx) + parseInt(j.dataset.radius);
                        var y2 = parseInt(j.dataset.dy) + parseInt(j.dataset.radius);

                        var distance = parseInt(Math.sqrt(Math.pow((Math.abs(x1 - x2)), 2) + Math.pow((Math.abs(y1 - y2)), 2)));
                        var radiusSum = parseInt(i.dataset.radius) + parseInt(j.dataset.radius);

                        if (distance === radiusSum) {
                            i.dataset.dx = -i.dataset.dx;
                            i.dataset.dy = -i.dataset.dy;
                            j.dataset.dx = -j.dataset.dx;
                            j.dataset.dy = -j.dataset.dy;
                            //debugger;
                        }
                    }
                });
            });
        }) 
    }, 50);
});