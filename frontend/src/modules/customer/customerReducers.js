import list from 'modules/customer/list/customerListReducers';
import form from 'modules/customer/form/customerFormReducers';
import view from 'modules/customer/view/customerViewReducers';
import destroy from 'modules/customer/destroy/customerDestroyReducers';
import importerReducer from 'modules/customer/importer/customerImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
