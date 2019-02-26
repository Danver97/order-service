const uuid = require('uuid/v4');

class Dish {
    constructor(name, price) {
        this.id = uuid();
        this.name = name;
        this.price = price;
        this.served = false;
    }

    static fromObject(obj) {
        const dish = new Dish(obj.name, obj.price);
        dish.id = obj.id;
        dish.served = obj.served;
        return dish;
    }

    isServed() {
        return this.served;
    }
}

module.exports = Dish;
