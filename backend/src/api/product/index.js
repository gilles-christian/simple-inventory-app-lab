module.exports = (app) => {
  app.post(`/product`, require('./productCreate'));
  app.put(`/product/:id`, require('./productUpdate'));
  app.post(`/product/import`, require('./productImport'));
  app.delete(`/product`, require('./productDestroy'));
  app.get(
    `/product/autocomplete`,
    require('./productAutocomplete'),
  );
  app.get(`/product`, require('./productList'));
  app.get(`/product/:id`, require('./productFind'));
};
