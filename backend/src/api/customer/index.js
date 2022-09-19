module.exports = (app) => {
  app.post(`/customer`, require('./customerCreate'));
  app.put(`/customer/:id`, require('./customerUpdate'));
  app.post(`/customer/import`, require('./customerImport'));
  app.delete(`/customer`, require('./customerDestroy'));
  app.get(
    `/customer/autocomplete`,
    require('./customerAutocomplete'),
  );
  app.get(`/customer`, require('./customerList'));
  app.get(`/customer/:id`, require('./customerFind'));
};
