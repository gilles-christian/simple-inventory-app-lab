const genericFixture = require('./genericFixture');
const OrderRepository = require('../database/repositories/orderRepository');

const orderFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new OrderRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = orderFixture;
