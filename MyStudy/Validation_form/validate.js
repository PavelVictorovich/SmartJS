function Validation() {
    this.valid = function(type) {
        var items = document.querySelectorAll('[required]'),
            len = items.length,
            current, text, re, isfilled = false, blank = [];

        for(var i=0; i<len; i++) {
            current = items[i];
            current.addEventListener('focus', function(e){
                text = this.parentNode.querySelector('.error').childNodes[0];
                //this.removeAttribute('class');
                this.className = 'normal';
                if(text) {
                    this.parentNode.querySelector('.error').removeChild(text);
                }
            });
            if(!current.value) {
                current.className = 'warn';
                blank.push(current)
            } else {
                re = new RegExp(current.pattern);
                if(!re.test(current.value)) {
                    switch(type){
                        case 'box': this.box(current); break;
                        case 'tip': this.tips(current); break;
                    }
                    blank.push(current)
                }
            }
        }
        isfilled = blank.length ? false : true;
        return isfilled;
    };
    Validation.prototype.box = function(el) {
        var body = document.querySelector('body'),
            shadow = document.createElement('div'),
            tips = document.createElement('div'),
            tipstext = document.createTextNode(el.dataset.tip || 'error');

        shadow.className = 'shadow';
        tips.className = 'tips';
        tips.appendChild(tipstext);
        shadow.appendChild(tips);
        body.appendChild(shadow);
        shadow.addEventListener('click', function(e){
            e.preventDefault();
            body.removeChild(shadow);
        });
    };
    Validation.prototype.tips = function(el) {
        var pa = el.parentNode.childNodes,
            error = el.parentNode.querySelector('.error'),
            tiptext = document.createTextNode(el.dataset.tip || 'error');

        if(error.childNodes.length == 0) {
            error.appendChild(tiptext)
        }
    }
}

function submit() {
    var isvalid;
    var btn = document.querySelector('button[type=submit]');
    var currentform = document.querySelector('#new');

    currentform.addEventListener('submit', function(e) {
        e.preventDefault();
        var myvalid = new Validation();
        isvalid = myvalid.valid('tip');
        if (isvalid) {
            console.log('isvalid');
        } else {
            console.log('isvalid');
        }
    })
}
submit();