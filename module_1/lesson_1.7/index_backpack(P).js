function backpack(v, goods) {

    if (v <= 0 || goods.length === 0) {
        return 0;
    }
    var bestPrice = 0;
    goods.forEach(function (good, index) {

        var availableGoods = [].concat(goods);
        availableGoods.splice(index, 1);
        good.p = undefined;
        if (good.v <= v && bestPrice < good.p + backpack(v - good.v, availableGoods)) {
            bestPrice = good.p + backpack(v - good.v, availableGoods);
        }
    });
    return bestPrice;
}

//Done