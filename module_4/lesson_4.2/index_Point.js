window.addEventListener('load', function () {

    function Point(x, y) {
        this.x = x;
        this.y = y;
    };

    function Segment(start, end) {
        this.start = start;
        this.end = end;
    }

    Segment.prototype.intersects = function (that) {
        var xCoord = ((this.start.x * this.end.y - this.start.y * this.end.x) *
            (that.start.x - that.end.x) - (this.start.x - this.end.x) *
            (that.start.x * that.end.y - that.start.y * that.end.x)) /
            ((this.start.x - this.end.x) * (that.start.y - that.end.y) -
            (this.start.y - this.end.y) * (that.start.x - that.end.x));
        var yCoord = ((this.start.x * this.end.y - this.start.y * this.end.x) *
            (that.start.y - that.end.y) - (this.start.y - this.end.y) *
            (that.start.x * that.end.y - that.start.y * that.end.x)) /
            ((this.start.x - this.end.x) * (that.start.y - that.end.y) -
            (this.start.y - this.end.y) * (that.start.x - that.end.x));

        //  (((x1<=x)and(x2>=x)and(x3<=x)and(x4>=x))or
        // ((y1<=y) and(y2>=y)and(y3<=y)and(y4>=y)))

        if ((this.start.x <= xCoord) && (this.end.x >= xCoord) && (that.start.x <= xCoord) && (that.end.x >= xCoord) ||
            (this.start.y <= yCoord) && (this.end.y >= yCoord) && (that.start.y <= yCoord) && (that.end.y >= yCoord)) {
            return new Point(xCoord, yCoord);
        }

        else {
            return null;

        }
    };

    function Polygon(array) {
        this.array = array;
    };

    Polygon.prototype.render = function (svg, hex) {
        var svgTag = document.getElementById('svg-elem');
        var polygonTag = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        svgTag.appendChild(polygonTag);

        var attrPoints = '';
        for (var i = 0; i < this.array.length; i++) {
            var startPoint = {
                x: this.array[i].start.x,
                y: this.array[i].start.y
            };
            attrPoints = attrPoints + startPoint.x + ',' + startPoint.y + ' ';
            polygonTag.setAttribute('points', attrPoints);
        }
        polygonTag.setAttribute('fill', hex);

    };

    Polygon.prototype.intersect = function (that) {
        var intersectsPoint = [];

        for (var i = 0; i < this.array.length; i++) {
            for (var j = 0; j < that.array.length; j++) {
                intersectsPoint.push(this.array[i].intersects(that.array[j]));
            }
        }
        return intersectsPoint;
    };


    // ???????? ??? ??????????? ??????? ???, ??? ????? intersects,
    // ?????????? ?????? Polygon, ??????????? ???????????
    // ???? ???? ???????????????, ???? null, ???? ??? ?? ????????????.

    var a = new Point(188, 10);
    var b = new Point(156, 90);
    var c = new Point(236, 42);
    var d = new Point(140, 42);
    var e = new Point(220, 90);

    var s = new Segment(a, b);
    var s2 = new Segment(b, c);
    var s3 = new Segment(c, d);
    var s4 = new Segment(d, e);
    var s5 = new Segment(e, a);

    var arr = [s, s2, s3];
    var arr2 = [s2, s3, s4];
    var svgEl = document.getElementById('svg-elem');

    var newArray = new Polygon(arr);
    var newArray2 = new Polygon(arr2);
    console.log(newArray.render(svgEl, '#ff0000'));
    console.log(s2.intersects(s3));
    console.log(newArray.intersect(newArray2));
});