window.addEventListener('load', function () {
    var test = document.querySelector('#test');
    var test2 = document.querySelector('#test2');
});
(function () {
    var movingElement;
    document.addEventListener('mousedown', function (event) {
        movingElement = event.target;
        movingElement.dataset.x = event.x;
        movingElement.dataset.y = event.y;
    });
    document.addEventListener('mousemove', function (event) {
        if (movingElement) {
            var deltaX = event.x - movingElement.dataset.x;
            var deltaY = event.y - movingElement.dataset.y;

            movingElement.style.left = (parseInt(movingElement.style.left || 0, 10) + deltaX) + 'px';
            movingElement.style.top = (parseInt(movingElement.style.top || 0, 10) + deltaY) + 'px';

            movingElement.dataset.x = event.x;
            movingElement.dataset.y = event.y;
            movingElement.dataset.moving = 'true';

            var left = movingElement.offsetLeft;
            var top = movingElement.offsetTop;
            var right = left + movingElement.offsetWidth;
            var bottom = top + movingElement.offsetHeight;

            if(movingElement.parentNode !== document.querySelector('body')){
                var parentElement = movingElement.parentNode;
                if(right > parentElement.offsetWidth){
                    movingElement.style.left = (parentElement.offsetWidth - movingElement.offsetWidth) + 'px';
                }
                if(bottom > parentElement.offsetHeight){
                    movingElement.style.top = (parentElement.offsetHeight - movingElement.offsetHeight) + 'px';
                }
                if(left < 0){
                    movingElement.style.left = 0;
                }
                if(top < 0){
                    movingElement.style.top = 0;
                }
            }

            if(movingElement.parentNode === document.querySelector('body')){
                var children = movingElement.children;

                for(var i = 0; i < children.length; i++){
                    if(right < children[i].offsetLeft + children[i].offsetWidth){
                        movingElement.style.right = children[i].offsetLeft + children[i].offsetWidth + 'px';
                    }
                }
            }
        }
    });
    document.addEventListener('mouseup', function () {
        if (movingElement) {
            delete movingElement.dataset.x;
            delete movingElement.dataset.y;
            delete  movingElement.dataset.moving;
            movingElement = null;
        }
    })
})();