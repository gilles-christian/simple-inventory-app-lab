module.exports = (app) => {
  app.post(`/order`, require('./orderCreate'));
  app.put(`/order/:id`, require('./orderUpdate'));
  app.post(`/order/import`, require('./orderImport'));
  app.delete(`/order`, require('./orderDestroy'));
  app.get(
    `/order/autocomplete`,
    require('./orderAutocomplete'),
  );
  app.get(`/order`, require('./orderList'));
  app.get(`/order/:id`, require('./orderFind'));
};
