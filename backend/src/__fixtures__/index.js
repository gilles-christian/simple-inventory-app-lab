const userFixture = require('./userFixture');
const customerFixture = require('./customerFixture');
const productFixture = require('./productFixture');
const orderFixture = require('./orderFixture');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = {
  user: userFixture,
  customer: customerFixture,
  product: productFixture,
  order: orderFixture,

  async cleanDatabase() {
    await AbstractRepository.cleanDatabase();
  },
};
