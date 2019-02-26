const Promisify = require('promisify-cb');
const Dish = require('../../domain/models/dish');
const Order = require('../../domain/models/order');
const orderEvents = require('../../lib/order-events');

function orderCreated(order, cb) {
    return this.save(order.id, order._revisionId, orderEvents.orderCreated, order, cb);
}

function dishAdded(order, cb) {
    return this.save(order.id, order._revisionId, orderEvents.dishAdded, { dishes: order.dishes.slice() }, cb);
}

function getOrder(orderId, cb) {
    return Promisify(async () => {
        const stream = await this.getStream(orderId);
        let order = null;
        stream.forEach(e => {
            switch (e.message) {
                case orderEvents.orderCreated:
                    order = Order.fromObject(e.payload);
                    break;
                case orderEvents.dishAdded:
                    order.addDish(Dish.fromObject(e.payload));
                    break;
                default:
            }
        });
        if (!order)
            throw new Error('Order not found!');
        order._revisionId = stream[stream.length - 1].eventId;
        return order;
    }, cb);
}

function exportFunc(db) {
    return Object.assign(db, {
        getOrder: getOrder.bind(db),
        orderCreated: orderCreated.bind(db),
        dishAdded: dishAdded.bind(db),
    });
}

module.exports = exportFunc;
