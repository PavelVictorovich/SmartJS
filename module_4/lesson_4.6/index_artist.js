// Помните задание с movable? Когда мы перетаскивали кружочки по div'у. Время сделать его интереснее. Что я хочу:
// при загрузке страницы на всей странице (выставьте height/width 100% у html и body)
// в произвольных местах создаются 10 кругов одинакового радиуса со случайными цветами в HEX.
// Они располагаются так, чтобы не пересекаться друг с другом
// все 10 кругов movable
// при двойном клике по кругу он исчезает
// при двойном клике по пустому месту на странице в этой точке создается круг,
// с центром в точке клика ЕСЛИ новый круг не будет пересекаться с другими кругами
// если перетаскивание заканчивается наложением на другой круг, и расстояние между центрами
// кругов меньше половины радиуса - то эти два круга удаляются, а вместо них создается новый круг,
// цвет которого является средним цветом двух кругов, учавствовавших в слиянии, а позиция -
// усредненные координаты двух кругов
// Детали реализации: Вам понадобятся два класса: класс окружности, который будет хранить
// координаты центра круга, ее цвет и DOM узел. У него будет конструктор, который при создании
// будет получать на вход координаты, создавать в этой точке круг (DOM-узел) и вешать на него
// обработчики перетаскивания.
//
// Второй класс это "поле". В нем вы будете делать следующие вещи: реализовывать обработчик
// двойного клика (в зависимости от targetа смотрим что должны делать - создавать новый круг или удалять старый),
// содержать список всех кругов которые у нас есть (экземпляры класса), проверять на пересечения и
// считать расстояние между кругами
// Нам понадобится два класса Field and Circle
// Circle будет хранить координаты, цвет и узел
// Класс Circle будет уметь - создавать div, drug
// Что должно происходить при drag? Обновлять координаты, срабатывает сеттер, сеттер вызывает рендер, рендер обновляет топ и лефт
// нужно написать функцию render, которая знает дом-узел, который был отрендерен и которая
// вызывается при изменении какой-нибудь координаты
// Т.е. render будет изменять top and left
// Понятие координат - это понятие бизнес-логики (т.е. у нас есть окружность с центром в заданных координатах) и есть
// отображение этой окружности, которая на самом деле рендерится в квадратный див со скругленными уголками

class Circle {

    constructor(x, y, hex, node, myField) {
        this.x = x; //10
        this.y = y;
        this.myField = myField;
        this.hex = hex;
        this.node = node;
        this.node.style.borderRadius = '50%';
        this.node.style.borderStyle = 'solid';
        this.node.style.borderColor = this.hex;
        this.node.style.borderWidth = '5px';
        this.node.style.left = this.x + 'px';
        this.node.style.top = this.y + 'px';
        this.node.style.position = 'absolute';
        this.node.style.boxSizing = 'border-box';
        setTimeout(()=> this.drag(), 0);
        /*
         this.node.style.height = this.radius * 2 + 'px';
         this.node.style.width = this.radius * 2 + 'px';*/
    }
    drag() {
        // меняет координаты
        let movingElement;
        this.node.addEventListener('mousedown', function (event) {
            movingElement = event.target;
            this.x = event.x;
            this.y = event.y;
        });
        this.node.addEventListener('mousemove', (event) => {
            if (movingElement) {
                this.x = event.x - this.x;
                this.y = event.y - this.y;
                this.myField.update(this.x, this.y, this.node);
            }
        });
        this.node.addEventListener('mouseup', (event) => {
            if (movingElement) {
                movingElement = null;
            }
        });
    };
    get x() {
        return this._x; //10
    };
    set x(value) {
        this._x = value;
        setTimeout(() => this.render(), 0);
    };
    get y() {
        return this._y; //10
    };
    set y(value) {
        this._y = value;
        setTimeout(() => this.render(), 0);
    };
    render() {
        this.node.style.left = this.x + 'px';
        this.node.style.top = this.y + 'px';
    }
}

class Field {
    // создали новый cercle and append in field
    // генерация координат
    // проверка на пересечение
    // метод intersects, принимает на вход коорлинаты и проверяет есть ли пересечение с другими circlами, создали new Circle
    // пнули его в массив circles
    // сеттер на circles, рендер -  когда мы запушили в массив (массив поменялся), рендер бежит по нодам, видит, что
    // этот сёркл не отрисован
    // новые серклы
    constructor(node) {
        this.node = node;
        this.circles = [];
        setTimeout(() => {
            for (let i = 0; i <= 10; i++) {
                let hex = '#'+Math.floor(Math.random()*16777215).toString(16);
                let x = ~~(Math.random() * 1000);
                let y = ~~(Math.random() * 1000);
                let div = document.createElement('div');
                this.addCircles(x, y, hex, div);
            }
        }, 0);
        this.circles.forEach((item) => {
            item.node.addEventListener('doubleclick', (event) => {
                let target = event.target;
                this.removeCircle(target);
            });
        });
        this.addEventListener('doubleclick', this.addCircles(event.x, event.y));
    };
    intersects(x, y) {
        this.circles.forEach((item) => {
            if (item.x === x && item.y === y) {
                return false;
            }
        });
        return true;
    }
    addCircles(x, y, hex, node) {
        const c = new Circle(x, y, hex, node, this);
        if (this.intersects(c.x, c.y)) {
            this.node.appendChild(c);
        }
    }
    set circles(c) {
        this._circles = this.circles.concat(c);
        setTimeout(() => {
            this.render();
        }, 0);
    }
    get circles() {
        return this._circles;
    }
    render(){
        let children = this.node.children;
        children = Array.from(children);
        this.circles.forEach((item) => {
            children.forEach((item2) => {
                if(item !== item2){
                    this.addCircles();
                }
            })
        });
    }
    removeCircle(curNode){
        this.circles.forEach((item, i) => {
            if(curNode === item){
                this.circles.splice(i, 1);
            }
        });
    }
    checkCircles(){
        this.circles.forEach((item) => {
            this.circles.forEach((item2) => {
                if(item.x === item2.x && item.y === item2.y){
                    this.removeCircle(item);
                    this.removeCircle(item2);
                    this.addCircles(item.x, item.y);
                }
            })
        })
    }
    update(x, y, circleNode){
        this.circles.forEach((item) => {
            if(item === circleNode){
                item.x = x;
                item.y = y;
            }
        })
    }
//добавить обработчик даблклика, в обработчике в филде я буду проверять, если мне кликнули по серклу, я нахожу его в массиве
// серклс и удаляю. Это делать нужно при создании конструктора, потому что вешаться он должен один раз.
    // если у нас произошел даблклик по пустому месту, то просто вызываем addCircles/ ТОлько в эддСерклс
    // мы должны передавать координаты
    // и слияние - берем филд, у филда у нас есть серклс, бежим по массиву, и если у нас где-то радиус оказался меньше,
    // удаляем два серкла и создаем новый
    // после этого серкл вызовет сам рендер. У нас будет функция checkCircles(), которая бежит по всем окружностям в
    // массиве серклс, проверяет попарно их на близость и если они близки, то удаляет и создает новый серкл
    // в Серкле, понадобатся еще одно поле Филд. Серкл знает когда он обновился? Когда х у перезаписали в драге -
    // он обновился. И в Филде мы вызовем метод, который называется update. В серкл мы передаем Филд, теперь
    // Серкл при драге будет вызывать метод update(), таким образом Филд будет узнавать, что Серкл передвинули и
    // сможет запускать эти проверки. Метод update() должен быть в Филде. Мы Серклу передали Филд, он знает теперь
    // в какой он Филд вложен,  и Серкл будет сообщать Филду - я обновился. запусти пересчет.
    // Если хотите можете
    // передать в конструктор функцию онЧенж, которую Серкл будет вызывать когда что-то поменялось. А когда мы создаем
    // Серкл в филде, мы будем передавать в онЧенж функцию филдАпдейт, только она должна быть стрелочной, чтобы зис не отвалился
    //
}
