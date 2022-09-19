import list from 'modules/product/list/productListReducers';
import form from 'modules/product/form/productFormReducers';
import view from 'modules/product/view/productViewReducers';
import destroy from 'modules/product/destroy/productDestroyReducers';
import importerReducer from 'modules/product/importer/productImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
