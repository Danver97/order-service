const uuid = require('uuid/v4');
const Dish = require('./dish');

class Order {
    constructor(tableId) {
        this.id = uuid();
        this.tableId = tableId;
        this.dishes = [];
        this.totalPrice = 0;
        // this._revisioId = 15;
    }

    static fromObject(obj) {
        const order = new Order(obj.tableId);
        order.id = obj.id;
        order.dishes = obj.dishes.map(d => Dish.fromObject(d));
        order.totalPrice = obj.totalPrice;
        return order;
    }

    addDish(dish) {
        if (!(dish instanceof Dish))
            throw new Error('It\'s not a Dish');
        this.dishes.push(dish);
    }

    getPrice() {
        if (this.totalPrice)
            return this.totalPrice;
        this.totalPrice = this.dishes.reduce((total, d) => total + d.price);
        return this.totalPrice;
    }
}

module.exports = Order;
