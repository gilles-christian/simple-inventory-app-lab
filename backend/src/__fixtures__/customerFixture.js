const genericFixture = require('./genericFixture');
const CustomerRepository = require('../database/repositories/customerRepository');

const customerFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new CustomerRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = customerFixture;
