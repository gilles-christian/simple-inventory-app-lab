import list from 'modules/order/list/orderListReducers';
import form from 'modules/order/form/orderFormReducers';
import view from 'modules/order/view/orderViewReducers';
import destroy from 'modules/order/destroy/orderDestroyReducers';
import importerReducer from 'modules/order/importer/orderImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
