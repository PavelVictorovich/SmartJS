function  Complex (x, y){
    this.x = x;
    this.y = y;
}

Complex.prototype.add = function(that){
    if(that instanceof Complex){
        return new Complex((this.x + that.x), (this.y + that.y))
    }
    if(typeof that === 'number'){
        return new Complex((this.x + that), this.y)
    }
};
Complex.prototype.sub = function(that){
    if(that instanceof Complex){
        return new Complex(this.x - that.x, this.y - that.y);
    }
    if(typeof that === 'number'){
        return new Complex(this.x - that.x, this.y);
    }
};
Complex.prototype.mul = function(that){
    if(that instanceof Complex){
        return new Complex(this.x * that.x - this.y * that.y,
            this.x * that.x + this.y * that.y);
    }
    if(typeof that === 'number'){
        return new Complex(this.x * that.x - this.y,
            this.x * that.x + this.y);
    }
};
Complex.prototype.div = function(that){
    if(that instanceof Complex){
        return new Complex(this.x * that.x + this.y * that.y / that.x * that.x + that.y * that.y,
            that.x * this.y - this.x * that.y / that.x * that.x + that.y * that.y);
    }
    if(typeof that === 'number'){
        return false;
    }
};
Complex.prototype.equal = function(that){
    if(that instanceof Complex){
        return this.x === that.x && this.y === that.y;
    }
    if(typeof that === 'number'){
        return false;
    }
};
Complex.prototype.conj = function(){
    return new Complex(this.x, -this.y);
};

var z1 = new Complex(14, 1);
var z2 = new Complex(2, 9);
console.log(z1.add(z2));
console.log(z1.sub(z2));
console.log(z1.div(z2));
console.log(z1.mul(z2));
console.log(z1.equal(z2));
console.log(z1.conj());