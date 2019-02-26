const Promisify = require('promisify-cb');
const Order = require('../models/order');

let repo = null;

function orderCreated(tableId, cb) {
    return Promisify(async () => {
        const order = new Order(tableId);
        await repo.orderCreated(order);
    }, cb);
}

function dishAdded(orderId, dish, cb) {
    return Promisify(async () => {
        const order = await repo.getOrder(orderId);
        order.addDish(dish);
        await repo.dishAdded(order);
    }, cb);
}

const exportObj = {
    orderCreated,
    dishAdded,
};

function exportFunc(db) {
    if (!db)
        throw new Error('db is required.');
    repo = db;
    return exportObj;
}

module.exports = exportFunc;
