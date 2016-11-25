window.onload = function () {

    function getUsersList() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://jsonplaceholder.typicode.com/users');
        request.send();

        request.addEventListener('readystatechange', function(){
            var startTime = new Date();
            if(request.readyState === request.DONE){
                var users = JSON.parse(request.responseText);
                var endTime = new Date();

                var loadTime = endTime - startTime;
                var loadTimeTag = document.querySelector('.loadtime');
                loadTimeTag.innerHTML = loadTime;
                cb(users);
            }
        });
    }

    function cb(users){
        for (var i = 0; i < users.length; i++) {
            var currentUser = users[i];
            var currentName = currentUser.name;
            var currentEmail = currentUser.email;

            var list = document.querySelector('.list');
            var link = document.createElement('a');

            link.innerHTML = currentName;
            link.setAttribute('href', 'mailto:' + currentEmail);

            list.appendChild(link);
            link.onmouseover = function (event) {
                var content = event.target.innerHTML;
                console.log(content);

                event.target.setAttribute('title', content);
            };
            link.onmouseout = function(event){
                event.target.removeAttribute('title')
            }
        }
    }

    var btn = document.querySelector('.btn');
    btn.addEventListener('click', getUsersList, false);

    getUsersList();

};