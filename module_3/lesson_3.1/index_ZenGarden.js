window.onload = function () {
    var body = document.querySelectorAll('body')[0],
        findBtn = document.querySelector('.selector-find'),
        nextBtn = document.querySelector('.selector-next'),
        prevBtn = document.querySelector('selector-prev'),
        parentBtn = document.getElementsByClassName('nav-top')[0],
        firstChildBtn = document.getElementsByClassName('nav-bottom')[0],
        prevSiblingBtn = document.getElementsByClassName('nav-left')[0],
        nextSiblingBtn = document.getElementsByClassName('nav-right')[0],
        input = document.querySelector('.selector');

    var state = {
        results: [],
        position: 0,
        currEl: null
    };

    function update(){
        function enableBtn(btn, condition){
            if(condition){
                btn.removeAttribute('disabled');
            }else{
                btn.setAttribute('disabled','disabled');
            }
        }
        enableBtn(nextBtn, state.position !== state.results.length - 1 || state.results[state.position] === state.currEl);
        enableBtn(prevBtn, state.position === 0 || state.results[state.position] === state.currEl);
        enableBtn(parentBtn, state.currEl.parentNode);
        enableBtn(firstChildBtn, state.currEl.firstElementChild);
        enableBtn(prevSiblingBtn, state.currEl.previousElementSibling);
        enableBtn(nextSiblingBtn, state.currEl.nextElementSibling);

        var oldEl = body.querySelector('.active');

        if(oldEl){
            oldEl.style.backgroundColor = '';
            oldEl.style.border = '';
            oldEl.classList.remove('active');
        }

        state.currEl.style.backgroundColor = 'lightblue';
        state.currEl.style.border = '5px solid red';
        state.currEl.classList.add('active');
    }

    function findEl(){
        state.currEl = input.value;
        state.position = 0;
        state.results = body.querySelectorAll(state.currEl);
        state.currEl = state.results[0];
        update();
    }
    findBtn.addEventListener('click', findEl, false);

    function nextEl(){
        state.position ++;
        state.currEl = state.results[state.position];
        update();
    }
    nextBtn.addEventListener('click', nextEl, false);

    function prevEl(){
        state.position --;
        state.currEl = state.results[state.position];
        update();
    }
    prevBtn.addEventListener('click', prevEl, false);

    function parentEl(){
        state.currEl = state.currEl.parentNode;
        update();
    }
    parentBtn.addEventListener('click', parentEl, false);

    function firstChild(){
        state.currEl = state.currEl.firstElementChild;
        update();
    }
    firstChildBtn.addEventListener('click', firstChild, false);

    function prevSib(){
        state.currEl = state.currEl.previousElementSibling;
        update();
    }
    prevSiblingBtn.addEventListener('click', prevSib, false);

    function nextSib(){
        state.currEl = state.currEl.nextElementSibling;
        update();
    }
    nextSiblingBtn.addEventListener('click', nextSib, false);
};