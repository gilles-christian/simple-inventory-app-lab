const genericFixture = require('./genericFixture');
const ProductRepository = require('../database/repositories/productRepository');

const productFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new ProductRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = productFixture;
