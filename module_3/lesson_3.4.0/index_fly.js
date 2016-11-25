window.addEventListener('load', function () {


    var container = document.querySelector('#container');
    var flyer = document.querySelector('#flyer');
    flyer.style.left = 0;
    flyer.style.top = 0;

    var dx = ~~(Math.random() * 20) + 2 ;
    var dy = ~~(Math.random() * 20) + 2;

    var divs = ~~(Math.random() * 10) + 2;
    var bg = '#'+(~~(Math.random()*256*256*256)).toString(36);


    setInterval(function fly() {
        flyer.style.left = (parseInt(flyer.style.left, 10) + dx) + 'px';
        flyer.style.top = (parseInt(flyer.style.top, 10) + dy) + 'px';

        var left = flyer.offsetLeft;
        var top = flyer.offsetTop;
        var right = left + flyer.offsetWidth;
        var bottom = top + flyer.offsetHeight;

        if (right > container.offsetWidth) {
            flyer.style.left = (container.offsetWidth - flyer.offsetWidth) + 'px';
            dx = -dx;
        }
        if (bottom > container.offsetHeight) {
            flyer.style.top = (container.offsetHeight - flyer.offsetHeight) + 'px';
            dy = -dy;
        }
        if (left < 0) {
            flyer.style.left = '0px';
            dx = -dx;
        }
        if (top < 0) {
            flyer.style.top = '0px';
            dy = -dy;
        }
    }, 50);
});