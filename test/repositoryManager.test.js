const assert = require('assert');
const repo = require('../infrastructure/repository/repositoryManager')('testdb');
const Order = require('../domain/models/order');

function orderEquals(actual, expected) {
    assert.strictEqual(actual.id, expected.id);
    assert.strictEqual(actual.tableId, expected.tableId);
    assert.strictEqual(JSON.stringify(actual.dishes), JSON.stringify(expected.dishes));
    assert.strictEqual(actual.totalPrice, expected.totalPrice);
}

describe('Repository Manager unit test', function () {
    const order = new Order(15);
    
    it('check if getOrder() works', async function () {
        await repo.orderCreated(order);
        const result = await repo.getOrder(order.id);
        orderEquals(result, order);
    });
});
